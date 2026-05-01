"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Clock, TrendingUp, Shuffle, Eye, Heart, Star } from "lucide-react";

const SORT_OPTIONS = [
 { label: "Relevance", value: "relevance", icon: Star },
 { label: "Latest", value: "date_added", icon: Clock },
 { label: "Random", value: "random", icon: Shuffle },
 { label: "Views", value: "views", icon: Eye },
 { label: "Favorites", value: "favorites", icon: Heart },
 { label: "Toplist", value: "toplist", icon: TrendingUp },
];

export function SearchFilters() {
 const router = useRouter();
 const searchParams = useSearchParams();
 const currentSort = searchParams.get("sort") || "relevance";

 const handleSort = (value: string) => {
  const params = new URLSearchParams(searchParams.toString());
  params.set("sort", value);
  params.set("page", "1"); // Reset to page 1 on sort change
  router.push(`/search?${params.toString()}`);
 };

 return (
  <div className="flex flex-wrap items-center gap-2 mb-10 animate-fade-in-up delay-100">
   <span className="text-xs font-bold text-white/30 uppercase tracking-[0.2em] mr-2">Sort By:</span>
   {SORT_OPTIONS.map((option) => {
    const Icon = option.icon;
    const isActive = currentSort === option.value;
    
    return (
     <button
      key={option.value}
      onClick={() => handleSort(option.value)}
      className={cn(
       "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border",
       isActive 
        ? "bg-accent text-white border-accent shadow-[0_0_20px_rgba(var(--accent),0.3)] scale-105"
        : "bg-white/5 text-white/40 border-white/10 hover:bg-white/10 hover:text-white"
      )}
     >
      <Icon size={14} />
      {option.label}
     </button>
    );
   })}
  </div>
 );
}
