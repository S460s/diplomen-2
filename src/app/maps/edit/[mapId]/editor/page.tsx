import prisma from "@/lib/prisma";
import StepEditor from './components/StepEditor'

export default async function StepPage({ params }: { params: { mapId: string } }) {
  const p = await params;

  const steps = await prisma.mapData.findFirst({
    where: { mapId: +(p.mapId) },
  });

  console.log(steps)

  return <StepEditor mapId={p.mapId} steps={steps} />;
}