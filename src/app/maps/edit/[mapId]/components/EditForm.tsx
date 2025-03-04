"use client";
import { useActionState } from "react";
import { deleteMap, editMap } from "../actions";
import { Prisma } from "@prisma/client";
import clsx from "clsx";
import Link from "next/link";

export function EditForm({ map }: { map: Prisma.MapGetPayload<{}> }) {
  const [state, action, pending] = useActionState(
    editMap.bind(null, map.id),
    null
  );

  return (
    <div className="flex justify-center items-center h-[100%]">
      <div className="flex justify-center align-center lg:w-1/2">
        <div className="bg-base-100 w-full rounded-lg shadow">
          <h5 className="bg-base-300 rounded-t-lg p-4 text-xl font-bold">
            Create Map
          </h5>
          <div className="w-full p-4">
            <form
              className="needs-validation peer grid gap-y-4"
              action={action}
            >
              <div className="w-full">
                <h6 className="text-lg font-semibold">Map Details</h6>
                <hr className="mb-4 mt-2" />
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="max-w-sm">
                  <div className="relative">
                    <input
                      defaultValue={state?.inputData.title || map.title}
                      type="text"
                      placeholder="Learn to program"
                      className={clsx(
                        "input",
                        "input-floating",
                        state?.errors.title && "is-invalid",
                        "peer"
                      )}
                      id="title"
                      name="title"
                    />

                    <label className="input-floating-label" htmlFor="title">
                      Title
                    </label>
                  </div>
                  <span className="label">
                    <span className="label-text-alt">
                      {state?.errors.title}
                    </span>
                  </span>
                </div>

                <br />

                <div className="w-full sm:w-96">
                  <label className="label label-text" htmlFor="description">
                    Description
                  </label>
                  <textarea
                    defaultValue={
                      state?.inputData.description || map.description
                    }
                    name="description"
                    className={clsx(
                      "textarea",
                      state?.errors.description && "is-invalid"
                    )}
                    placeholder="Lorem ipsum"
                    id="description"
                  ></textarea>
                  <div className="label">
                    <span className="label-text-alt">
                      {state?.errors.description}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  defaultChecked={map.published}
                  type="checkbox"
                  id="published"
                  name="published"
                  className="switch switch-primary"
                />
                <label className="label text-base" htmlFor="published">
                  Publish Map
                </label>
              </div>

              <div className="mt-4 flex gap-2 flex-wrap">
                <button
                  type="submit"
                  name="submitButton"
                  className="btn btn-primary"
                  disabled={pending}
                >
                  Update
                </button>
                <Link href={`/maps/edit/${map.id}/editor`} className="btn">
                  Editor
                </Link>
                <Link href={`/maps/${map.id}`} className="btn">
                  Preview
                </Link>
                <Link className="btn btn-accent" href={`/maps`}>
                  Back
                </Link>

                <button
                  type="button"
                  className="btn btn-error"
                  aria-haspopup="dialog"
                  aria-expanded="false"
                  aria-controls="basic-modal"
                  data-overlay="#basic-modal"
                >
                  Delete
                </button>

                <div
                  id="basic-modal"
                  className="overlay modal overlay-open:opacity-100 hidden"
                  role="dialog"
                  tabIndex={-1}
                >
                  <div className="modal-dialog overlay-open:opacity-100">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h3 className="modal-title">Map Deletion</h3>
                        <button
                          type="button"
                          className="btn btn-text btn-circle btn-sm absolute end-3 top-3"
                          aria-label="Close"
                          data-overlay="#basic-modal"
                        >
                          <span className="icon-[tabler--x] size-4"></span>
                        </button>
                      </div>
                      <div className="modal-body">
                        Are you sure you want to delete map "{map.title}"?
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-soft btn-secondary"
                          data-overlay="#basic-modal"
                        >
                          Close
                        </button>
                        <button
                          onClick={async () => {
                            await deleteMap(map.id);
                          }}
                          type="button"
                          name="delete"
                          className="btn btn-error"
                          data-overlay="#basic-modal"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
