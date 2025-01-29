'use client'

import { useActionState } from "react"
import { login } from "@/app/login/actions"

export default function Page() {
    const [state, action, pending] = useActionState(login, null);

    return (
        <form action={action}>
            <div>
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" placeholder="Email" />
                {state?.errors?.email && <p>{state.errors.email}</p>}
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" />
                {state?.errors?.password?.length && state.errors.password.map((err, i) => (
                    <p key={i}>{err}</p>
                ))}
            </div>
            <button type="submit">Sign In</button>
        </form>
    )
}