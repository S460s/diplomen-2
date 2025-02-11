'use server'

import prisma from '@/lib/prisma'
import { formatter } from '@/util';
import MapList from './components/MapList';
import { getUser } from '@/lib/dal';

export default async function Page() {
    const user = await getUser();
    const maps = await prisma.map.findMany({
        include: {
            _count: {
                select: { MapLike: true },
            },
            MapLike: {
                where: { ownerId: user?.id },
            }

        }
    });

    console.log(maps)

    return (
        <div className='flex justify-center items-center'>
            <div>
                <h1 className='text-base-content text-3xl font-semibold'>Maps</h1>
                <MapList maps={maps} />
            </div>
        </div>
    )
}