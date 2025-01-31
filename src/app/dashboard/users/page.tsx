import prisma from "@/lib/prisma"
import Link from 'next/link'

export default async function Page() {
    const users = await prisma.user.findMany();

    return <div>
        <h1>Manage users</h1>
        <br />

        <ul>
            {users.map((user) => (
                <ul key={user.id}>
                    <li>Name: {user.name}</li>
                    <li>Email: {user.email}</li>
                    <Link href={`/dashboard/users/${user.id}`}>Edit</Link>
                    <br /><br />
                </ul>
            ))}
        </ul>
    </div>
}