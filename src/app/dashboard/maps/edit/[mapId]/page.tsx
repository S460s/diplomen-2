import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { EditForm } from "./components/EditForm";

export default async function Page({
  params,
}: {
  params: Promise<{ mapId: string }>;
}) {
  const p = await params;
  const id = Number(p.mapId);
  if (!id) notFound();

  const map = await prisma.map.findFirst({ where: { id } });
  if (!map) notFound();

  return <EditForm map={map} />;
}
