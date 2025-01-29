import Link from 'next/link'

export function NavBar({ isAdmin, isAuthed }: { isAdmin: boolean, isAuthed: boolean }) {
    return (
        <nav className="flex gap-3 justify-center">
            {isAuthed ?
                <>
                    <Link href="/posts">Posts</Link>
                    <Link href="/profile">Profile</Link>
                    {isAdmin && (
                        <>
                            <Link href="/dashboard">Dashboard</Link>
                        </>
                    )}
                </>
                :
                <>
                    <Link href="/login">Login</Link>
                    <Link href="/signup">Signup</Link>
                </>
            }
        </nav>
    )
}