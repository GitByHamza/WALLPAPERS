"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
 totalPages: number;
 currentPage: number;
 baseUrl: string;
}

export function Pagination({ totalPages, currentPage, baseUrl }: PaginationProps) {
 const searchParams = useSearchParams();

 // Helper to build URL with existing search params + new page
 const createPageUrl = (page: number) => {
  const params = new URLSearchParams(searchParams.toString());
  params.set("page", page.toString());
  return `${baseUrl}?${params.toString()}`;
 };

 // Generate page numbers to show (max 5)
 const getPageNumbers = () => {
  const pages = [];
  let start = Math.max(1, currentPage - 2);
  let end = Math.min(totalPages, start + 4);

  if (end - start < 4) {
   start = Math.max(1, end - 4);
  }

  for (let i = start; i <= end; i++) {
   pages.push(i);
  }
  return pages;
 };

 if (totalPages <= 1) return null;

 return (
  <div className="flex items-center justify-center gap-2 mt-12 mb-8">
   {/* Previous Button */}
   <Link
    href={createPageUrl(currentPage - 1)}
    className={cn(
     "p-2 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white transition-all disabled:opacity-50 disabled:pointer-events-none",
     currentPage <= 1 && "pointer-events-none opacity-50"
    )}
    aria-disabled={currentPage <= 1}
   >
    <ChevronLeft size={20} />
   </Link>

   {/* Page Numbers */}
   {getPageNumbers().map((page) => (
    <Link
     key={page}
     href={createPageUrl(page)}
     className={cn(
      "w-10 h-10 flex items-center justify-center rounded-lg border text-sm font-medium transition-all",
      currentPage === page
       ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)] scale-110"
       : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white hover:border-white/30"
     )}
    >
     {page}
    </Link>
   ))}

   {/* Next Button */}
   <Link
    href={createPageUrl(currentPage + 1)}
    className={cn(
     "p-2 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white transition-all disabled:opacity-50 disabled:pointer-events-none",
     currentPage >= totalPages && "pointer-events-none opacity-50"
    )}
    aria-disabled={currentPage >= totalPages}
   >
    <ChevronRight size={20} />
   </Link>
  </div>
 );
}
