"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function saveStep(mapId: string, stepId: string, md: string) {
  const step = { id: stepId, mapId: Number(mapId), text: md };
  try {
    const newStep = await prisma.step.upsert({
      where: {
        id: stepId,
      },
      create: step,
      update: step,
    });

    console.log(`[DEBUG] UPDATED STEP WITH ID ${newStep.id}`);
  } catch (e) {
    console.log("[ERROR] couldn't save step", e);
  }

  revalidatePath(`/maps/${mapId}/steps`);
  revalidatePath(`/maps/${mapId}`);
}
