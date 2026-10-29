export type WallpaperSort =
  "date_added" | "relevance" | "random" | "views" | "favorites" | "toplist";
export type WallhavenImage = {
  id: string;
  url: string;
  short_url: string;
  views: number;
  favorites: number;
  source: string;
  purity: string;
  category: string;
  dimension_x: number;
  dimension_y: number;
  resolution: string;
  ratio: string;
  file_size: number;
  file_type: string;
  created_at: string;
  colors: string[];
  path: string;
  thumbs: { large: string; original: string; small: string };
  tags?: { id: number; name: string }[];
  uploader?: { username: string };
};
export type WallhavenResponse = {
  data: WallhavenImage[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    query?: string | { id: number; tag: string } | null;
    seed?: string | null;
  };
};
export type WallpaperOptions = {
  query?: string;
  page?: number;
  sort?: WallpaperSort;
  purity?: string;
  categories?: string;
  atleast?: string;
  resolutions?: string;
  ratios?: string;
  colors?: string;
  seed?: string;
};
const BASE_URL = "https://wallhaven.cc/api/v1";
const pendingSearches = new Map<string, Promise<WallhavenResponse>>();
function buildUrl(endpoint: string, params: Record<string, string | number | undefined>) {
  const url = new URL(`${BASE_URL}${endpoint}`);
  const key = process.env.WALLHAVEN_API_KEY || process.env.NEXT_PUBLIC_WALLHAVEN_API_KEY;
  if (key) url.searchParams.set("apikey", key);
  for (const [name, value] of Object.entries(params))
    if (value !== undefined && value !== "") url.searchParams.set(name, String(value));
  return url;
}
export class WallpaperNotFoundError extends Error {}
export async function searchWallpapers(options: WallpaperOptions = {}): Promise<WallhavenResponse> {
  const url = buildUrl("/search", {
    q: options.query,
    page: options.page || 1,
    sorting: options.sort || "toplist",
    purity: options.purity || "100",
    categories: options.categories,
    atleast: options.atleast,
    resolutions: options.resolutions,
    ratios: options.ratios,
    colors: options.colors,
    seed: options.sort === "random" ? options.seed : undefined,
  });
  const key = url.href;
  const existing = pendingSearches.get(key);
  if (existing) return existing;
  const request = fetch(url, {
    next: { revalidate: options.sort === "date_added" ? 300 : 3600 },
    signal: AbortSignal.timeout(15000),
  })
    .then(async (response) => {
      if (!response.ok) throw new Error(`Wallpaper service returned ${response.status}`);
      const json: WallhavenResponse = await response.json();
      if (!Array.isArray(json.data) || !json.meta)
        throw new Error("Wallpaper service returned an invalid response");
      return json;
    })
    .finally(() => pendingSearches.delete(key));
  pendingSearches.set(key, request);
  return request;
}

export function getNextWallpaperOptions(
  options: WallpaperOptions,
  meta: WallhavenResponse["meta"],
): WallpaperOptions | null {
  if (meta.current_page >= meta.last_page) return null;
  const seed = options.sort === "random" ? meta.seed || options.seed : undefined;
  if (options.sort === "random" && !seed) return null;
  return { ...options, page: meta.current_page + 1, seed };
}
export async function getWallpaper(id: string): Promise<WallhavenImage> {
  if (!/^[a-z0-9]{6}$/.test(id)) throw new WallpaperNotFoundError("Wallpaper not found");
  const response = await fetch(buildUrl(`/w/${id}`, {}), {
    next: { revalidate: 86400 },
    signal: AbortSignal.timeout(15000),
  });
  if (response.status === 404) throw new WallpaperNotFoundError("Wallpaper not found");
  if (!response.ok) throw new Error(`Wallpaper service returned ${response.status}`);
  const json: { data: WallhavenImage } = await response.json();
  return json.data;
}
