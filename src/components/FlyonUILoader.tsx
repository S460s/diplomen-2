'use client';
import { themeChange } from 'theme-change'

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { IStaticMethods } from 'flyonui/flyonui';
declare global {
    interface Window {
        HSStaticMethods: IStaticMethods;
    }
}

export default function FlyonuiScript() {
    const path = usePathname();

    useEffect(() => {
        themeChange(false)
    }, [])

    useEffect(() => {
        const loadFlyonui = async () => {
            await import('flyonui/flyonui');
            window.HSStaticMethods.autoInit();
        };
        loadFlyonui();
    }, [path]);

    return null;
}