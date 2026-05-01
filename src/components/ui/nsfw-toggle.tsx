"use client";

import { Eye, EyeOff } from "lucide-react";
import { toggleNsfw } from "@/app/actions";
import { useState, useTransition } from "react";
import { cn } from "@/lib/utils";

export function NsfwToggle({ initialValue }: { initialValue: boolean }) {
 const [isNsfw, setIsNsfw] = useState(initialValue);
 const [isPending, startTransition] = useTransition();

 const handleToggle = () => {
  const nextState = !isNsfw;
  setIsNsfw(nextState);

  startTransition(async () => {
   try {
    await toggleNsfw(isNsfw);
   } catch (error) {
    setIsNsfw(!nextState);
    console.error("Failed to toggle NSFW:", error);
   }
  });
 };

 return (
  <button
   onClick={handleToggle}
   disabled={isPending}
   className={cn(
    "flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border duration-300 shadow-sm",
    isPending && "opacity-70 cursor-not-allowed",
    isNsfw
     ? "bg-red-500/10 border-red-500/20 text-red-500 hover:bg-red-500/20"
     : "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20"
   )}
   title={isNsfw ? "NSFW Content Allowed" : "SFW Only"}
  >
   {isPending ? (
    <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
   ) : (
    isNsfw ? <Eye size={14} className="animate-pulse" /> : <EyeOff size={14} />
   )}
   <span>{isNsfw ? "NSFW" : "SFW"}</span>
  </button>
 );
}
