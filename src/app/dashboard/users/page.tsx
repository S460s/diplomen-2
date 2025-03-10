import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function Page() {
  const users = await prisma.user.findMany();

  return (
    <div className="flex justify-center items-center h-full">
      <div className="card md:w-1/2 p-12">
        <h1>Manage Users</h1>

        <ul>
          {users.map((user) => (
            <ul key={user.id} className="mb-4">
              <li>Name: {user.name}</li>
              <li>Email: {user.email}</li>
              <button className="btn btn-primary">
                <Link href={`/dashboard/users/${user.id}`}>Edit</Link>
              </button>
            </ul>
          ))}
        </ul>
      </div>
    </div>
  );
}
