import Link from "next/link";
import { Aperture, ArrowUpRight } from "lucide-react";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-width">
        <div className="footer-top">
          <div>
            <Link href="/" className="wordmark" aria-label="Lumina home">
              <Aperture aria-hidden="true" />
              lumina<span className="text-accent-ink">.</span>
            </Link>
            <p>
              A little change of scenery.
              <br />
              High-resolution wallpapers for your everyday.
            </p>
          </div>
          <nav className="footer-nav" aria-label="Footer navigation">
            <Link href="/about">About Lumina</Link>
            <Link href="/privacy">Privacy</Link>
            <a
              href="https://github.com/GitByHamza/WALLPAPERS"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub <ArrowUpRight size={13} />
            </a>
            <a href="https://wallhaven.cc" target="_blank" rel="noopener noreferrer">
              Wallhaven <ArrowUpRight size={13} />
            </a>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Lumina Walls</span>
          <span>Images belong to their respective creators. Powered by Wallhaven.</span>
        </div>
      </div>
    </footer>
  );
}
