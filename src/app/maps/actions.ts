import { getUser } from "@/lib/dal";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export async function likeMap(
    mapId: number // bound using bind
) {
    console.log(mapId);

    const user = await getUser();
    if (!user) {
        redirect('/login')
    }


    try {
        const like = await prisma.mapLike.create({ data: { ownerId: user?.id, mapId } });
        console.log(`CREATE LIKE: with id ${like.id}`);
    } catch (e) {
        console.error(e);
        return { message: 'Could not delete map.' };
    }

    revalidatePath('/maps');

}

export async function dislikeMap(
    mapId: number // bound using bind
) {

    const user = await getUser();
    if (!user) {
        redirect('/login')
    }

    try {
        const like = await prisma.mapLike.deleteMany({ where: { mapId, ownerId: user.id } });
        console.log(like);
        console.log(`DELETED ${like.count} likes.`);
    } catch (e) {
        console.error(e);
        return { message: 'Could not delete map.' };
    }

    revalidatePath('/maps');
}