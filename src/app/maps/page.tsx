'use server'

import prisma from '@/lib/prisma'
import { formatter } from '@/util';
import { Like } from './components/Like';

export default async function Page() {
    const maps = await prisma.map.findMany();

    return (
        <div className='flex justify-center items-center'>
            <div>
                <h1 className='text-base-content text-3xl font-semibold'>Maps</h1>

                <div className='p-8 flex gap-4 flex-wrap'>
                    {maps.map(async (map) => {

                        const likes = await prisma.mapLike.count({ where: { mapId: map.id } })
                        return (
                            <div key={map.id} className="card sm:max-w-sm">
                                <div className="card-body">
                                    <h5 className="card-title mb-2.5">{map.title}</h5>
                                    <div className="text-base-content/50 mb-6">{formatter.format(map.createdAt)}</div>
                                    <p className="mb-4">{map.description}</p>
                                    <div className="card-actions">

                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>
        </div>
    )
}