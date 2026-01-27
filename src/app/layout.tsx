import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
 variable: "--font-inter",
 subsets: ["latin"],
});

const outfit = Outfit({
 variable: "--font-outfit",
 subsets: ["latin"],
 weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
 title: "Lumina Walls | 4K High-Res Wallpapers",
 description: "Premium collection of 4K wallpapers with glassmorphic design.",
};

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
  <html lang="en" className="dark">
   <body
    className={`${inter.variable} ${outfit.variable} antialiased bg-background text-foreground selection:bg-white/20 selection:text-white`}
   >
    {children}
   </body>
  </html>
 );
}
