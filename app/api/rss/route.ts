export async function GET() {
  return new Response('생활경제저널 RSS 준비 중', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });
}
