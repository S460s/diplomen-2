import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { decrypt } from "@/lib/session"

const protecedRoutes = ['/profile']
const publicRoutes = ['/signup', 'signin', '/', '/about']

export default async function middleware(req: NextRequest) {
    console.log('[DEBUG] running middleware')

    const path = req.nextUrl.pathname
    const isProtected = protecedRoutes.includes(path)
    const isPublic = publicRoutes.includes(path) // unused as of now

    const cookie = (await cookies()).get('session')?.value
    const session = await decrypt(cookie);


    if (isProtected && !session?.userId) {
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}