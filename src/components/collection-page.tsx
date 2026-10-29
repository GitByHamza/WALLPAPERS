import { Suspense } from "react";
import { cookies } from "next/headers";
import { Navbar } from "@/components/ui/navbar";
import { Gallery, GallerySkeleton } from "@/components/ui/gallery";
import { getCollectionOptions, scalar, type CollectionParams } from "@/lib/collection-options";
import { searchWallpapers, type WallpaperOptions, type WallpaperSort } from "@/lib/wallhaven";
async function CollectionResults({
  options,
  baseUrl,
  mobile,
}: {
  options: WallpaperOptions;
  baseUrl: string;
  mobile: boolean;
}) {
  const data = await searchWallpapers(options).catch(() => null);
  return (
    <Gallery
      data={data}
      baseUrl={baseUrl}
      defaultSort={options.sort}
      mobile={mobile}
      query={options.query}
    />
  );
}
export async function CollectionPage({
  params,
  title,
  description,
  baseUrl,
  defaultSort = "toplist",
  mobile = false,
}: {
  params: CollectionParams;
  title: string;
  description: string;
  baseUrl: string;
  defaultSort?: WallpaperSort;
  mobile?: boolean;
}) {
  const options = getCollectionOptions(params, defaultSort, mobile);
  options.purity = (await cookies()).get("settings_nsfw")?.value === "true" ? "111" : "100";
  const query = scalar(params.q).slice(0, 160);
  return (
    <>
      <Navbar />
      <main id="main-content" className="site-width">
        <div className="page-heading">
          <h1>{baseUrl === "/search" && query ? `A view of “${query}”.` : title}</h1>
          <p>{description}</p>
        </div>
        <section className="pb-18" aria-label="Wallpaper collection">
          <Suspense key={JSON.stringify(options)} fallback={<GallerySkeleton />}>
            <CollectionResults options={options} baseUrl={baseUrl} mobile={mobile} />
          </Suspense>
        </section>
      </main>
    </>
  );
}
