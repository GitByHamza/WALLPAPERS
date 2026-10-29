import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cookies } from "next/headers";
import { Navbar } from "@/components/ui/navbar";
import { Gallery } from "@/components/ui/gallery";
import { WallpaperImage } from "@/components/ui/wallpaper-image";
import { getCollectionOptions, type CollectionParams } from "@/lib/collection-options";
import { searchWallpapers, type WallhavenImage } from "@/lib/wallhaven";
import { formatResolution } from "@/lib/format";
function FeaturedImage({
  image,
  title,
  large = false,
}: {
  image: WallhavenImage;
  title: string;
  large?: boolean;
}) {
  return (
    <Link
      href={`/wallpaper/${image.id}`}
      className="featured-image"
      aria-label={`Explore ${image.category} wallpaper, ${formatResolution(image.resolution)}`}
    >
      <WallpaperImage
        image={image}
        full
        priority={large}
        sizes={large ? "(max-width: 640px) 95vw, 62vw" : "(max-width: 640px) 45vw, 32vw"}
      />
      <div className="featured-caption">
        <div>
          <strong>{title}</strong>
          <span className="block mt-2">
            {formatResolution(image.resolution)} · {image.category}
          </span>
        </div>
        <ArrowUpRight aria-hidden="true" />
      </div>
    </Link>
  );
}
export default async function Home({ searchParams }: { searchParams: Promise<CollectionParams> }) {
  const params = await searchParams;
  const options = getCollectionOptions(params);
  options.purity = (await cookies()).get("settings_nsfw")?.value === "true" ? "111" : "100";
  const data = await searchWallpapers(options).catch(() => null);
  const featured =
    data?.data.filter((image) => image.dimension_x >= image.dimension_y).slice(0, 3) || [];
  return (
    <>
      <Navbar />
      <main id="main-content" className="site-width">
        <section className="home-intro">
          <h1>
            A different<span>point of view.</span>
          </h1>
          <div className="intro-aside">
            <p>
              A little inspiration for the screen you see every day. Discover wallpapers in their
              original, full-resolution detail.
            </p>
            <a href="#collection" className="text-link">
              Find your next wallpaper <ArrowDownRight size={17} />
            </a>
          </div>
        </section>
        {featured.length >= 3 && (
          <section aria-label="Featured wallpapers">
            <div className="featured-grid">
              <FeaturedImage image={featured[0]} title="A view worth keeping." large />
              <div className="featured-side">
                <FeaturedImage image={featured[1]} title="Something unexpected." />
                <FeaturedImage image={featured[2]} title="Make it your own." />
              </div>
            </div>
            <div className="feature-note">
              <span>From the Wallhaven community.</span>
              <span>Original files. Every detail.</span>
            </div>
          </section>
        )}
        <section id="collection" className="gallery-section">
          <div className="section-heading">
            <h2>Find your next view.</h2>
            <p>For your desktop. For your phone.</p>
          </div>
          <Gallery
            data={data}
            baseUrl="/"
            defaultSort={options.sort}
            query={options.query}
            priority={!featured.length}
          />
        </section>
      </main>
    </>
  );
}
