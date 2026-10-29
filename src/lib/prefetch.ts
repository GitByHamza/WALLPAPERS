import { after } from "next/server";
import {
  getNextWallpaperOptions,
  searchWallpapers,
  type WallpaperOptions,
  type WallhavenResponse,
} from "./wallhaven";

export function prefetchNextWallpapers(
  options: WallpaperOptions,
  data: WallhavenResponse | null,
) {
  if (!data) return;
  const next = getNextWallpaperOptions(options, data.meta);
  if (!next) return;
  // Warm one page after this response, without delaying the current gallery.
  after(async () => {
    await searchWallpapers(next).catch(() => null);
  });
}
