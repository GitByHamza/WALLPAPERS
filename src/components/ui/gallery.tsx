import { Suspense } from "react";
import type { WallhavenResponse, WallpaperSort } from "@/lib/wallhaven";
import { WallpaperCard } from "./wallpaper-card";
import { Pagination } from "./pagination";
import { SearchFilters } from "./search-filters";
import { CollectionInsights } from "./collection-insights";
import { EmptyState } from "./empty-state";
export function GallerySkeleton() {
  return (
    <div className="gallery-grid loading-gallery" role="status" aria-label="Loading wallpapers">
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i}>
          <div className="loading-image" />
          <div className="loading-caption" />
        </div>
      ))}
    </div>
  );
}
export function Gallery({
  data,
  baseUrl,
  defaultSort = "toplist",
  mobile = false,
  portrait = mobile,
  query = "",
  priority = true,
}: {
  data: WallhavenResponse | null;
  baseUrl: string;
  defaultSort?: WallpaperSort;
  mobile?: boolean;
  portrait?: boolean;
  query?: string;
  priority?: boolean;
}) {
  return (
    <>
      <Suspense fallback={<div className="gallery-toolbar">Loading filters…</div>}>
        <SearchFilters defaultSort={defaultSort} mobile={mobile} />
      </Suspense>
      {data ? (
        <>
          <div className="flex items-center justify-between gap-4 mb-5 collection-count">
            <span>
              {data.meta.total.toLocaleString("en")} wallpapers
              {query ? ` for “${query}”` : " to explore"}
            </span>
            <span>Page {data.meta.current_page.toLocaleString("en")}</span>
          </div>
          {data.data.length ? (
            <>
              <div className={`gallery-grid${portrait ? " portrait" : ""}`}>
                {data.data.map((image, index) => (
                  <WallpaperCard
                    key={image.id}
                    image={image}
                    priority={priority && index < 3}
                    portrait={portrait}
                  />
                ))}
              </div>
              <CollectionInsights images={data.data} />
              <Suspense>
                <Pagination
                  currentPage={data.meta.current_page}
                  totalPages={data.meta.last_page}
                  baseUrl={baseUrl}
                  seed={data.meta.seed}
                />
              </Suspense>
            </>
          ) : (
            <EmptyState query={query} />
          )}
        </>
      ) : (
        <EmptyState error />
      )}
    </>
  );
}
