export type WallhavenImage = {
 id: string;
 url: string;
 short_url: string;
 views: number;
 favorites: number;
 source: string;
 purity: string; // "sfw" | "sketchy" | "nsfw"
 category: string; // "general" | "anime" | "people"
 dimension_x: number;
 dimension_y: number;
 resolution: string;
 ratio: string;
 file_size: number;
 file_type: string; // "image/jpeg" | "image/png"
 created_at: string;
 colors: string[];
 path: string;
 thumbs: {
  large: string;
  original: string;
  small: string;
 };
 tags: {
  id: number;
  name: string;
  alias: string;
  category_id: number;
  category: string;
  purity: string;
  created_at: string;
 }[];
};

export type WallhavenResponse = {
 data: WallhavenImage[];
 meta: {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  query?: string | null;
  seed?: string | null;
 };
};

export type WallhavenSingleResponse = {
 data: WallhavenImage;
};

const BASE_URL = "https://wallhaven.cc/api/v1";
const API_KEY = process.env.NEXT_PUBLIC_WALLHAVEN_API_KEY;

/**
 * Helper to build query string, appending API key if exists.
 */
function buildUrl(endpoint: string, params: Record<string, string | number | undefined>) {
 const url = new URL(`${BASE_URL}${endpoint}`);

 // Default to 4K+ (atleast) if not specified
 if (!params.resolutions && !params.atleast) {
  url.searchParams.append("atleast", "3840x2160");
 }

 if (API_KEY) {
  url.searchParams.append("apikey", API_KEY);
 }

 Object.entries(params).forEach(([key, value]) => {
  if (value !== undefined) {
   url.searchParams.append(key, String(value));
  }
 });

 return url.toString();
}

export async function searchWallpapers(
 query: string = "",
 page: number = 1,
 sorting: "date_added" | "relevance" | "random" | "views" | "favorites" | "toplist" = "relevance",
 purity?: string,
 per_page: number = 24
): Promise<WallhavenResponse> {
 const url = buildUrl("/search", {
  q: query,
  page,
  sorting,
  purity: purity || (API_KEY ? "111" : "100"), // Default to ALL if key exists, else SFW
 });

 console.log(`Fetching Wallhaven: ${url}`);

 let attempts = 0;
 const maxAttempts = 3;

 while (attempts < maxAttempts) {
  try {
   attempts++;
   const res = await fetch(url, {
    next: { revalidate: 3600 },
   });

   if (!res.ok) {
    if (attempts === maxAttempts) throw new Error(`Failed to fetch wallpapers: ${res.statusText}`);
    continue;
   }

   const json = await res.json();

   // If we got no data but expected some (and not on page 1 of a weird query), retry
   if ((!json.data || json.data.length === 0) && page === 1 && attempts < maxAttempts) {
    console.log(`Retry ${attempts}/${maxAttempts}: Empty data returned.`);
    await new Promise(r => setTimeout(r, 1000)); // Wait 1s
    continue;
   }

   console.log(`Wallhaven returned ${json.data?.length} items for page ${page}`);
   return json;
  } catch (e) {
   if (attempts === maxAttempts) throw e;
   await new Promise(r => setTimeout(r, 1000));
  }
 }

 throw new Error("Max retries exceeded");
}

export async function getWallpaper(id: string): Promise<WallhavenImage> {
 const url = buildUrl(`/w/${id}`, {});

 const res = await fetch(url, {
  next: { revalidate: 86400 },
 });

 if (!res.ok) {
  throw new Error(`Failed to fetch wallpaper ${id}: ${res.statusText}`);
 }

 const json = await res.json();
 return json.data;
}
