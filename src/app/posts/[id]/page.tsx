import { notFound } from "next/navigation";
import prisma from "../../../lib/prisma";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const numId = parseInt(id);
    if (isNaN(numId)) notFound();

    const post = await prisma.post.findUnique({ where: { id: numId }, include: { author: true } });

    console.log(post);

    if (!post) {
        notFound();
    }

    return (
        <div>
            <h1 className="text-4xl font-bold mb-8 text-[#333333]">{post.title}</h1>
            <p className="text-gray-600 text-center">by {post.author.name}</p>
            <div className="prose prose-gray mt-8">
                {post.content || "No content available."}
            </div>
        </div>
    )
}