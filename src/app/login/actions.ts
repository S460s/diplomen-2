'use server'

import { z } from 'zod'
import bcrypt from 'bcrypt'
import prisma from '@/lib/prisma'
import { createSession } from '@/lib/session'
import { redirect } from "next/navigation";

const loginSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email" }).trim(),
    password: z.string()
        .min(8, { message: 'Be at least 8 characters long' })
        .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
        .regex(/[0-9]/, { message: 'Contain at least one number.' })
        .regex(/[^a-zA-Z0-9]/, {
            message: 'Contain at least one special character.',
        })
        .trim(),
})

export type FormState =
    | {
        errors?: {
            email?: string[]
            password?: string[]
        }

        message?: string
    }
    | null


export async function login(state: FormState, formData: FormData) {
    const validatedInput = loginSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password')
    })

    if (!validatedInput.success) {
        return {
            errors: validatedInput.error.flatten().fieldErrors,
        }
    }

    const { email, password } = validatedInput.data;
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (!user) {
        return {
            errors: {
                email: ["No such account"] // return it as a general error (message ?)
            }
        }
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return {
            errors: {
                email: ['Wrong credentials'],
                password: ['Wrong credentials']
            }
        }
    }


    await createSession(user.id.toString());
    redirect('/profile')
}