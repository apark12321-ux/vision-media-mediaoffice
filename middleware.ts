import { NextRequest, NextResponse } from 'next/server';

const ADMIN_PATH_PREFIX = '/admin';

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

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith(ADMIN_PATH_PREFIX)) {
    return NextResponse.next();
  }

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

  const response = NextResponse.next();
  response.headers.set('Cache-Control', 'no-store');
  return response;
}

export const config = {
  matcher: ['/admin/:path*']
};
