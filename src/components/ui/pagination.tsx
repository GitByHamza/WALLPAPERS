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
   <div className="flex items-center justify-center gap-3 mt-16 mb-8">
    {/* Previous Button */}
    <Link
     href={createPageUrl(currentPage - 1)}
     className={cn(
      "p-3 rounded-2xl bg-background border border-border text-foreground/50 hover:border-accent hover:text-accent transition-all duration-300 disabled:opacity-50 shadow-sm hover:shadow-md",
      currentPage <= 1 && "pointer-events-none opacity-30"
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
       "w-12 h-12 flex items-center justify-center rounded-2xl border text-sm font-black transition-all duration-300",
       currentPage === page
        ? "bg-foreground text-background border-foreground shadow-xl scale-110 z-10"
        : "bg-background border-border text-foreground/50 hover:border-accent hover:text-accent hover:bg-accent/5"
      )}
     >
      {page}
     </Link>
    ))}

    {/* Next Button */}
    <Link
     href={createPageUrl(currentPage + 1)}
     className={cn(
      "p-3 rounded-2xl bg-background border border-border text-foreground/50 hover:border-accent hover:text-accent transition-all duration-300 disabled:opacity-50 shadow-sm hover:shadow-md",
      currentPage >= totalPages && "pointer-events-none opacity-30"
     )}
     aria-disabled={currentPage >= totalPages}
    >
     <ChevronRight size={20} />
    </Link>
   </div>
 );
}
