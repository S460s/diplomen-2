import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function Home() {
  const users = await prisma.user.findMany()
  console.log(users)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16">
      <nav className="flex gap-3">
        <Link href="/posts">Posts</Link>
        <Link href="/login">Login</Link>
        <Link href="/signup">Signup</Link>
      </nav>
      <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)] text-[#333333]">
        Superblog
      </h1>
      <ol className="list-decimal list-inside font-[family-name:var(--font-geist-sans)]">

        {users.map((user) => (
          <li key={user.id}>{user.name} {user.isAdmin ? "Admin" : "Not admin"}</li>
        ))}
      </ol>
    </div>
  );
}