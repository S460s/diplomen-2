'use server'

import { z } from 'zod'
import prisma from '@/lib/prisma'
import { redirect } from "next/navigation";
import { revalidatePath } from 'next/cache'
import { isAdminUser } from '@/lib/dal';

const updateUserSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }).trim(),
    email: z.string().email({ message: "Please enter a valid email" }).trim(),
})

export type FormState =
    | {
        errors?: {
            name?: string[]
            email?: string[]
        }

        message?: string
    }
    | null


export async function updateUser(id: number, state: FormState, formData: FormData) {
    const isAdmin = await isAdminUser();
    if (!isAdmin) {
        console.log('[ERROR] non-admin user is trying to do admin action')
        return null;
    }

    const inputData = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
    }

    const validatedInput = updateUserSchema.safeParse(inputData)

    if (!validatedInput.success) {
        return {
            errors: validatedInput.error.flatten().fieldErrors,
            inputData
        }
    }

    const { name, email } = validatedInput.data;
    const user = await prisma.user.update({
        where: {
            id
        }, data: {
            name, email
        }
    })

    if (!user) {
        console.log('[ERROR] there is no such user.')
    } else {
        console.log('[LOG] Updated user successfuly.')
    }

    revalidatePath('/daashboard/users')
    redirect('/dashboard/users')
}