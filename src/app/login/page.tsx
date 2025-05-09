"use client";

import { useActionState } from "react";
import { login } from "@/app/login/actions";

import clsx from "clsx";
import Link from "next/link";

export default function Page() {
  const [state, action, pending] = useActionState(login, null);

  return (
    <div className="flex justify-center items-center h-[100%]">
      <div className="flex justify-center align-center md:w-1/2">
        <div className="bg-base-100 w-full rounded-lg shadow">
          <h5 className="bg-base-300 rounded-t-lg p-4 text-xl font-bold">
            Login
          </h5>
          <div className="w-full p-4">
            <form
              className="needs-validation peer grid gap-y-4"
              action={action}
            >
              <div className="w-full">
                <h6 className="text-lg font-semibold">1. Account Details</h6>
                <hr className="mb-4 mt-2" />
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="max-w-sm">
                  <div className="relative">
                    <input
                      defaultValue={state?.inputData.email}
                      type="email"
                      placeholder="mymail@gmail.com"
                      className={clsx(
                        "input",
                        "input-floating",
                        state?.errors.email && "is-invalid",
                        "peer"
                      )}
                      id="mail"
                      name="email"
                    />

                    <label className="input-floating-label" htmlFor="mail">
                      Email
                    </label>
                  </div>
                  <span className="label">
                    <span className="label-text-alt">
                      {state?.errors.email}
                    </span>
                  </span>
                </div>

                <div className="max-w-sm">
                  <div className="relative">
                    <input
                      defaultValue={state?.inputData.password}
                      type="password"
                      placeholder="not qwerty pls"
                      className={clsx(
                        "input",
                        "input-floating",
                        state?.errors.password && "is-invalid",
                        "peer"
                      )}
                      id="pass"
                      name="password"
                    />
                    <label className="input-floating-label" htmlFor="pass">
                      Password
                    </label>
                  </div>
                  <span className="label">
                    <span className="label-text-alt">
                      {state?.errors.password}
                    </span>
                  </span>
                </div>
              </div>
              <p>
                No account? Go to <Link href={"/signup"}> Sign up.</Link>
              </p>

              <div className="mt-4">
                <button
                  type="submit"
                  name="submitButton"
                  className="btn btn-primary"
                  disabled={pending}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
