import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { cookies } from "next/headers";
import { Navbar } from "@/components/ui/navbar";
import { WallpaperCard } from "@/components/ui/wallpaper-card";
import { WallpaperViewer } from "@/components/ui/wallpaper-viewer";
import { DownloadButton, ShareButton, ColorPalette } from "@/components/ui/wallpaper-actions";
import { EmptyState } from "@/components/ui/empty-state";
import {
  getWallpaper,
  searchWallpapers,
  WallpaperNotFoundError,
  type WallhavenImage,
} from "@/lib/wallhaven";
import { formatBytes, formatResolution, wallpaperTitle } from "@/lib/format";
import { displayAspectRatio, resolutionTier } from "@/lib/resolutions";
export const metadata: Metadata = { title: "Wallpaper details" };
export default async function WallpaperPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let image: WallhavenImage;
  try {
    image = await getWallpaper(id);
  } catch (error) {
    if (error instanceof WallpaperNotFoundError) notFound();
    return (
      <>
        <Navbar />
        <main id="main-content" className="site-width py-16">
          <EmptyState error />
        </main>
      </>
    );
  }
  const date = new Date(image.created_at.slice(0, 10));
  const published = Number.isNaN(date.getTime())
    ? "Date unavailable"
    : new Intl.DateTimeFormat("en", { dateStyle: "long", timeZone: "UTC" }).format(date);
  const title = wallpaperTitle(image.tags, image.category);
  const tier = resolutionTier(image.dimension_x, image.dimension_y);
  const facts = [
    ["Dimensions", formatResolution(image.resolution)],
    ["Aspect ratio", displayAspectRatio(image.dimension_x, image.dimension_y)],
    ["File size", formatBytes(image.file_size)],
    ["Format", image.file_type.split("/")[1]?.toUpperCase() || "Image"],
    ["Views", image.views.toLocaleString("en")],
    ["Favorites", image.favorites.toLocaleString("en")],
  ];
  const tags = image.tags || [];
  return (
    <>
      <Navbar />
      <main id="main-content" className="site-width wallpaper-page">
        <nav className="detail-topline" aria-label="Wallpaper navigation">
          <Link href="/" className="text-link">
            <ArrowLeft size={15} />
            Back to discovery
          </Link>
          <a
            href={image.url}
            className="text-link wallpaper-source"
            target="_blank"
            rel="noopener noreferrer"
          >
            View source <ArrowUpRight size={14} />
          </a>
        </nav>
        <header className="wallpaper-heading">
          <div className="wallpaper-heading-copy">
            <h1>
              {title}
              <span className="quality-label">{tier}</span>
            </h1>
            <p>
              {image.category.charAt(0).toUpperCase() + image.category.slice(1)}
              <span aria-hidden="true"> · </span>Added {published}
              {image.uploader ? ` · by ${image.uploader.username}` : ""}
            </p>
          </div>
          <div className="wallpaper-heading-actions">
            <ShareButton />
            <DownloadButton url={image.path} />
          </div>
        </header>
        <WallpaperViewer image={image} />
        <dl className="wallpaper-specs">
          {facts.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <section id="original-file" className="original-file">
          <div>
            <h2>Every pixel. The original.</h2>
            <p>
              {formatResolution(image.resolution)} · {image.file_type.split("/")[1]?.toUpperCase()}{" "}
              · {formatBytes(image.file_size)}
              <span>Original file from Wallhaven.</span>
            </p>
          </div>
          <div className="original-file-actions">
            <DownloadButton url={image.path} />
            <a href={image.path} className="text-link" target="_blank" rel="noopener noreferrer">
              Open image <ArrowUpRight size={14} />
            </a>
          </div>
        </section>
        <div className="wallpaper-context">
          <section className="wallpaper-colors">
            <div className="context-heading">
              <h2>A palette to borrow.</h2>
              <p>Colors from this wallpaper. Select one to copy.</p>
            </div>
            <ColorPalette colors={image.colors} />
          </section>
          <section className="wallpaper-subjects">
            <div className="context-heading">
              <h2>Follow the details.</h2>
              <p>Explore more through the subjects in this image.</p>
            </div>
            <div className="tag-list">
              {tags.slice(0, 8).map((tag) => (
                <Link key={tag.id} href={`/search?q=${encodeURIComponent(tag.name)}`}>
                  {tag.name}
                </Link>
              ))}
            </div>
            {tags.length > 8 && (
              <details className="more-subjects">
                <summary>Show {tags.length - 8} more subjects</summary>
                <div className="tag-list">
                  {tags.slice(8).map((tag) => (
                    <Link key={tag.id} href={`/search?q=${encodeURIComponent(tag.name)}`}>
                      {tag.name}
                    </Link>
                  ))}
                </div>
              </details>
            )}
            {!tags.length && (
              <p className="detail-empty-tags">No subjects have been added to this wallpaper.</p>
            )}
          </section>
        </div>
        <div className="wallpaper-attribution">
          <span>
            Wallpaper {image.id.toUpperCase()} · Images belong to their respective creators.
          </span>
          <a href={image.url} target="_blank" rel="noopener noreferrer">
            Credits & original source <ArrowUpRight size={13} />
          </a>
        </div>
        <Suspense>
          <RelatedWallpapers id={image.id} />
        </Suspense>
      </main>
    </>
  );
}
async function RelatedWallpapers({ id }: { id: string }) {
  const purity = (await cookies()).get("settings_nsfw")?.value === "true" ? "111" : "100";
  const data = await searchWallpapers({
    query: `like:${id}`,
    sort: "relevance",
    purity,
    atleast: "1920x1080",
  }).catch(() => null);
  const images = data?.data.filter((image) => image.id !== id).slice(0, 6) || [];
  if (!images.length) return null;
  return (
    <section className="gallery-section">
      <div className="section-heading">
        <h2>A similar point of view.</h2>
        <Link className="text-link" href={`/search?q=${encodeURIComponent(`like:${id}`)}`}>
          Explore more <ArrowUpRight size={15} />
        </Link>
      </div>
      <div className="gallery-grid">
        {images.map((image) => (
          <WallpaperCard key={image.id} image={image} />
        ))}
      </div>
    </section>
  );
}
