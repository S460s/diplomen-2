import { getUser } from "@/lib/dal"

export default async function Page() {
    const user = await getUser()
    console.log(user)

    return (
        <div>
            <h1>Profile page here</h1>
        </div>
    )
}