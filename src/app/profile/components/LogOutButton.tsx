'use client'

import { logOut } from "@/app/profile/actions"
import { redirect } from "next/navigation"

export function LogOutButton() {
    const handleLogOut = async () => {
        localStorage.clear()
        await logOut()
        redirect('/signup')
    }

    return <button className="btn btn-error" onClick={handleLogOut}>Log out</button>
}