'use client'

import { useActionState } from "react"
import { updateUser } from "./actions"
import Form from "next/form";
import { Prisma } from "@prisma/client";



export default function UserForm({ user, id }: { user: Prisma.UserCreateInput, id: number }) {
    const [state, action, pending] = useActionState(updateUser.bind(null, id), null);


    return (
        <Form action={action}>
            <div>
                <label htmlFor="name">Name</label>
                <input defaultValue={state?.inputData.name || user.name!} id="name" name="name" placeholder="Name" />
                {state?.errors?.name && <p>{state.errors.name}</p>}
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input defaultValue={state?.inputData.email || user.email!} id="email" name="email" type="email" placeholder="Email" />
                {state?.errors?.email && <p>{state.errors.email}</p>}
            </div>

            <button disabled={pending} type="submit">Update</button>
        </Form>
    )
}