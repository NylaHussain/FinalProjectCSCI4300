import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const pathname = request.nextUrl.pathname;

  const publicPaths = [
    '/', 
    '/login', 
    '/signup', 
    '/images/recipe4.jpg', 
    '/images/pantryImg.jpg', 
    '/welcome', 
    '/item-search', 
    '/recipe-search', 
    '/api/items' // allow this + anything under it
  ];
  
  // Allow all paths that start with a public path
  const isPublic = publicPaths.some((path) =>
    pathname === path || pathname.startsWith(path + '/')
  );
  

  if (!token && !isPublic) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
