import { GallerySkeleton } from "@/components/ui/gallery";
export default function Loading() {
  return (
    <main id="main-content" className="site-width">
      <div className="page-heading">
        <h1>A new view is on its way.</h1>
        <p>Loading the collection.</p>
      </div>
      <GallerySkeleton />
    </main>
  );
}
