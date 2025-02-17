'use client'
import { useContext, useState } from "react";
import { createContext } from "react";

import 'notyf/notyf.min.css';
import 'notyf/notyf.es'

import { Notyf } from "notyf";

export const notyfContext = createContext(new Notyf({
    duration: 1500
}))

