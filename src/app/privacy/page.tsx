import type { Metadata } from "next";
import { Navbar } from "@/components/ui/navbar";
export const metadata: Metadata = { title: "Privacy" };
export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="site-width">
        <article className="reading-page">
          <h1>Privacy, plainly.</h1>
          <p className="lead">
            How Lumina uses your preferences and connects to wallpaper sources.
          </p>
          <p className="collection-count mt-5">Updated October 19, 2026</p>
          <section>
            <h2>Browsing and accounts</h2>
            <p>
              You do not need an account to browse or download wallpapers. This application does not
              include user profiles, a first-party analytics tracker, or a database of your
              searches.
            </p>
          </section>
          <section>
            <h2>Your preferences</h2>
            <p>
              Your light or dark appearance is saved in browser local storage. A cookie named
              settings_nsfw remembers whether you have enabled mature content. This preference
              cookie lasts for up to one year and can be removed through your browser settings.
            </p>
          </section>
          <section>
            <h2>Wallpapers and third parties</h2>
            <p>
              Wallpapers and metadata are provided by Wallhaven. Search requests are processed
              through the Lumina server. Image previews may contact the Wallhaven image servers
              directly, and original downloads pass through the Lumina download endpoint.
            </p>
            <p>
              Hosting services and image providers may process request information under their own
              policies. Visit{" "}
              <a href="https://wallhaven.cc" target="_blank" rel="noopener noreferrer">
                Wallhaven
              </a>{" "}
              for information about the source service.
            </p>
          </section>
          <section>
            <h2>Image ownership</h2>
            <p>
              Images remain the property of their respective creators. Availability through Lumina
              does not grant a particular usage license. Follow the wallpaper source for rights and
              attribution information.
            </p>
          </section>
        </article>
      </main>
    </>
  );
}
