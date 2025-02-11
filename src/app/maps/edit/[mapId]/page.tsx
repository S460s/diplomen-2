import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { EditForm } from './components/EditForm';



export default async function Page({ params }: { params: { mapId: string } }) {
    const id = Number(params.mapId);
    console.log(id)
    if (!id) notFound();

    const map = await prisma.map.findFirst({ where: { id } });
    console.log(map)
    if (!map) notFound();

    return <EditForm map={map} />
}