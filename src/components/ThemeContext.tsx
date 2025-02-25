"use client";

import React, { createContext, useState } from "react";

export type ThemeType = {
  theme: string;
  setTheme: (state: string) => void;
};

export const ThemeContext = createContext<ThemeType | null>(null);

export function ThemeProvider({
  children,
  defaultTheme,
}: {
  children: React.ReactElement;
  defaultTheme: string;
}) {
  const [theme, setTheme] = useState(defaultTheme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
