'use server'

import prisma from '@/lib/prisma'
import { formatter } from '@/util';
import MapList from './components/MapList';
import { getUser } from '@/lib/dal';
import { redirect } from 'next/navigation';
import { Search } from './components/Search';

export default async function Page() {
    const user = await getUser();
    if (!user) {
        redirect('/login')
    }

    const maps = await prisma.map.findMany({
        include: {
            _count: {
                select: { MapLike: true },
            },
            MapLike: {
                where: { ownerId: user?.id },
            }
        },
        orderBy: { updatedAt: 'asc' }
    });

    console.log('LOADING MAPS PLEASE SEEE ME')

    return (
        <div className='flex justify-center items-center'>
            <div>
                <h1 className='text-base-content text-3xl font-semibold'>Maps</h1>
                <Search />
                <MapList maps={maps} user={user} />
            </div>
        </div>
    )
}