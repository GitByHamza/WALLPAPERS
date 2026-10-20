export const MAX_DOWNLOAD_BYTES = 100 * 1024 * 1024;
export function validateDownloadUrl(value: string | null) {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (
      url.protocol !== "https:" ||
      url.hostname !== "w.wallhaven.cc" ||
      url.port ||
      url.username ||
      url.password ||
      url.search ||
      url.hash
    )
      return null;
    const match = /^\/full\/([a-z0-9]{2})\/wallhaven-([a-z0-9]{6})\.(jpg|jpeg|png|webp)$/.exec(
      url.pathname,
    );
    if (!match || match[1] !== match[2].slice(0, 2)) return null;
    return { url: url.href, filename: `lumina-${match[2]}.${match[3]}` };
  } catch {
    return null;
  }
}
