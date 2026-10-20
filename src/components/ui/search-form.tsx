"use client";
import { ArrowUpRight, Search } from "lucide-react";
import { useId } from "react";
export function SearchForm({ onSubmit }: { onSubmit?: () => void }) {
  const id = useId();
  return (
    <form action="/search" className="search-form" role="search" onSubmit={onSubmit}>
      <Search size={17} aria-hidden="true" />
      <label htmlFor={id} className="sr-only">
        Search wallpapers
      </label>
      <input
        id={id}
        name="q"
        type="search"
        placeholder="Search wallpapers"
        autoComplete="off"
        maxLength={160}
      />
      <button type="submit" aria-label="Search wallpapers">
        <ArrowUpRight size={16} />
      </button>
    </form>
  );
}
