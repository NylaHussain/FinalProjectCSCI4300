import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const pathname = request.nextUrl.pathname;

  const publicPaths = ['/', '/login', '/signup', '/welcome', '/item-search', '/recipe-search', '/api/items', 
    '/api/items/68079b206acbfe6ad11ae2eb'];

  if (!token && !publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};