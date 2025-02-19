'use server'

import prisma from "@/lib/prisma";


export async function saveStep(mapId: string, stepId: string, md: string) {
    console.log(mapId, stepId, md);
    const step = { id: stepId, mapId: Number(mapId), text: md };
    try {
        const newStep = await prisma.step.upsert({
            where: {
                id: stepId,
            },
            create: step,
            update: step
        });

        console.log(`UPDATED STEP WITH ID ${newStep.id}`);
    } catch (e) {
        console.log('fucked up in saving step', e);
    }
}
