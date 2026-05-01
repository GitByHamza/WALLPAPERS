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

import { Footer } from "@/components/ui/footer";
import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
  <html lang="en" suppressHydrationWarning>
   <body
    className={`${inter.variable} ${outfit.variable} antialiased bg-background text-foreground selection:bg-accent/30 selection:text-white transition-colors duration-300`}
   >
    <ThemeProvider
     attribute="class"
     defaultTheme="dark"
     enableSystem
     disableTransitionOnChange
    >
     {children}
     <Footer />
    </ThemeProvider>
   </body>
  </html>
 );
}
