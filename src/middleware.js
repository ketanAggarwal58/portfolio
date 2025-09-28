import { NextResponse } from "next/server";

export function middleware(request) {
  // const session = request.cookies.get('session')?.value;
  // const { pathname, search } = request.nextUrl;

  // const isAuth = pathname === '/admin';          // login at '/'
  // const isProtected = pathname === '/admin' || pathname.startsWith('/admin/');

  // if (isProtected && !session) {
  //   const url = new URL('/admin', request.url);
  //   url.searchParams.set('callbackUrl', pathname + search);
  //   return NextResponse.redirect(url);
  // }

  // if (isAuth && session) {
  //   return NextResponse.redirect(new URL('/admin', request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"], // nothing else
};
