'use server'

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from 'zod'

import prisma from "@/lib/prisma";
import { sleep } from "@/util";


const postSchema = z.object({
    title: z.string({ invalid_type_error: "Invalid title" }),
    content: z.string({ invalid_type_error: "Invalid post." })
})

export async function createPost(state: any, formData: FormData) {

    const validatedFields = postSchema.safeParse({
        title: formData.get("title"),
        content: formData.get('content')
    })

    await sleep(2000);


    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors
        }
    }

    const { title, content } = validatedFields.data;
    await prisma.post.create({
        data: {
            title, content, authorId: 1
        }
    })

    revalidatePath('/posts')
    redirect("/posts");
}