import { getUser } from "@/lib/dal";
import prisma from "@/lib/prisma";
import { shortFormatter } from "@/util";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ mapId: string }>;
}) {
  const user = await getUser();
  if (!user) redirect("/login");

  const p = await params;
  const id = Number(p.mapId);
  if (!id) notFound();

  const map = await prisma.map.findFirst({ where: { id } });
  if (!map) notFound();

  const allSteps = await prisma.step.count({ where: { mapId: map.id } });
  const completedSteps = await prisma.stepCompleted.count({
    where: { mapId: map.id, ownerId: user?.id, isCompleted: true },
  });

  console.log(allSteps, completedSteps);

  let progress = "0";
  if (allSteps === 0) progress = "100.00";
  else progress = ((completedSteps / allSteps) * 100).toFixed(2);

  return (
    <div className="flex justify-center items-center h-[100%]">
      <div className="card card-compact sm:max-w-[80%] p-8">
        <div className="card-header">
          <h5 className="card-title">{map.title}</h5>
        </div>
        <div className="card-body">
          <h3 className="font-light text-sm">
            Created at: {shortFormatter.format(map.createdAt)}
          </h3>
          <h3 className="font-light text-sm">
            Updated at: {shortFormatter.format(map.updatedAt)}
          </h3>

          <h4 className="mt-2">{map.description}</h4>
        </div>
        <div className="card-footer text-center flex gap-2">
          <Link className="btn btn-primary" href={`/maps/${map.id}/steps`}>
            View Steps
          </Link>
          <Link className="btn btn-accent" href={`/maps`}>
            Back
          </Link>
        </div>
        <div className="flex justify-center items-center">
          <div
            className="radial-progress bg-primary/10 text-primary border-4 border-transparent text-sm"
            // @ts-ignore
            style={{ "--value": progress }}
            role="progressbar"
            aria-label="Primary Radial Progressbar"
          >
            {progress}%
          </div>
        </div>
      </div>
    </div>
  );
}
