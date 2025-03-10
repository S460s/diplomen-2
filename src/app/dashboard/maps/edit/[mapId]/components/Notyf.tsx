'use client'
import { Notyf } from 'notyf'
import { createContext } from 'react'

import 'notyf/notyf.min.css';
import 'notyf/notyf.es'

export const notyfContext = createContext((() => {
    let notyf = null;
    try {
        notyf = new Notyf({ duration: 1500 }) // for some unknown reason it renders first on the server and then on the client
    } catch (err) {
        console.log('[ERROR] cannot make notyf')
    }

    return notyf
})())