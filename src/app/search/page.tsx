import type { Metadata } from "next";
import { CollectionPage } from "@/components/collection-page";
import type { CollectionParams } from "@/lib/collection-options";
export const metadata: Metadata = { title: "Explore wallpapers" };
export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<CollectionParams>;
}) {
  return (
    <CollectionPage
      params={await searchParams}
      title="Find your next view."
      description="Follow a color, a place, or a feeling. Narrow down the collection to something that feels like you."
      baseUrl="/search"
      defaultSort="relevance"
    />
  );
}
