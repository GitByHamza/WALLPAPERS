import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/ui/navbar";
export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="site-width py-20">
        <div className="empty-state">
          <h1>This view has moved on.</h1>
          <p>
            We could not find that page or wallpaper. There is plenty more to explore in the
            collection.
          </p>
          <Link className="primary-button" href="/">
            <ArrowLeft size={16} />
            Back to discovery
          </Link>
        </div>
      </main>
    </>
  );
}
