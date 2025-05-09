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
  searchParams?: Promise<{ query: string; category: string }>;
}) {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }

  const params = await searchParams;
  const query = params?.query || "";
  const category = params?.category || "";

  const where =
    category === "my"
      ? { ownerId: user.id, title: { contains: query } }
      : { title: { contains: query }, published: true };

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
    where,
    orderBy: { updatedAt: "asc" },
  });

  return (
    <div className="flex justify-center items-center gap-4">
      <div className="w-[100%] flex justify-center flex-col items-center">
        <h1 className="text-base-content text-3xl font-semibold m-4">Maps</h1>
        <Link className="btn mb-2" href={"/maps/create"}>
          Create
        </Link>
        <Search />
        <div>
          <MapList maps={maps} user={user} />
        </div>
      </div>
    </div>
  );
}
