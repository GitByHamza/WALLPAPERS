import type { Metadata } from "next";
import { CollectionPage } from "@/components/collection-page";
import type { CollectionParams } from "@/lib/collection-options";
export const metadata: Metadata = { title: "Mobile wallpapers" };
export default async function MobilePage({
  searchParams,
}: {
  searchParams: Promise<CollectionParams>;
}) {
  return (
    <CollectionPage
      params={await searchParams}
      title="A change of screenery."
      description="Portrait wallpapers for the screen that goes everywhere with you. Explore original images in a 9:16 format."
      baseUrl="/mobile"
      mobile
    />
  );
}
