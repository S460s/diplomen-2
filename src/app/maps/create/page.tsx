'use client'

import { useActionState } from "react"
import { createMap } from "./actions";
import Form from "next/form";
import clsx from "clsx";

export default function Page() {
    const [state, action, pending] = useActionState(createMap, null);
    console.log(state)

    return (
        <div className="flex justify-center items-center h-[100%]">
            <div className="flex justify-center align-center lg:w-1/2">
                <div className="bg-base-100 w-full rounded-lg shadow">
                    <h5 className="bg-base-300 rounded-t-lg p-4 text-xl font-bold">Create Map</h5>
                    <div className="w-full p-4">
                        <form className="needs-validation peer grid gap-y-4" action={action}>

                            <div className="w-full">
                                <h6 className="text-lg font-semibold">Map Details</h6>
                                <hr className="mb-4 mt-2" />
                            </div>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                                <div className="max-w-sm">
                                    <div className="relative">
                                        <input defaultValue={state?.inputData.title} type="text" placeholder="Learn to program" className={clsx("input", "input-floating", state?.errors.title && "is-invalid", "peer")} id="title" name="title" />

                                        <label className="input-floating-label" htmlFor="title">Title</label>
                                    </div>
                                    <span className="label">
                                        <span className="label-text-alt">{state?.errors.title}</span>
                                    </span>
                                </div>

                                <br />

                                <div className="w-full sm:w-96">
                                    <label className="label label-text" htmlFor="description">Description</label>
                                    <textarea defaultValue={state?.inputData.description} name='description' className={clsx('textarea', state?.errors.description && 'is-invalid')} placeholder="Lorem ipsum" id="description"></textarea>
                                    <div className="label">
                                        <span className="label-text-alt">{state?.errors.description}</span>
                                    </div>
                                </div>
                            </div>



                            <div className="mt-4">
                                <button type="submit" name="submitButton" className="btn btn-primary" disabled={pending}>Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}