import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16">
      <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)] text-[#333333]">
        Superblog
      </h1>

      <ol className="list-decimal list-inside font-[family-name:var(--font-geist-sans)]">
        <li>NextJS</li>
        <li>Prisma</li>
      </ol>
    </div>
  );
}