'use server'

import { z } from 'zod'
import bcrypt from 'bcrypt'
import prisma from '@/lib/prisma'
import { createSession } from '@/lib/session'
import { redirect } from "next/navigation";

const signUpSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }).trim(),
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
            name?: string[]
            email?: string[]
            password?: string[]
        }

        message?: string
    }
    | null


export async function signUp(state: FormState, formData: FormData) {

    const inputData = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string
    }

    const validatedInput = signUpSchema.safeParse(inputData)

    if (!validatedInput.success) {
        return {
            errors: validatedInput.error.flatten().fieldErrors,
            inputData
        }
    }

    const { name, email, password } = validatedInput.data;
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (user) {
        return {
            errors: {
                email: ["There is an account with this email"]
            },
            inputData
        }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
        data: {
            name, email, password: hashedPassword
        }
    })

    await createSession(newUser.id.toString());
    redirect('/')
}