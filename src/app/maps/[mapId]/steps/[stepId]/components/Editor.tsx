"use client";

import { useContext, useRef } from "react";
import { ForwardRefEditor } from "./ForwardRefEditor";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { saveStep } from "../actions";

import { notyfContext } from "@/app/maps/edit/[mapId]/components/Notyf";
import { useHotkeys } from "react-hotkeys-hook";
import { ThemeContext } from "@/components/ThemeContext";
import "./editor.css";
import Link from "next/link";

// import { saveStep } from '@/lib/actions';
// https://github.com/tailwindlabs/tailwindcss-typography
export default function Editor({
  id,
  stepId,
  markdown,
}: {
  id: string;
  stepId: string;
  markdown: string;
}) {
  const ref = useRef<MDXEditorMethods>(null);
  console.log(ref.current?.getMarkdown());

  let notyf = null;

  try {
    // notyf = new Notyf({ duration: 1000 })
    notyf = useContext(notyfContext);
  } catch (err) {
    console.log("[ERROR] cannot render notyf", err);
  }

  useHotkeys("ctrl+s", async () => {
    notyf?.success("Saved!");
    await saveStep(id, stepId, ref.current?.getMarkdown() || "");
  });

  const contextTheme = useContext(ThemeContext);
  const isDark = ["dark", "luxury", ""].includes(contextTheme?.theme || "");

  return (
    <div className="flex justify-center items-center w-full">
      <div className="m-2 p-2 card">
        <div className="flex justify-center">
          <ForwardRefEditor
            isDark={isDark}
            markdown={markdown}
            ref={ref}
          ></ForwardRefEditor>

          <div className="flex gap-2">
            <button
              className="btn"
              onClick={async () => {
                await saveStep(id, stepId, ref.current?.getMarkdown() || "");
                notyf?.success("Saved");
              }}
            >
              Save
            </button>

            <Link className="btn" href={`/maps/edit/${id}/editor`}>
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
