'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function Search() {
    const searchParams = useSearchParams();
    const pathname = usePathname()
    const { replace } = useRouter()

    function handleSearch(term: string) {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }

        replace(`${pathname}/?${params.toString()}`)
    }

    return (
        <div className="input-group max-w-sm">
            <input onChange={(e) => handleSearch(e.target.value)} defaultValue={searchParams.get('query')?.toString()} className="input" placeholder="Search" />
            <select className="select input-group-text w-1/3 max-sm:w-3/5" aria-label="select">
                <option value={'all'}>All</option>
                <option value={'my'}>My</option>
            </select>
        </div>
    )
}