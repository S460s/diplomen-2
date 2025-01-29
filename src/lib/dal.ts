import 'server-only'

import { cookies } from 'next/headers'
import { cache } from 'react'
import { decrypt } from './session'
// import { redirect } from 'next/navigation'
import prisma from './prisma'

export const verifySession = cache(async () => {
    const cookie = (await cookies()).get('session')?.value
    const session = await decrypt(cookie)


    if (!session?.userId) {
        console.log('[LOG] could not verify user session')
        return null; // redirect causes infinite
    }

    return { isAuth: true, userId: session?.userId }
})

export const getUser = (cache(async () => {
    const session = await verifySession()
    if (!session) {
        console.log('[LOG] no session')
        return null
    }


    try {
        const user = prisma.user.findUnique({
            where: {
                id: parseInt(session.userId as string)
            },
            omit: {
                password: true
            }
        })

        return user
    } catch (err) {
        console.log('[ERROR] failed to get user')
        return null
    }
}))