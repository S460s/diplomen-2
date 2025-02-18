'use server'

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function saveMapData(flow: Prisma.JsonObject, mapId: string) {
    console.log('[DEBUG] saving map data');

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
    } catch (err) {
        console.log('[ERROR] could not save map data', err);
    }
}


export async function deleteStep(stepId: string) {

}