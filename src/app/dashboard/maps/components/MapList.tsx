"use client";

import { Prisma } from "@prisma/client";
import { formatter } from "@/util";
import { Like } from "./Like";
import Link from "next/link";

export default function MapList({
  maps,
  user,
}: {
  maps: Prisma.MapGetPayload<{
    include: { owner: { omit: { password: true } } };
  }>[];
  user: Omit<Prisma.UserGetPayload<{}>, "password">;
}) {
  return (
    <div className="">
      <div className="p-8 flex gap-4 flex-wrap justify-center items-center">
        {maps.length > 0 ? (
          maps.map((map) => {
            return (
              <div key={map.id} className="card sm:max-w-sm">
                <div className="card-body">
                  <h5 className="card-title mb-2.5">{map.title}</h5>
                  <div className="text-base-content/50 mb-6">
                    {formatter.format(map.updatedAt)}
                  </div>
                  <div className="text-base-content/50 mb-6">
                    By {map.owner.name}
                  </div>
                  <p className="mb-4 line-clamp-2">{map.description}</p>
                  <div className="card-actions">
                    <Link className="btn" href={`/maps/edit/${map.id}`}>
                      Edit
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>There are no maps..</p>
        )}
      </div>
    </div>
  );
}
