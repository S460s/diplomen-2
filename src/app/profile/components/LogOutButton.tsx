'use client'

import { logOut } from "@/app/profile/actions"
import { redirect } from "next/navigation"

export function LogOutButton() {
    const handleLogOut = async () => {
        await logOut()
        redirect('/signup')
    }

    return <button onClick={handleLogOut}>Log out</button>
}