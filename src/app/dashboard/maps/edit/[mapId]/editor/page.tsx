import prisma from "@/lib/prisma";
import StepEditor from "./components/StepEditor";

export default async function StepPage({
  params,
}: {
  params: Promise<{ mapId: string }>;
}) {
  const p = await params;
  console.log("[DEBUG] rerender");

  const steps = await prisma.mapData.findFirst({
    where: { mapId: +p.mapId },
  });

  return <StepEditor mapId={p.mapId} steps={steps} />;
}
