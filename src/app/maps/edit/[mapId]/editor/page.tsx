import prisma from "@/lib/prisma";
import StepEditor from './components/StepEditor'

export default async function StepPage({ params }: { params: { mapId: string } }) {

    const p = await params;
    /* const steps = await prisma.mapSteps.findFirst({
      where: { mapId: Number(params.id) },
    });
    */
    return <StepEditor mapId={p.mapId} steps={null} />;
}