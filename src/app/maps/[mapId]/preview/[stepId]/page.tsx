"use server";

import prisma from "@/lib/prisma";
import Link from "next/link";
import Markdown from "react-markdown";
import { ProgressToggle } from "./components/ProgressToggle";
import { getUser } from "@/lib/dal";
import { redirect } from "next/navigation";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ stepId: string; mapId: string }>;
  searchParams: Promise<{ title: string }>;
}) {
  const p = await params;
  const step = await prisma.step.findFirst({ where: { id: p.stepId } });
  let isCompleted;

  const owner = await getUser();
  if (!owner) redirect("/login");

  try {
    isCompleted = !!(
      await prisma.stepCompleted.findFirst({
        where: { stepId: p.stepId, mapId: +p.mapId, ownerId: owner.id },
      })
    )?.isCompleted;
  } catch (err) {
    isCompleted = false;
  }

  const s = await prisma.stepCompleted.findFirst({
    where: {
      ownerId: owner.id,
    },
  });

  return (
    <div className="flex justify-center items-center h-full">
      <div className="card sm:max-w-sm">
        <div className="card-header">
          <h1 className="card-title">{(await searchParams).title}</h1>
        </div>
        <div className="card-body">
          <Markdown>{step?.text || "No text as of now."}</Markdown>
        </div>
        <div className="card-footer text-center flex flex-col gap-2">
          <Link className="btn" href={`/maps/${p.mapId}/steps`}>
            Back
          </Link>
          <ProgressToggle
            stepId={p.stepId}
            mapId={+p.mapId}
            isCompleted={isCompleted}
          />
        </div>
      </div>
    </div>
  );
}
