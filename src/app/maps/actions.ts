'use server'

import { getUser } from "@/lib/dal"
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function likeMap(mapId: number) {
    const user = await getUser();
    if (!user) return;

    try {
        const like = await prisma.mapLike.create({ data: { mapId, ownerId: user.id } })
        console.log('Like: ', like);

    } catch (err) {
        console.log('[ERROR] couldnt create map like')
    }

}