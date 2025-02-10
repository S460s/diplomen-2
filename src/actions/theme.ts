'use server'
import { getUser } from '@/lib/dal'
import prisma from '@/lib/prisma'
import { z } from 'zod'

const loginSchema = z.object({
    theme: z.string().email({ message: "Please enter a valid email" }).trim(),

})

export async function themeAction(theme: string) {
    const user = await getUser();

    if (!user) return; // no user

    try {
        const updatedUser = await prisma.user.update({ where: { id: user?.id }, data: { theme } })
        console.log(updatedUser)

    } catch (e) {
        console.log('[ERROR] cannot update theme')
    }
}