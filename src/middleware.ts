import { NextRequest, NextResponse } from "next/server"
import { getSessionCookie } from "better-auth/cookies"

export function middleware(request: NextRequest) {
  const session = getSessionCookie(request)

  const isProtected =
    request.nextUrl.pathname.startsWith("/dashboard") ||
    request.nextUrl.pathname.startsWith("/cv") ||
    request.nextUrl.pathname.startsWith("/billing")

  if (isProtected && !session) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/cv/:path*", "/billing/:path*"],
}
