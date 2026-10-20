import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/ui/navbar";
export const metadata: Metadata = { title: "About" };
export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="site-width">
        <article className="reading-page">
          <h1>
            A little change
            <br />
            of scenery.
          </h1>
          <p className="lead">
            Your screen is part of your everyday. Lumina makes it easier to find something you enjoy
            looking at.
          </p>
          <section>
            <h2>Made for the way you browse.</h2>
            <p>
              Follow a subject, find a favorite color, or explore something new. Lumina brings
              wallpapers from the Wallhaven community into a straightforward gallery, with details
              that help you choose the right image for your screen.
            </p>
            <p>
              Explore landscape images for your desktop and portrait wallpapers for your phone.
              Check dimensions and file sizes, then download the original image.
            </p>
          </section>
          <section>
            <h2>From a community of image makers.</h2>
            <p>
              Wallpapers and their metadata come from Wallhaven. Images belong to their respective
              creators. Each wallpaper links back to its Wallhaven page so you can explore its tags,
              uploader, and original source information.
            </p>
            <p>Please check the original source for usage rights and attribution.</p>
          </section>
          <section>
            <h2>A comfortable place to explore.</h2>
            <p>
              Choose a light or dark appearance. Search and filter without creating an account.
              Safe-for-work content is the default; your content and appearance preferences stay
              with your browser.
            </p>
          </section>
          <Link href="/" className="primary-button">
            Find your next view <ArrowUpRight size={16} />
          </Link>
        </article>
      </main>
    </>
  );
}
