'use server'
import { getUser } from '@/lib/dal'
import prisma from '@/lib/prisma'

export async function themeAction(theme: string) {
    const allowedThemes = ['light', 'dark', 'gourmet', 'corporate', 'luxury', 'soft'];
    theme = theme.trim();

    if (!allowedThemes.includes(theme)) {
        console.log('[LOG] Invalid theme setting.')
        return;
    }
    const user = await getUser();

    if (!user) return; // no user

    try {
        const updatedUser = await prisma.user.update({ where: { id: user?.id }, data: { theme } })
        console.log(updatedUser)

    } catch (e) {
        console.log('[ERROR] cannot update theme')
    }
}