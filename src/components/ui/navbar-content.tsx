"use client";
import Link from "next/link";
import { Aperture, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SearchForm } from "./search-form";
import { NsfwToggle } from "./nsfw-toggle";
import { ThemeToggle } from "./theme-toggle";
const links = [
  { label: "Discover", href: "/" },
  { label: "Popular", href: "/popular" },
  { label: "New", href: "/new" },
  { label: "Mobile", href: "/mobile" },
];
export function NavbarContent({ isNsfw }: { isNsfw: boolean }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="site-width header-inner">
        <Link href="/" className="wordmark" aria-label="Lumina home">
          <Aperture aria-hidden="true" />
          lumina<span className="text-accent-ink">.</span>
        </Link>
        <nav className="nav-links" aria-label="Main navigation">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link"
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <div className="header-search">
            <SearchForm />
          </div>
          <NsfwToggle initialValue={isNsfw} />
          <ThemeToggle />
          <button
            className="mobile-menu-button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div id="mobile-navigation" className="mobile-menu site-width">
          <SearchForm />
          <nav aria-label="Mobile navigation">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <NsfwToggle initialValue={isNsfw} />
        </div>
      )}
    </header>
  );
}
