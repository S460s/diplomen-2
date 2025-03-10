"use client";

import { useActionState } from "react";
import { updateUser } from "./actions";
import Form from "next/form";
import { Prisma } from "@prisma/client";
import Link from "next/link";

export default function UserForm({
  user,
  id,
}: {
  user: Prisma.UserCreateInput;
  id: number;
}) {
  const [state, action, pending] = useActionState(
    updateUser.bind(null, id),
    null
  );

  return (
    <Form action={action}>
      <div className="flex flex-col gap-4">
        <div className="w-96">
          <label className="label label-text" htmlFor="labelAndHelperText">
            Name
          </label>
          <input
            type="text"
            defaultValue={state?.inputData.name || user.name!}
            id="name"
            name="name"
            placeholder="Name"
          />
          <span className="label">
            <span className="label-text-alt">
              {state?.errors?.name && <p>{state.errors.name}</p>}
            </span>
          </span>
        </div>

        <div className="w-96">
          <label className="label label-text" htmlFor="labelAndHelperText">
            Email
          </label>
          <input
            type="text"
            defaultValue={state?.inputData.email || user.email!}
            id="email"
            name="email"
            placeholder="Email"
          />
          <span className="label">
            <span className="label-text-alt">
              {state?.errors?.email && <p>{state.errors.email}</p>}
            </span>
          </span>
        </div>
      </div>
      <div className="flex gap-2">
        <button className="btn btn-primary" disabled={pending} type="submit">
          Update
        </button>
        <Link className="btn" href="/dashboard/users">
          Back
        </Link>
      </div>
    </Form>
  );
}
