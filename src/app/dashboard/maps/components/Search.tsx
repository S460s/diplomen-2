"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    replace(`${pathname}/?${params.toString()}`);
  }

  function handleCategory(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("category", term);
    } else {
      params.delete("category");
    }

    replace(`${pathname}/?${params.toString()}`);
  }

  return (
    <div className="input-group max-w-sm">
      <input
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query")?.toString()}
        className="input"
        placeholder="Search"
      />
    </div>
  );
}
