import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
export async function middleware(request) {
    const session = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });

    
    const url = new URL(request.url);
    const origin = url.origin;
    const pathname = url.pathname;

    request.headers.set('x-url', request.url);
    request.headers.set('x-origin', origin);
    request.headers.set('x-pathname', pathname);
    if (request.nextUrl.pathname.startsWith("/dash")) {
        if (session) {
            if (session.user.is_admin) {
                return NextResponse.next()
            } else {
                return NextResponse.redirect(new URL('/', request.url));
            }
        } else {
            return NextResponse.redirect(new URL('/signin', request.url));
        }
    }

    if (request.nextUrl.pathname === "/signin") {
        if (session) {
            return NextResponse.redirect(new URL('/', request.url));
        } else {
            return NextResponse.next()
        }
    }

    if (request.nextUrl.pathname === "/register") {
        if (session) {
            return NextResponse.redirect(new URL('/', request.url));
        } else {
            return NextResponse.next()
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/dash/:path*", "/signin", "/register"],
}