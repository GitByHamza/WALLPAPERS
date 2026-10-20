import type { WallpaperOptions, WallpaperSort } from "./wallhaven";
import { RESOLUTION_PRESETS, resolutionDimensions } from "./resolutions.ts";
export type CollectionParams = Record<string, string | string[] | undefined>;
export const SORT_OPTIONS: { value: WallpaperSort; label: string }[] = [
  { value: "toplist", label: "Trending" },
  { value: "date_added", label: "Newest first" },
  { value: "relevance", label: "Relevance" },
  { value: "views", label: "Most viewed" },
  { value: "favorites", label: "Most favorited" },
  { value: "random", label: "Random" },
];
const CATEGORIES: Record<string, string> = {
  all: "111",
  general: "100",
  anime: "010",
  people: "001",
};
const RATIOS: Record<string, string | undefined> = {
  any: undefined,
  landscape: "16x9",
  portrait: "9x16",
  ultrawide: "21x9",
  square: "1x1",
};
export const FILTER_COLORS = [
  "000000",
  "ffffff",
  "424153",
  "999999",
  "0066cc",
  "669900",
  "ff9900",
  "cc3333",
];
export function scalar(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] || "" : value || "";
}
export function getCollectionOptions(
  params: CollectionParams,
  defaultSort: WallpaperSort = "toplist",
  mobile = false,
): WallpaperOptions {
  const rawPage = Number(scalar(params.page));
  const page = Number.isSafeInteger(rawPage) && rawPage > 0 ? Math.min(rawPage, 100000) : 1;
  const sort =
    SORT_OPTIONS.find((option) => option.value === scalar(params.sort))?.value || defaultSort;
  const requestedResolution = scalar(params.resolution);
  const orientation = mobile ? "portrait" : scalar(params.orientation);
  const portrait = orientation === "portrait";
  const resolution = RESOLUTION_PRESETS.some((preset) => preset.value === requestedResolution)
    ? requestedResolution
    : portrait
      ? "hd"
      : "4k";
  const dimensions = resolutionDimensions(resolution, portrait);
  const exact = scalar(params.match) === "exact";
  return {
    query: scalar(params.q).slice(0, 160),
    page,
    sort,
    categories: CATEGORIES[scalar(params.category)] || "111",
    atleast: exact ? undefined : dimensions,
    resolutions: exact ? dimensions : undefined,
    ratios: RATIOS[orientation],
    colors: FILTER_COLORS.includes(scalar(params.color)) ? scalar(params.color) : undefined,
    seed: /^[a-zA-Z0-9]{6}$/.test(scalar(params.seed)) ? scalar(params.seed) : undefined,
  };
}
