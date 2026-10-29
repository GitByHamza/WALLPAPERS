"use client";
import Link, { useLinkStatus } from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, LoaderCircle } from "lucide-react";

function DirectionLabel({ previous = false }: { previous?: boolean }) {
  const { pending } = useLinkStatus();
  const Icon = pending ? LoaderCircle : previous ? ArrowLeft : ArrowRight;
  const icon = <Icon size={15} aria-hidden="true" className={pending ? "animate-spin" : undefined} />;
  return (
    <>
      {previous && icon}
      <span aria-live="polite">{pending ? "Loading…" : previous ? "Previous" : "Next"}</span>
      {!previous && icon}
    </>
  );
}
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
        <Link className="page-direction" href={href(currentPage - 1)} prefetch aria-label="Previous page">
          <DirectionLabel previous />
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
            prefetch={false}
            aria-label={`Page ${page}`}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </Link>
        ))}
      </div>
      {currentPage < totalPages ? (
        <Link className="page-direction" href={href(currentPage + 1)} prefetch aria-label="Next page">
          <DirectionLabel />
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
