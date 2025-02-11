import Link from 'next/link'

export default function Page() {
    return (
        <div>
            <h1>Maps will be listed here</h1>
            <Link href={'/maps/create'} >Create a new map</Link>
        </div>
    )
}