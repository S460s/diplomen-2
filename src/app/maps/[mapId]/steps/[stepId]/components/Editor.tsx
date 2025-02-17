'use client';

import { useContext, useRef } from 'react';
import { ForwardRefEditor } from './ForwardRefEditor';
import { MDXEditorMethods } from '@mdxeditor/editor';
import { saveStep } from '../actions';

import { notyfContext } from '@/app/maps/edit/[mapId]/components/Notyf';

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

  let notyf = null

  try {
    // notyf = new Notyf({ duration: 1000 })
    notyf = useContext(notyfContext)
  } catch (err) {
    console.log('[ERROR] cannot render notyf')
  }
  console.log(notyf)


  return (
    <div className="w-screen m-2 border-primary border-2">
      <div className="flex justify-center">
        <ForwardRefEditor markdown={markdown} ref={ref}></ForwardRefEditor>

        <button className='btn'
          onClick={async (e) => {
            await saveStep(id, stepId, ref.current?.getMarkdown() || '')
            notyf?.success('Saved')
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}
