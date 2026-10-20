"use client";
import Link from "next/link";
import { SlidersHorizontal, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { SORT_OPTIONS, scalar } from "@/lib/collection-options";
import { RESOLUTION_PRESETS } from "@/lib/resolutions";
import type { WallpaperSort } from "@/lib/wallhaven";
const topics = ["Nature", "Minimal", "Abstract", "Space", "Architecture"];
const filterKeys = ["category", "resolution", "orientation", "color", "match"];
export function SearchFilters({
  defaultSort = "toplist",
  mobile = false,
}: {
  defaultSort?: WallpaperSort;
  mobile?: boolean;
}) {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [expanded, setExpanded] = useState(() => filterKeys.some((key) => params.has(key)));
  const [pending, startTransition] = useTransition();
  const query = params.get("q") || "";
  const portrait = mobile || params.get("orientation") === "portrait";
  const requested = params.get("resolution");
  const resolution =
    RESOLUTION_PRESETS.find((preset) => preset.value === requested)?.value ||
    (portrait ? "hd" : "4k");
  const activeFilters = filterKeys.filter((key) => params.has(key)).length;
  function update(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    next.delete("page");
    next.delete("seed");
    startTransition(() => router.push(`${pathname}?${next.toString()}`, { scroll: false }));
  }
  function subjectHref(subject?: string) {
    const next = new URLSearchParams(params.toString());
    if (subject) next.set("q", subject.toLowerCase());
    else next.delete("q");
    next.delete("page");
    next.delete("seed");
    return `${mobile ? "/mobile" : "/search"}?${next.toString()}`;
  }
  return (
    <div aria-busy={pending} className={pending ? "pending" : ""}>
      <div className="gallery-toolbar">
        <nav className="category-links" aria-label="Wallpaper subjects">
          <Link href={subjectHref()} aria-current={!query ? "page" : undefined}>
            All wallpapers
          </Link>
          {topics.map((topic) => (
            <Link
              key={topic}
              href={subjectHref(topic)}
              aria-current={query.toLowerCase() === topic.toLowerCase() ? "page" : undefined}
            >
              {topic}
            </Link>
          ))}
        </nav>
        <div className="toolbar-actions">
          <label className="sort-label">
            Sort by
            <select
              aria-label="Sort wallpapers"
              value={
                SORT_OPTIONS.find((option) => option.value === params.get("sort"))?.value ||
                defaultSort
              }
              onChange={(event) => update("sort", event.target.value)}
              disabled={pending}
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <button
            className="filter-toggle"
            type="button"
            aria-expanded={expanded}
            aria-controls="wallpaper-filters"
            onClick={() => setExpanded(!expanded)}
          >
            <SlidersHorizontal size={14} />
            Filters{activeFilters ? ` (${activeFilters})` : ""}
          </button>
        </div>
      </div>
      {expanded && (
        <div className="filter-panel expanded-filters" id="wallpaper-filters">
          <fieldset className="resolution-fieldset">
            <legend>Resolution</legend>
            <div className="resolution-options" role="group" aria-label="Wallpaper resolution">
              {RESOLUTION_PRESETS.map((preset) => (
                <button
                  type="button"
                  className="resolution-option"
                  key={preset.value}
                  aria-pressed={resolution === preset.value}
                  disabled={pending}
                  onClick={() => update("resolution", preset.value)}
                >
                  <span>{preset.label}</span>
                  <small>
                    {preset.width
                      ? `${portrait ? preset.height : preset.width} × ${portrait ? preset.width : preset.height}`
                      : "Every size"}
                  </small>
                </button>
              ))}
            </div>
            <p className="resolution-help">
              Pixel dimensions are shown explicitly. Portrait dimensions rotate to fit your screen.
            </p>
          </fieldset>
          <div className="filter-fields">
            <label className="filter-field">
              Resolution matching
              <select
                value={params.get("match") === "exact" ? "exact" : "minimum"}
                disabled={pending || resolution === "any"}
                onChange={(event) =>
                  update("match", event.target.value === "minimum" ? "" : "exact")
                }
              >
                <option value="minimum">At least this resolution</option>
                <option value="exact">Exactly this resolution</option>
              </select>
            </label>
            <label className="filter-field">
              Category
              <select
                value={params.get("category") || "all"}
                disabled={pending}
                onChange={(event) => update("category", event.target.value)}
              >
                <option value="all">All categories</option>
                <option value="general">General</option>
                <option value="anime">Anime</option>
                <option value="people">People</option>
              </select>
            </label>
            {!mobile && (
              <label className="filter-field">
                Orientation
                <select
                  value={params.get("orientation") || "any"}
                  disabled={pending}
                  onChange={(event) => update("orientation", event.target.value)}
                >
                  <option value="any">All orientations</option>
                  <option value="landscape">Landscape · 16:9</option>
                  <option value="portrait">Portrait · 9:16</option>
                  <option value="ultrawide">Ultrawide · 21:9</option>
                  <option value="square">Square · 1:1</option>
                </select>
              </label>
            )}
            <label className="filter-field">
              Dominant color
              <select
                value={params.get("color") || ""}
                disabled={pending}
                onChange={(event) => update("color", event.target.value)}
              >
                <option value="">Any color</option>
                <option value="000000">Black</option>
                <option value="ffffff">White</option>
                <option value="424153">Charcoal</option>
                <option value="999999">Gray</option>
                <option value="0066cc">Blue</option>
                <option value="669900">Green</option>
                <option value="ff9900">Orange</option>
                <option value="cc3333">Red</option>
              </select>
            </label>
          </div>
          <button
            className="text-link"
            type="button"
            disabled={pending}
            onClick={() => {
              const next = new URLSearchParams();
              const q = scalar(params.get("q") || undefined);
              if (q) next.set("q", q);
              startTransition(() => router.push(`${pathname}?${next}`, { scroll: false }));
            }}
          >
            <X size={14} />
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
