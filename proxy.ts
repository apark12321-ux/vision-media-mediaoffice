import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

function unauthorized() {
  return new NextResponse('Admin authentication required.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Edu Journal Admin", charset="UTF-8"',
      'Cache-Control': 'no-store'
    }
  });
}

function missingConfig() {
  return new NextResponse('Admin authentication is not configured. Set ADMIN_ID and ADMIN_PASSWORD in the deployment environment.', {
    status: 503,
    headers: {
      'Cache-Control': 'no-store'
    }
  });
}

function decodeBasicAuth(value: string | null) {
  if (!value?.startsWith('Basic ')) return null;

  try {
    const decoded = atob(value.slice('Basic '.length));
    const separator = decoded.indexOf(':');
    if (separator < 0) return null;

    return {
      id: decoded.slice(0, separator),
      password: decoded.slice(separator + 1)
    };
  } catch {
    return null;
  }
}

function safeCompare(left: string, right: string) {
  if (left.length !== right.length) return false;

  let result = 0;
  for (let index = 0; index < left.length; index += 1) {
    result |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }

  return result === 0;
}

function checkBasicAdminAuth(request: NextRequest) {
  const adminId = process.env.ADMIN_ID;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminId || !adminPassword) {
    return missingConfig();
  }

  const credentials = decodeBasicAuth(request.headers.get('authorization'));
  if (!credentials) {
    return unauthorized();
  }

  const isAuthorized = safeCompare(credentials.id, adminId) && safeCompare(credentials.password, adminPassword);
  if (!isAuthorized) {
    return unauthorized();
  }

  return null;
}

async function checkSupabaseAdminSession(request: NextRequest, response: NextResponse) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          request.cookies.set(name, value);
          response.cookies.set(name, value, options);
        });
      }
    }
  });

  const {
    data: { user }
  } = await supabase.auth.getUser();
  const adminEmail = process.env.ADMIN_EMAIL;

  if (adminEmail && user?.email !== adminEmail) {
    const url = request.nextUrl.clone();
    url.pathname = '/admin/login';
    return NextResponse.redirect(url);
  }

  return null;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith('/admin') || pathname.startsWith('/admin/login')) {
    return NextResponse.next();
  }

  const basicAuthResult = checkBasicAdminAuth(request);
  if (basicAuthResult) return basicAuthResult;

  const response = NextResponse.next({ request });
  const supabaseAuthResult = await checkSupabaseAdminSession(request, response);
  if (supabaseAuthResult) return supabaseAuthResult;

  response.headers.set('Cache-Control', 'no-store');
  return response;
}

export const config = {
  matcher: ['/admin/:path*']
};
