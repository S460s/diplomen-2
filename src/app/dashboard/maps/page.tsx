"use server";

import prisma from "@/lib/prisma";
import MapList from "./components/MapList";
import { getUser } from "@/lib/dal";
import { redirect } from "next/navigation";
import { Search } from "./components/Search";
import Link from "next/link";

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{ query: string }>;
}) {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }

  const params = await searchParams;
  const query = params?.query || "";

  const maps = await prisma.map.findMany({
    include: {
      _count: {
        select: { MapLike: true },
      },
      MapLike: {
        where: { ownerId: user?.id },
      },
      owner: {
        omit: {
          password: true,
        },
      },
    },
    where: { title: { contains: query } },
    orderBy: { updatedAt: "asc" },
  });

  return (
    <div className="flex justify-center items-center gap-4">
      <div className="w-[100%] flex justify-center flex-col items-center">
        <h1 className="text-base-content text-3xl font-semibold m-4">Maps</h1>

        <Search />
        <div>
          <MapList maps={maps} user={user} />
        </div>
      </div>
    </div>
  );
}
