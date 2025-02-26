import prisma from "@/lib/prisma";
import { PreviewMap } from "./components/PreviewMap";
import { getUser } from "@/lib/dal";

export default async function StepPage({
  params,
}: {
  params: Promise<{ mapId: string }>;
}) {
  const p = await params;
  const user = await getUser();

  const steps = await prisma.mapData.findFirst({
    where: { mapId: Number(p.mapId) },
  });

  let stepProgressMap: any;
  try {
    stepProgressMap = await prisma.stepCompleted.findMany({
      where: { mapId: +p.mapId, ownerId: user?.id },
    });
  } catch (err) {
    console.log("err");
  }

  console.log(stepProgressMap);

  return <PreviewMap mapId={p.mapId} steps={steps} />;
}
