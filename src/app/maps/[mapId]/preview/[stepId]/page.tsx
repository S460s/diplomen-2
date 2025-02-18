import prisma from "@/lib/prisma"
import Link from "next/link";
import Markdown from "react-markdown";
//   searchParams: Promise<{ [key: string]: string | string[] | undefined }>

export default async function Page({ params, searchParams }: { params: Promise<{ stepId: string, mapId: string }>, searchParams: Promise<{ title: string }> }) {

    const p = await params;
    const step = await prisma.step.findFirst({ where: { id: p.stepId } })
    return (
        <div className="flex justify-center items-center h-full">

            <div className="card sm:max-w-sm">
                <div className="card-header">
                    <h1 className="card-title">{(await searchParams).title}</h1>
                </div>
                <div className="card-body">
                    <Markdown>{step?.text || 'No text as of now.'}</Markdown>
                </div>
                <div className="card-footer text-center">
                    <Link className="btn" href={`/maps/${p.mapId}/steps`}>Back</Link>
                </div>
            </div>
        </div>
    )
}