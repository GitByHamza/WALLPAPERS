import { BackgroundBlobs } from "@/components/ui/background-blobs";
import { Navbar } from "@/components/ui/navbar";
import { Pagination } from "@/components/ui/pagination";
import { WallpaperCard } from "@/components/ui/wallpaper-card";
import { searchWallpapers } from "@/lib/wallhaven";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { cookies } from "next/headers";
import { AutoRefresh } from "@/components/ui/auto-refresh";

export default async function Home({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
 const { page } = await searchParams;
 const currentPage = Number(page) || 1;
 const cookieStore = await cookies();
 const isNsfw = cookieStore.get("settings_nsfw")?.value === "true";
 const purity = isNsfw ? "111" : "100";

 // Fetch strict 4K wallpapers by default, explicitly requesting 24 items
 const data = await searchWallpapers("landscape", currentPage, "toplist", purity, 24).catch(() => null);

 return (
  <main className="min-h-screen relative overflow-hidden">
   <BackgroundBlobs />
   <Navbar />

   {/* Hero Section */}
   <section className="relative pt-32 pb-20 px-4">
    {/* ... (Hero Content same as before) ... */}
    <div className="container mx-auto text-center max-w-4xl">
     <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-sm font-medium text-white/80 mb-6 animate-fade-in-up">
      ✨ Over 100,000+ 4K Wallpapers
     </div>
     <h1 className="text-5xl md:text-7xl font-bold font-heading mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 animate-fade-in-up delay-100">
      Next-Gen Wallpapers <br /> for Your Setup.
     </h1>
     <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto animate-fade-in-up delay-200">
      Professional grade 4K & 8K wallpapers. Sourced from Wallhaven.
      Strict 4K+ resolution for the crispest pixels.
     </p>

     <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in-up delay-300">
      <Link
       href="/search?q=cyberpunk"
       className="px-8 py-3 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)]"
      >
       Explore Trending
      </Link>
      <Link
       href="/search?q=minimalist"
       className="px-8 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-white font-medium hover:bg-white/10 transition-colors"
      >
       Dark Mode
      </Link>
     </div>
    </div>
   </section>

   {/* Gallery Section */}
   <section className="container mx-auto px-4 pb-20">
    <div className="flex items-center justify-between mb-8">
     <h2 className="text-2xl font-bold text-white">Trending 4K</h2>
     <Link href="/toplist" className="text-sm text-white/60 hover:text-white flex items-center gap-1 transition-colors">
      View All <ArrowRight size={16} />
     </Link>
    </div>

    {data && data.data ? (
     <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
       {data.data.map((image, index) => (
        <WallpaperCard key={image.id} image={image} priority={index < 4} />
       ))}
      </div>

      <Pagination
       currentPage={data.meta.current_page}
       totalPages={data.meta.last_page}
       baseUrl="/"
      />
     </>
    ) : (
     <div className="flex flex-col items-center justify-center py-20 text-center">
      <p className="text-white/50 mb-4">Unable to load wallpapers.</p>
      <p className="text-xs text-white/30 font-mono bg-black/50 p-2 rounded">
       Check API status.
      </p>
     </div>
    )}
   </section>

   {/* Footer */}
   <footer className="border-t border-white/10 bg-black/40 backdrop-blur-xl py-12">
    <div className="container mx-auto px-4 text-center text-white/40 text-sm">
     <p>&copy; {new Date().getFullYear()} Lumina Walls. Powered by Wallhaven API.</p>
    </div>
   </footer>
  </main>
 );
}
