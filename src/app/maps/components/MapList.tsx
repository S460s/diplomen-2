'use client'

import { Prisma } from "@prisma/client"
import { formatter } from "@/util"
import { Like } from "./Like"
import Link from "next/link"

export default function MapList({ maps, user }: { maps: Prisma.MapGetPayload<{ include: { owner: { omit: { password: true } } } }>[], user: Omit<Prisma.UserGetPayload<{}>, 'password'> }) {

    return (
        <div className="">
            <div className='p-8 flex gap-4 flex-wrap'>
                {maps.map((map) => {
                    return (
                        <div key={map.id} className="card sm:max-w-sm">
                            <div className="card-body">
                                <h5 className="card-title mb-2.5">{map.title}</h5>
                                <div className="text-base-content/50 mb-6">{formatter.format(map.updatedAt)}</div>
                                <div className="text-base-content/50 mb-6">By {map.owner.name}</div>
                                <p className="mb-4">{map.description}</p>
                                <div className="card-actions">
                                    {map.ownerId === user.id ? <Link className="btn" href={`/maps/edit/${map.id}`}>Edit</Link> : <Link href={`/maps/${map.id}`} className="btn">View</Link>}
                                    <Like data={{ liked: !!(map as any).MapLike.length, likes: (map as any)._count.MapLike }} mapId={map.id} />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}