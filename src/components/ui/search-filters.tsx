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
   <span className="text-xs font-black text-muted-foreground/50 uppercase tracking-[0.2em] mr-2">Sort By:</span>
   {SORT_OPTIONS.map((option) => {
    const Icon = option.icon;
    const isActive = currentSort === option.value;
    
    return (
     <button
      key={option.value}
      onClick={() => handleSort(option.value)}
      className={cn(
       "flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-black transition-all border duration-300",
       isActive 
        ? "bg-accent text-white border-accent shadow-2xl scale-105 z-10"
        : "bg-background text-muted-foreground border-border hover:border-accent/30 hover:text-accent hover:bg-accent/5"
      )}
     >
      <Icon size={14} className={isActive ? "text-white" : "text-accent"} />
      {option.label}
     </button>
    );
   })}
  </div>
 );
}
