'use client';

import { useEffect, useState } from "react";

export default function Page() {


    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        if (typeof localStorage !== 'undefined') setToggle(!!(localStorage.getItem('theme')))
    }, [])

    console.log(toggle)
    return (
        <label className="swap swap-rotate">
            <input type="checkbox" defaultChecked={toggle} data-toggle-theme="light" />
            <span className="swap-off icon-[tabler--sun] size-7"></span>
            <span className="swap-on icon-[tabler--moon] size-7"></span>
        </label>
    )
}
