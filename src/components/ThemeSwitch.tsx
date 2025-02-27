"use client";

import { ReactElement, ReactNode, useContext } from "react";
import { themeAction } from "@/actions/theme";
import { ThemeContext } from "./ThemeContext";

export default function Page() {
  const theme = useContext(ThemeContext);

  const handleThemeChange = async (e: any) => {
    e.preventDefault();
    const currentTheme = e.target.dataset.setTheme;
    theme?.setTheme(currentTheme);
    await themeAction(currentTheme);
  };

  return (
    <div className="dropdown relative inline-flex rtl:[--placement:bottom-end]">
      <button
        id="dropdown-default"
        type="button"
        className="dropdown-toggle btn btn-primary"
        aria-haspopup="menu"
        aria-expanded="false"
        aria-label="Dropdown"
      >
        Theme
        <span className="icon-[tabler--chevron-down] dropdown-open:rotate-180 size-4"></span>
      </button>
      <form
        className="dropdown-menu dropdown-open:opacity-100 hidden min-w-60"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="dropdown-default"
      >
        <span
          onClick={handleThemeChange}
          data-set-theme=""
          className="dropdown-item"
        >
          Default
        </span>
        <span
          onClick={handleThemeChange}
          data-set-theme="dark"
          className="dropdown-item"
        >
          Dark
        </span>
        <span
          onClick={handleThemeChange}
          data-set-theme="corporate"
          className="dropdown-item"
        >
          Corporate
        </span>
        <span
          onClick={handleThemeChange}
          data-set-theme="gourmet"
          className="dropdown-item"
        >
          Gourmet
        </span>
        <span
          onClick={handleThemeChange}
          data-set-theme="luxury"
          className="dropdown-item"
        >
          Luxury
        </span>
        <span
          onClick={handleThemeChange}
          data-set-theme="soft"
          className=" dropdown-item"
        >
          Soft
        </span>
      </form>
    </div>
  );
}
