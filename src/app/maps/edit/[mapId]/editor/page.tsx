import prisma from "@/lib/prisma";
import StepEditor from './components/StepEditor'
import { get } from "http";
import { getUser } from "@/lib/dal";

export default async function StepPage({ params }: { params: { mapId: string } }) {
  const p = await params;
  const user = await getUser();

  let theme = 'system'
  if (['dark', 'luxury'].includes(user?.theme || '')) theme = 'dark'
  if (['corporate', 'gourmet', 'soft'].includes(user?.theme || '')) theme = 'light'

  const steps = await prisma.mapData.findFirst({
    where: { mapId: +(p.mapId) },
  });

  console.log(steps)

  return <StepEditor mapId={p.mapId} steps={steps} theme={theme} />;
}