export function compactNumber(value: number) {
  return new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(
    value,
  );
}
export function formatBytes(bytes: number) {
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}
export function formatResolution(resolution: string) {
  return resolution.replace("x", " × ");
}

export function wallpaperTitle(tags: readonly { name: string }[] | undefined, category: string) {
  const broad = new Set([
    "car",
    "cars",
    "vehicle",
    "vehicles",
    "nature",
    "landscape",
    "photography",
    "wallpaper",
    "anime",
    "people",
    "digital art",
    "screen shot",
    "cgi",
    "video game art",
  ]);
  const names = tags?.map((tag) => tag.name).filter((name) => !broad.has(name.toLowerCase())) || [];
  const base = names[0];
  if (!base) return `${category.charAt(0).toUpperCase() + category.slice(1)} wallpaper`;
  return names.find((name) => name.toLowerCase().startsWith(`${base.toLowerCase()} `)) || base;
}
