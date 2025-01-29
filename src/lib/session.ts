import 'server-only'

import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

type SessionPayload = {
    expires: Date
    userId: string
    isAdmin: boolean
}

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload: SessionPayload) {
    return new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime('14d').sign(encodedKey)
}

export async function decrypt(session: string | undefined = '') {
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256']
        })
        return payload
    } catch (err) {
        console.log("[ERROR] failed to verify session")
    }
}

export async function createSession(userId: string, isAdmin = false) {
    const expires = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
    const session = await encrypt({ userId, expires, isAdmin })
    const cookieStore = await cookies()

    cookieStore.set('session', session, {
        httpOnly: true,
        secure: true,
        expires,
        sameSite: 'lax',
        path: '/'
    })
}

export async function updateSession() {
    const session = (await cookies()).get('session')?.value;
    const payload = decrypt(session);

    if (!session || !payload) {
        console.log("[ERROR] Couldn't update session.")
        return null
    }

    const expires = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
    const cookieStore = await cookies()
    cookieStore.set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expires,
        sameSite: 'lax',
        path: '/',
    })
}

export async function deleteSession() {
    const cookieStore = await cookies()
    cookieStore.delete('session')
}
