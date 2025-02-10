'use client';

import { useEffect, useState } from "react";

export default function Page() {


    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        if (typeof localStorage !== 'undefined') setToggle(!!(localStorage.getItem('theme')))
    }, [])

    console.log(toggle)
    return (
        <div className="dropdown relative inline-flex rtl:[--placement:bottom-end]">
            <button id="dropdown-default" type="button" className="dropdown-toggle btn btn-primary" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                Theme
                <span className="icon-[tabler--chevron-down] dropdown-open:rotate-180 size-4"></span>
            </button>
            <ul className="dropdown-menu dropdown-open:opacity-100 hidden min-w-60" role="menu" aria-orientation="vertical" aria-labelledby="dropdown-default">

                <span data-set-theme="" className="dropdown-item" >Default</span>
                <span data-set-theme="dark" className="dropdown-item">
                    Dark
                </span>
                <span data-set-theme="corporate" className="dropdown-item">
                    Corporate
                </span>
                <span data-set-theme="gourmet" className="dropdown-item">
                    Gourmet
                </span >
                <span data-set-theme="luxury" className="dropdown-item">
                    Luxury
                </span>
                <span data-set-theme="soft" className=" dropdown-item">Soft</span>

            </ul>
        </div>
    )
}
