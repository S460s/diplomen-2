import { getUser } from "@/lib/dal"
import { LogOutButton } from "./components/LogOutButton"

export default async function Page() {
    const user = await getUser()

    return (
        <div className="flex justify-center items-center h-[100%]">
            <div className="card card-compact sm:max-w-sm p-8">
                <div className="card-header">
                    <h5 className="card-title">Profile Information</h5>
                </div>
                <div className="card-body">
                    <h2>Name: {user?.name}</h2>
                    <h2>Email: {user?.email}</h2>
                </div>
                <div className="card-footer text-center">
                    <LogOutButton />
                </div>
            </div>

        </div>
    )
}