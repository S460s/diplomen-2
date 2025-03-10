"use client";
// https://mdxeditor.dev/editor/docs/customizing-toolbar
// InitializedMDXEditor.tsx
import { type ForwardedRef } from "react";
import "@mdxeditor/editor/style.css";
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  type MDXEditorMethods,
  type MDXEditorProps,
  linkPlugin,
  linkDialogPlugin,
  CreateLink,
  BlockTypeSelect,
} from "@mdxeditor/editor";

// Only import this to the next file
export default function InitializedMDXEditor({
  editorRef,
  ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
  return (
    <MDXEditor
      className="bg-base-100 text-base-content border border-primary rounded-lg p-4 prose flex"
      plugins={[
        // Example Plugin Usage
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        linkPlugin(),
        linkDialogPlugin(),

        toolbarPlugin({
          toolbarContents: () => (
            <>
              <UndoRedo />
              <BoldItalicUnderlineToggles />
              <CreateLink />
              <BlockTypeSelect />
            </>
          ),
        }),
      ]}
      {...props}
      ref={editorRef}
    />
  );
}
