import prisma from '@/lib/prisma';
import Editor from './components/Editor';


export default async function Page({
    params,
}: {
    params: { mapId: string; stepId: string };
}) {
    const p = await params;
    let step = null;

    try {
        step = await prisma.step.findFirst({ where: { id: p.stepId } });
    } catch (err) {
        console.log('[ERROR] cannot find step')
    }


    return (
        <div className='flex [&>h1]:text-lg'>
            <Editor
                stepId={p.stepId}
                id={p.mapId}
                markdown={step?.text || ''}
            ></Editor>

        </div>
    );
}
