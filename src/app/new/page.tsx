import type { Metadata } from "next";
import { CollectionPage } from "@/components/collection-page";
import type { CollectionParams } from "@/lib/collection-options";
export const metadata: Metadata = { title: "New wallpapers" };
export default async function NewPage({
  searchParams,
}: {
  searchParams: Promise<CollectionParams>;
}) {
  return (
    <CollectionPage
      params={await searchParams}
      title="A fresh perspective."
      description="Recent additions from the Wallhaven community. Find something you have not seen before."
      baseUrl="/new"
      defaultSort="date_added"
    />
  );
}
