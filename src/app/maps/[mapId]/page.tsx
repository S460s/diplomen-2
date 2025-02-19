import prisma from "@/lib/prisma";
import { formatter, shortFormatter } from "@/util";
import Link from "next/link";
import { notFound } from "next/navigation";



export default async function Page({ params }: { params: { mapId: string } }) {
    const p = await params
    const id = Number(p.mapId);
    if (!id) notFound();

    const map = await prisma.map.findFirst({ where: { id } });
    if (!map) notFound();

    return (
        <div className="flex justify-center items-center h-[100%]">
            <div className="card card-compact sm:max-w-[80%] p-8">
                <div className="card-header">
                    <h5 className="card-title">{map.title}</h5>
                </div>
                <div className="card-body">
                    <h3 className="font-light text-sm">Created at: {shortFormatter.format(map.createdAt)}</h3>
                    <h3 className="font-light text-sm">Updated at: {shortFormatter.format(map.updatedAt)}</h3>

                    <h4 className="mt-2">{map.description}</h4>
                </div>
                <div className="card-footer text-center">
                    <Link className="btn" href={`/maps/${map.id}/steps`} >View Steps</Link>
                </div>
            </div>

        </div>
    )
}