import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const secret = new TextEncoder().encode(process.env.SESSION_SECRET)
const COOKIE = 'admin_session'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === '/admin/login') return NextResponse.next()

  const token = request.cookies.get(COOKIE)?.value
  if (!token) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  try {
    await jwtVerify(token, secret, { algorithms: ['HS256'] })
    return NextResponse.next()
  } catch {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }
}

export const config = {
  matcher: ['/admin/:path*'],
}
