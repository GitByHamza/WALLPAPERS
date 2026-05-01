import { BackgroundBlobs } from "@/components/ui/background-blobs";
import { Navbar } from "@/components/ui/navbar";
import { Pagination } from "@/components/ui/pagination";
import { WallpaperCard } from "@/components/ui/wallpaper-card";
import { searchWallpapers } from "@/lib/wallhaven";
import { Search, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { cookies } from "next/headers";
import { SearchFilters } from "@/components/ui/search-filters";

interface SearchPageProps {
 searchParams: Promise<{ q?: string; page?: string; sort?: string }>;
}

async function SearchResults({ query, page, sort, isNsfw }: { query: string; page: number; sort: string; isNsfw: boolean }) {
 const purity = isNsfw ? "111" : "100";
 const data = await searchWallpapers(query, page, sort as any, purity, 24).catch(() => null);

 if (!data || !data.data || data.data.length === 0) {
  return (
   <div className="flex flex-col items-center justify-center py-40 text-center glass-card rounded-[3rem] noise">
    <p className="text-foreground/50 mb-6 font-black text-2xl">No results found for &quot;{query}&quot;</p>
    <Link href="/" className="px-8 py-4 rounded-2xl bg-accent text-white font-black shadow-2xl hover:scale-105 active:scale-95 transition-all">
     Return to Discovery
    </Link>
   </div>
  );
 }

 return (
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
     baseUrl="/search"
    />
   </div>
  </>
 );
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
 const { q, page, sort } = await searchParams;
 const query = q || "";
 const currentSort = sort || "relevance";
 const currentPage = Number(page) || 1;
 const cookieStore = await cookies();
 const isNsfw = cookieStore.get("settings_nsfw")?.value === "true";

 return (
  <main className="min-h-screen bg-background text-foreground relative overflow-hidden">
   <BackgroundBlobs />
   <Navbar />

   <div className="container mx-auto px-6 md:px-12 pt-60 pb-32">
    <div className="max-w-4xl mb-20 animate-fade-in-up">
     <div className="flex items-center gap-4 mb-8">
      <Link href="/" className="p-4 rounded-2xl glass-card hover:bg-accent/10 hover:border-accent/30 transition-all group">
       <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
      </Link>
      <div className="p-4 rounded-2xl bg-accent/10 border border-accent/20 text-accent shadow-2xl">
       <Search className="w-8 h-8" />
      </div>
     </div>
     <h1 className="text-5xl md:text-8xl font-black text-foreground tracking-tighter mb-6 leading-[0.9]">
      Results for <span className="text-accent text-glow">&quot;{query}&quot;</span>
     </h1>
     <p className="text-muted-foreground text-xl font-medium mb-12">
      Scanning the grid for the best matches.
     </p>

     <SearchFilters />
    </div>

    <Suspense key={`${query}-${currentPage}-${currentSort}`} fallback={<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="aspect-[16/10] rounded-[2rem] bg-muted animate-pulse border border-border" />
      ))}
    </div>}>
     <SearchResults query={query} page={currentPage} sort={currentSort} isNsfw={isNsfw} />
    </Suspense>
   </div>
  </main>
 );
}
