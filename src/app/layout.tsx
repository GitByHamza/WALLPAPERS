import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import { Footer } from "@/components/ui/footer";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
const grotesk = Space_Grotesk({ variable: "--font-grotesk", subsets: ["latin"], display: "swap" });
const mono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});
export const metadata: Metadata = {
  title: { default: "Lumina — A different point of view", template: "%s — Lumina" },
  description:
    "Discover high-resolution wallpapers for your desktop and phone. Explore by color, subject, and resolution, with original downloads from Wallhaven.",
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="darkreader-lock" content="true" />
      </head>
      <body className={`${grotesk.variable} ${mono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <a className="skip-link" href="#main-content">
            Skip to content
          </a>
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
