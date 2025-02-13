import prisma from "@/lib/prisma";
import StepEditor from './components/StepEditor'
import { get } from "http";
import { getUser } from "@/lib/dal";

export default async function StepPage({ params }: { params: { mapId: string } }) {
  const p = await params;
  const user = await getUser();
  console.log(user?.theme)

  let theme = 'system'
  if (['dark', 'luxury'].includes(user?.theme || '')) theme = 'dark'
  if (['corporate', 'gourmet', 'soft'].includes(user?.theme || '')) theme = 'light'

  /* const steps = await prisma.mapSteps.findFirst({
    where: { mapId: Number(params.id) },
  });
  */

  return <StepEditor mapId={p.mapId} steps={null} theme={theme} />;
}