import prisma from "@/lib/prisma";
import { formatter, shortFormatter } from "@/util";
import { notFound } from "next/navigation";



export default async function Page({ params }: { params: { mapId: string } }) {
    const id = Number(params.mapId);
    if (!id) notFound();

    const map = await prisma.map.findFirst({ where: { id } });
    if (!map) notFound();

    return (
        <div className="flex justify-center items-center h-[100%]">
            <div className="card card-compact sm:max-w-sm p-8">
                <div className="card-header">
                    <h5 className="card-title">{map.title}</h5>
                </div>
                <div className="card-body">
                    <h3 className="font-light text-sm">Created at: {shortFormatter.format(map.createdAt)}</h3>
                    <h3 className="font-light text-sm">Updated at: {shortFormatter.format(map.updatedAt)}</h3>

                    <h2 className="mt-2">{map.description}</h2>
                </div>
                <div className="card-footer text-center">
                    <button className="btn">View Steps</button>
                </div>
            </div>

        </div>
    )
}