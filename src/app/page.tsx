import { BackgroundBlobs } from "@/components/ui/background-blobs";
import { Navbar } from "@/components/ui/navbar";
import { Pagination } from "@/components/ui/pagination";
import { WallpaperCard } from "@/components/ui/wallpaper-card";
import { searchWallpapers } from "@/lib/wallhaven";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { cookies } from "next/headers";

export default async function Home({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
 const { page } = await searchParams;
 const currentPage = Number(page) || 1;
 const cookieStore = await cookies();
 const isNsfw = cookieStore.get("settings_nsfw")?.value === "true";
 const purity = isNsfw ? "111" : "100";

 const data = await searchWallpapers("", currentPage, "toplist", purity, 24).catch(() => null);

 return (
  <main className="min-h-screen relative overflow-hidden bg-background">
   <BackgroundBlobs />
   <Navbar />

   {/* Hero Section */}
   <section className="relative pt-60 pb-40 px-6 md:px-12 noise">
    <div className="container mx-auto text-center max-w-5xl">
     <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 backdrop-blur-md text-sm font-bold text-accent mb-10 animate-fade-in-up">
      <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
      ✨ 100,000+ Premium 4K Wallpapers
     </div>
     <h1 className="text-6xl md:text-9xl font-black font-heading mb-10 tracking-tighter text-foreground animate-fade-in-up delay-100 leading-[0.9]">
      Next-Gen <br /> 
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-blue-400 text-glow">
       Visual Setup.
      </span>
     </h1>
     <p className="text-xl md:text-2xl text-muted-foreground mb-16 max-w-3xl mx-auto animate-fade-in-up delay-200 leading-relaxed font-medium">
      Curated 4K & 8K wallpapers for professionals. <br className="hidden md:block" />
      Direct from Wallhaven, optimized for your high-res display.
     </p>

     <div className="flex flex-wrap items-center justify-center gap-6 animate-fade-in-up delay-300">
      <Link
       href="/popular"
       className="px-10 py-5 rounded-2xl bg-foreground text-background font-black hover:scale-105 active:scale-95 transition-all shadow-[0_20px_40px_rgba(var(--accent),0.2)] flex items-center gap-2"
      >
       Explore Trending <ArrowRight size={20} />
      </Link>
      <Link
       href="/search?q=minimalist"
       className="px-10 py-5 rounded-2xl glass-card text-foreground font-black hover:bg-accent/10 hover:border-accent/30 hover:scale-105 active:scale-95 transition-all"
      >
       Minimalist
      </Link>
     </div>
    </div>
   </section>

   {/* Gallery Section */}
   <section className="container mx-auto px-6 md:px-12 pb-32 relative z-10 pt-10 border-t border-border/50">
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
     <div>
      <h2 className="text-4xl font-black text-foreground tracking-tight">Trending <span className="text-accent">4K.</span></h2>
      <p className="text-muted-foreground text-lg mt-2 font-medium">Handpicked wallpapers for your high-res display.</p>
     </div>
     <Link href="/popular" className="px-6 py-3 rounded-2xl glass-card text-sm font-bold text-muted-foreground hover:text-foreground hover:border-accent/30 flex items-center gap-2 transition-all w-fit">
      View All Collection <ArrowRight size={18} />
     </Link>
    </div>

    {data && data.data ? (
     <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
       {data.data.map((image, index) => (
        <WallpaperCard key={image.id} image={image} priority={index < 4} />
       ))}
      </div>

      <div className="mt-20">
       <Pagination
        currentPage={data.meta.current_page}
        totalPages={data.meta.last_page}
        baseUrl="/"
       />
      </div>
     </>
    ) : (
     <div className="flex flex-col items-center justify-center py-32 text-center glass-card rounded-[3rem] noise">
      <p className="text-foreground/50 mb-4 font-black text-xl">Unable to sync grid.</p>
      <p className="text-sm text-muted-foreground font-mono bg-background/50 p-3 rounded-2xl border border-border">
       Check Wallhaven API status.
      </p>
     </div>
    )}
   </section>
  </main>
 );
}
