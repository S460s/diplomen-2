"use server";

import { getUser } from "@/lib/dal";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function toggleCompleted(
  stepId: string,
  isCompleted: boolean,
  mapId: number
) {
  try {
    const owner = await getUser();
    if (!owner) redirect("/login");

    const progress = await prisma.stepCompleted.upsert({
      where: { stepId },
      create: { isCompleted, stepId, ownerId: owner.id, mapId },
      update: { isCompleted },
    });

    console.log(
      `[DEBUG] step progress of ${progress.id} set to ${
        progress.isCompleted ? "completed" : "not completed"
      }`
    );
  } catch (err) {
    console.log("[ERROR] cannot create/update progress ", err);
  }
}
