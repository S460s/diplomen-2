'use client'

import { Prisma } from "@prisma/client"
import { formatter } from "@/util"
import { likeMap } from "../actions"
import { useOptimistic } from "react"
import { Like } from "./Like"

export default function MapList({ maps }: { maps: Prisma.MapGetPayload<{}>[] }) {





    return (
        <div className='p-8 flex gap-4 flex-wrap'>
            {maps.map((map) => {
                return (
                    <div key={map.id} className="card sm:max-w-sm">
                        <div className="card-body">
                            <h5 className="card-title mb-2.5">{map.title}</h5>
                            <div className="text-base-content/50 mb-6">{formatter.format(map.createdAt)}</div>
                            <p className="mb-4">{map.description}</p>
                            <div className="card-actions">
                                <button className="btn">View</button>
                                <Like data={{ liked: !!(map as any).MapLike.length, likes: (map as any)._count.MapLike }} mapId={map.id} />
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}