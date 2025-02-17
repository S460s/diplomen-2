import prisma from "@/lib/prisma";
import { PreviewMap } from './components/PreviewMap'

export default async function StepPage({ params }: { params: { mapId: string } }) {
    const p = await params;


    const steps = await prisma.mapData.findFirst({
        where: { mapId: Number(p.mapId) },
    });
    return <PreviewMap mapId={p.mapId} steps={steps} />;
}