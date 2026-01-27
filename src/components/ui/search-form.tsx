"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SearchForm() {
 const [query, setQuery] = useState("");
 const router = useRouter();

 const handleSearch = (e: React.FormEvent) => {
  e.preventDefault();
  if (query.trim()) {
   router.push(`/search?q=${encodeURIComponent(query)}`);
  }
 };

 return (
  <form onSubmit={handleSearch} className="hidden md:flex items-center relative w-96 group">
   <Search className="absolute left-3 w-4 h-4 text-white/40 group-focus-within:text-white/80 transition-colors" />
   <input
    type="text"
    placeholder="Search wallpapers (e.g. 'Nature', 'Cyberpunk')..."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white placeholder-white/40 focus:outline-none focus:bg-white/10 focus:border-white/20 transition-all shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
   />
  </form>
 );
}
