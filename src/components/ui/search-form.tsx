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
   <Search className="absolute left-4 w-4 h-4 text-muted-foreground group-focus-within:text-accent transition-colors z-20" />
   <input
    type="text"
    placeholder="Search wallpapers (e.g. 'Nature', 'Cyberpunk')..."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    className="w-full bg-muted/30 backdrop-blur-xl border border-border rounded-full py-2.5 pl-12 pr-4 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:bg-muted/50 focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all shadow-inner"
   />
  </form>
 );
}
