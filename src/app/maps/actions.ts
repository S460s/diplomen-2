"use server";

import { getUser } from "@/lib/dal";
import prisma from "@/lib/prisma";

export async function likeMap(mapId: number) {
  const user = await getUser();
  if (!user) return;

  try {
    const like = await prisma.mapLike.create({
      data: { mapId, ownerId: user.id },
    });
    console.log("Like: ", like);
  } catch (err) {
    console.log("[ERROR] couldnt create map like", err);
  }
}

export async function unlikeMap(mapId: number) {
  const user = await getUser();
  if (!user) return;

  try {
    const like = await prisma.mapLike.deleteMany({ where: { mapId } });
    console.log("Like deleted: ", like);
  } catch (err) {
    console.log("[ERROR] couldnt create map like", err);
  }
}
