import { NextRequest, NextResponse } from 'next/server'


export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const access = req.cookies.get('access')?.value;

  const protectedRoutes = [
    '/checkout',
    '/order-status',
    '/order-success',
    '/order-failed',
    '/dashboard',
  ];
  const isProtectedRoute = protectedRoutes.includes(path)

  if (!isProtectedRoute) {
    return NextResponse.next()
  }

  if(isProtectedRoute && !access) {
       const loginUrl = new URL('/signin', req.url)
       loginUrl.searchParams.set('redirect', path)
       return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/checkout/:path*',
    '/order-status/:path*',
    '/order-success',
    '/order-failed',
  ],
}