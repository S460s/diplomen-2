'use client'

import { useActionState } from "react"
import { signUp } from "@/app/signup/actions"
import Form from "next/form";

export default function Page() {
    const [state, action, pending] = useActionState(signUp, null);

    return (
        <Form action={action}>
            <div>
                <label htmlFor="name">Name</label>
                <input defaultValue={state?.inputData.name} id="name" name="name" placeholder="Name" />
                {state?.errors?.name && <p>{state.errors.name}</p>}
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input defaultValue={state?.inputData.email} id="email" name="email" type="email" placeholder="Email" />
                {state?.errors?.email && <p>{state.errors.email}</p>}
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input defaultValue={state?.inputData.password} id="password" name="password" type="password" />
                {state?.errors?.password?.length && state.errors.password.map((err, i) => (
                    <p key={i}>{err}</p>
                ))}
            </div>
            <button disabled={pending} type="submit">Sign Up</button>
        </Form>
    )
}