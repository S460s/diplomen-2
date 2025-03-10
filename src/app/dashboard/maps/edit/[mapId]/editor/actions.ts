"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function saveMapData(flow: Prisma.JsonObject, mapId: string) {
  console.log("[DEBUG] saving map data", flow);

  try {
    const newFlow = await prisma.mapData.upsert({
      where: { mapId: Number(mapId) },
      update: {
        mapId: Number(mapId),
        data: flow,
      },
      create: {
        mapId: Number(mapId),
        data: flow,
      },
    });

    console.log(newFlow);
    revalidatePath(`/maps/edit/${mapId}/editor`);
  } catch (err) {
    console.log("[ERROR] could not save map data", err);
  }
}

export async function deleteStep(stepId: string) {
  let step = null;
  try {
    step = await prisma.step.delete({ where: { id: stepId } });
    console.log("[DEBUG] deleted step with id ", stepId);
  } catch (err) {
    console.log("[ERROR] cannot delete step", err);
  }
  return step;
}
