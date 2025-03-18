"use server";

import { z } from "zod";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/dal";
import { revalidatePath } from "next/cache";

const mapSchema = z.object({
  title: z.string().min(1, { message: "Please enter a map title." }).trim(),
  description: z
    .string()
    .min(1, { message: "Please enter a map description." })
    .trim(),
});

export type FormState = {
  errors?: {
    title?: string[];
    description?: string[];
  };

  message?: string;
} | null;

export async function createMap(state: FormState, formData: FormData) {
  const inputData = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
  };

  const validatedInput = mapSchema.safeParse(inputData);

  if (!validatedInput.success) {
    return {
      errors: validatedInput.error.flatten().fieldErrors,
      inputData,
    };
  }

  const { title, description } = validatedInput.data;
  const user = await getUser();

  if (!user) {
    console.log("[DEBUG] No user found to create map.");
    return redirect("/login");
  }

  try {
    const map = await prisma.map.create({
      data: {
        title,
        description,
        ownerId: user.id,
      },
    });
    console.log("[DEBUG] created map with id ", map.id);
  } catch (err) {
    console.log("[ERROR] couldn not create map", err);
  }

  revalidatePath("/maps");
  redirect("/maps?category=my");
}
