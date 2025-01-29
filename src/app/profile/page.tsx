import { getUser } from "@/lib/dal"
import { LogOutButton } from "./components/LogOutButton"

export default async function Page() {
    const user = await getUser()

    return (
        <div>
            <h1>Profile page here</h1>
            <h2>Name: {user?.name}</h2>
            <h2>Email: {user?.email}</h2>
            <LogOutButton />
        </div>
    )
}