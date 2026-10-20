import type { Metadata } from "next";
import { CollectionPage } from "@/components/collection-page";
import type { CollectionParams } from "@/lib/collection-options";
export const metadata: Metadata = { title: "Popular wallpapers" };
export default async function PopularPage({
  searchParams,
}: {
  searchParams: Promise<CollectionParams>;
}) {
  return (
    <CollectionPage
      params={await searchParams}
      title="Worth a second look."
      description="The images people keep coming back to. Explore the most-viewed wallpapers on Wallhaven."
      baseUrl="/popular"
      defaultSort="views"
    />
  );
}
