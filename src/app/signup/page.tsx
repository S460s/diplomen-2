"use client";

import { useActionState } from "react";
import Form from "next/form";
import clsx from "clsx";

import { signUp } from "@/app/signup/actions";
export default function Page() {
  const [state, action, pending] = useActionState(signUp, null);

  return (
    <>
      <div className="flex justify-center items-center h-[100%]">
        <div className="flex justify-center align-center md:w-1/2">
          <div className="bg-base-100 w-full rounded-lg shadow">
            <h5 className="bg-base-300 rounded-t-lg p-4 text-xl font-bold">
              Sign up
              ...
            </h5>
            <div className="w-full p-4">
              <Form
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
                        defaultValue={state?.inputData.name}
                        type="text"
                        placeholder="Ivan Petrov"
                        className={clsx(
                          "input",
                          "input-floating",
                          state?.errors.name && "is-invalid",
                          "peer"
                        )}
                        id="name"
                        name="name"
                      />

                      <label className="input-floating-label" htmlFor="name">
                        Name
                      </label>
                    </div>
                    <span className="label">
                      <span className="label-text-alt">
                        {state?.errors.name}
                      </span>
                    </span>
                  </div>

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
                        type="text"
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
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
