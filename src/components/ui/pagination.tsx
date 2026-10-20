"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
export function Pagination({
  totalPages,
  currentPage,
  baseUrl,
  seed,
}: {
  totalPages: number;
  currentPage: number;
  baseUrl: string;
  seed?: string | null;
}) {
  const params = useSearchParams();
  if (totalPages <= 1) return null;
  function href(page: number) {
    const next = new URLSearchParams(params.toString());
    next.set("page", String(page));
    if (seed) next.set("seed", seed);
    return `${baseUrl}?${next}`;
  }
  const start = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
  const pages = Array.from({ length: Math.min(5, totalPages) }, (_, index) => start + index);
  return (
    <nav className="pagination" aria-label="Wallpaper pages">
      {currentPage > 1 ? (
        <Link className="page-direction" href={href(currentPage - 1)} aria-label="Previous page">
          <ArrowLeft size={15} />
          <span>Previous</span>
        </Link>
      ) : (
        <span className="unavailable page-direction" aria-disabled="true">
          <ArrowLeft size={15} />
          <span>Previous</span>
        </span>
      )}
      <div className="page-numbers">
        {pages.map((page) => (
          <Link
            key={page}
            href={href(page)}
            aria-label={`Page ${page}`}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </Link>
        ))}
      </div>
      {currentPage < totalPages ? (
        <Link className="page-direction" href={href(currentPage + 1)} aria-label="Next page">
          <span>Next</span>
          <ArrowRight size={15} />
        </Link>
      ) : (
        <span className="unavailable page-direction" aria-disabled="true">
          <span>Next</span>
          <ArrowRight size={15} />
        </span>
      )}
    </nav>
  );
}
