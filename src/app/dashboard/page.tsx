import Link from "next/link";

export default async function Page() {
    return <div>
        <h1>Admin stuff here</h1>
        <Link href={'/dashboard/users'}>Manage users</Link>

    </div>
}