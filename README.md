# Lumina Walls

A wallpaper gallery built with Next.js 16, React 19, Tailwind CSS 4, and the Wallhaven API.

The interface pairs Space Grotesk with Space Mono. Both the ink dark theme and warm paper light theme share the same layout, accessible controls, and restrained lime accents.

## Run locally

1. Install dependencies with `npm ci`.
2. Optionally create `.env.local` with `WALLHAVEN_API_KEY=your_wallhaven_key`. Safe-for-work browsing works without a key. Mature content requires a valid Wallhaven key. The older `NEXT_PUBLIC_WALLHAVEN_API_KEY` name is supported for existing deployments; use the server-only name for new setups.
3. Run `npm run dev` and open http://localhost:3000.

The server needs access to wallhaven.cc, w.wallhaven.cc, and th.wallhaven.cc. The first build downloads Space Grotesk and Space Mono through next/font/google.

## Browsing

Discover, Popular, New, Mobile, and Search use a shared gallery. Sort, category, resolution, orientation, and color filters live in the URL and persist across pagination. Random searches preserve their seed across pages. Mobile results use portrait resolution thresholds.

After a gallery loads, the server warms the next page's data in the background. Concurrent requests for the same search share one upstream request. Next/Previous links also prefetch the full route in production; numbered links fetch on navigation to avoid loading several pages speculatively. An uncached search can still wait on Wallhaven.

Cards show actual Wallhaven views, favorites, resolutions, and colors. Collection insights summarize the wallpapers on the currently loaded page, not the full catalog or historical activity. Original downloads are restricted to canonical Wallhaven image URLs, streamed with time and size limits.

Theme preferences are stored locally; the content preference uses a cookie. No account or analytics database is included.

## Validation

- `npm run lint`
- `npx tsc --noEmit --incremental false`
- `npm test` (Node.js 22.18 or newer for native TypeScript support)
- `npm run build`

Behavior tests cover filter normalization, portrait thresholds, random seeds, and download destination restrictions. Browser verification covers both themes and responsive layouts. See DESIGN.md for the visual system.

## Resolution and viewer updates

The Mobile tab shows complete portrait images at their native aspect ratio, using Wallhaven's lightweight uncropped thumbnails. A failed thumbnail is retried once before falling back to the original image. Standard cards retain cropped thumbnails with smaller-image and retry fallbacks. Full-size previews fall back from the image optimizer to a direct original, then to an uncropped thumbnail. Other galleries keep uniform landscape cards and the homepage retains its original featured layout. The detail viewer follows the original proportions, including a tall portrait layout. It supports image, desktop, and phone previews, a full-screen viewing action, labeled palette copying, and original-file downloads. Device previews crop the image; they do not resize the downloaded original.

Resolution presets include HD, FHD, 2K DCI (2048×1080), QHD (2560×1440), 4K UHD, 5K, 6K, 8K, 12K, and 16K. Select minimum or exact matching. Availability depends on the Wallhaven collection.

The document includes Dark Reader’s static opt-out meta tag because Lumina provides its own light and dark themes. This prevents supported Dark Reader versions from recoloring the page and adding SVG attributes before hydration.
