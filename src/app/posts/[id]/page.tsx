import { notFound } from "next/navigation";
import prisma from "../../../lib/prisma";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const numId = parseInt(id);
    if (isNaN(numId)) notFound();

    const post = await prisma.post.findUnique({ where: { id: numId }, include: { author: true } });


    if (!post) {
        notFound();
    }

    return (
        <div>
            <h1 className="">{post.title}</h1>
            <p className="">by {post.author.name}</p>
            <div className="prose prose-gray mt-8">
                {post.content || "No content available."}
            </div>
        </div>
    )
}