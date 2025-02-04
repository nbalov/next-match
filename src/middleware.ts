import {auth} from './auth'
import {publicRoutes, authRoutes} from './routes'
import {NextResponse} from 'next/server'

export default auth((req) => {
    const {nextUrl} = req;
    const isLoggedIn = !!req.auth;

    console.log("nextUrl", nextUrl.href, nextUrl.pathname);

    const isPublic = publicRoutes.includes(nextUrl.pathname);
    const isAuth   = authRoutes.includes(nextUrl.pathname);

    if (isPublic) {
        // procede to where the user wants to get to
        return NextResponse.next();
    }

    if (isAuth) {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL('/members', nextUrl));
        }
        // procede to the log-in page
        return NextResponse.next();
    }

    if (!isPublic && !isLoggedIn) {
        // redirect to the log-in page
        return NextResponse.redirect(new URL('/login', nextUrl));
    }

    return NextResponse.next();
})

export const config = {
    matcher: [
        /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
}