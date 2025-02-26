"use client";
// ForwardRefEditor.tsx

import dynamic from "next/dynamic";
import { forwardRef } from "react";

// This is the only place InitializedMDXEditor is imported directly.
const Editor = dynamic(() => import("./InitializedMDXEditor"), {
  // Make sure we turn SSR off
  ssr: false,
});

import { MDXEditorProps, MDXEditorMethods } from "@mdxeditor/editor";
import clsx from "clsx";

// This is what is imported by other components. Pre-initialized with plugins, and ready
// to accept other props, including a ref.
interface MDXEditorPropsDark extends MDXEditorProps {
  isDark: boolean;
}

export const ForwardRefEditor = forwardRef<
  MDXEditorMethods,
  MDXEditorPropsDark
>((props, ref) => (
  <Editor
    className={clsx(props.isDark && "dark-theme dark-editor")}
    {...props}
    editorRef={ref}
  />
));

// TS complains without the following line
ForwardRefEditor.displayName = "ForwardRefEditor";
