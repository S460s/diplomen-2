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
  published: z.string().trim(),
});

export type FormState = {
  errors?: {
    title?: string[];
    description?: string[];
  };

  message?: string;
} | null;

export async function editMap(
  id: number,
  state: FormState,
  formData: FormData
) {
  const inputData = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    published: formData.get("published") || "",
  };

  const validatedInput = mapSchema.safeParse(inputData);

  if (!validatedInput.success) {
    return {
      errors: validatedInput.error.flatten().fieldErrors,
      inputData,
    };
  }
  // No check if the owner of the map is editing...
  const { title, description, published } = validatedInput.data;
  const user = await getUser();

  if (!user) {
    console.log("[DEBUG] No user found to create map.");
    return redirect("/login");
  }

  try {
    const map = await prisma.map.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        ownerId: user.id,
        published: published === "on",
        updatedAt: new Date(Date.now()),
      },
    });
    console.log("[DEBUG] created map with id ", map.id);
  } catch (err) {
    console.log("[ERROR] couldn not create map", err);
  }

  revalidatePath("/dashboard/maps");
  redirect("/dashboard/maps");
}

export async function deleteMap(id: number) {
  // const user = await getUser() // add checks if the user who tries to delete the map is the actual owner
  try {
    const map = await prisma.map.delete({ where: { id } });
    console.log("[LOG] deleted map with id", map.id);
  } catch (err) {
    console.log("[ERROR] cannot delete map.", err);
  }

  revalidatePath("/dashboard/maps");
  redirect("/dashboard/maps");
}
