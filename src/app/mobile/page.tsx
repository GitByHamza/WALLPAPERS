import { BackgroundBlobs } from "@/components/ui/background-blobs";
import { Navbar } from "@/components/ui/navbar";
import { Pagination } from "@/components/ui/pagination";
import { WallpaperCard } from "@/components/ui/wallpaper-card";
import { searchWallpapers } from "@/lib/wallhaven";
import { Smartphone, Sparkles } from "lucide-react";
import { cookies } from "next/headers";

export default async function MobilePage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
 const { page } = await searchParams;
 const currentPage = Number(page) || 1;
 const cookieStore = await cookies();
 const isNsfw = cookieStore.get("settings_nsfw")?.value === "true";
 const purity = isNsfw ? "111" : "100";

 // Fetch wallpapers with vertical ratios
 const data = await searchWallpapers("", currentPage, "toplist", purity, 24, "9x16,10x16").catch(() => null);

 return (
  <main className="min-h-screen relative overflow-hidden bg-background">
   <BackgroundBlobs />
   <Navbar />

   <section className="container mx-auto px-6 md:px-12 pt-60 pb-32">
    <div className="max-w-4xl mb-20 animate-fade-in-up">
     <div className="flex items-center gap-3 mb-6">
      <div className="p-4 rounded-3xl bg-accent/10 border border-accent/20 text-accent shadow-2xl">
       <Smartphone className="w-8 h-8" />
      </div>
      <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/5 border border-accent/10 text-[10px] font-black uppercase tracking-[0.2em] text-accent">
       <Sparkles size={12} /> 9:16 Optimized
      </div>
     </div>
     <h1 className="text-5xl md:text-8xl font-black text-foreground tracking-tighter mb-6 leading-[0.9]">
      Mobile <span className="text-accent text-glow">Editions.</span>
     </h1>
     <p className="text-muted-foreground text-xl max-w-2xl font-medium leading-relaxed">
      Perfectly cropped for your iOS or Android setup. High-density vertical 4K renders for the sharpest displays.
     </p>
    </div>

    {data && data.data ? (
     <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
       {data.data.map((image, index) => (
        <WallpaperCard key={image.id} image={image} priority={index < 4} aspectRatio="aspect-[9/16]" />
       ))}
      </div>

      <div className="mt-20">
       <Pagination
        currentPage={data.meta.current_page}
        totalPages={data.meta.last_page}
        baseUrl="/mobile"
       />
      </div>
     </>
    ) : (
     <div className="flex flex-col items-center justify-center py-40 text-center glass-card rounded-[3rem] noise">
      <p className="text-foreground/50 mb-4 font-black text-xl">Unable to sync mobile feed.</p>
      <p className="text-xs text-muted-foreground font-mono bg-background/50 p-4 rounded-2xl border border-border">
       Check Wallhaven API status.
      </p>
     </div>
    )}
   </section>
  </main>
 );
}
