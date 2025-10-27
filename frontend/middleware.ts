import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers';


export default async function middleware(req: NextRequest) {
  
  const path = req.nextUrl.pathname
  const access = (await cookies()).get("access")?.value;

  const protectedRoutes = [
    '/checkout',
    '/order-status',
    '/order-success',
    '/order-failed',
  ];
  const isProtectedRoute = protectedRoutes.includes(path)

  if (!isProtectedRoute) {
    return NextResponse.next()
  }

  if (isProtectedRoute && !access) {
    const loginUrl = new URL('/login', req.url)
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