import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { decrypt } from "@/lib/session"

const protecedRoutes = ['/profile']
const publicRoutes = ['/signup', 'login', '/', '/about']
const onlyPublicRoutes = ['/signup', '/login']

export default async function middleware(req: NextRequest) {
    console.log('[DEBUG] running middleware')

    const path = req.nextUrl.pathname
    const isProtected = protecedRoutes.includes(path)
    const isPublic = publicRoutes.includes(path) // unused as of now
    const isOnlyPublic = onlyPublicRoutes.includes(path);

    const cookie = (await cookies()).get('session')?.value
    const session = await decrypt(cookie);

    if (session?.userId && isOnlyPublic) { // don't allow to login again
        return NextResponse.redirect(new URL('/profile', req.nextUrl))
    }

    if (isProtected && !session?.userId) {
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}