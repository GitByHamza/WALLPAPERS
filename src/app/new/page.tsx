import { BackgroundBlobs } from "@/components/ui/background-blobs";
import { Navbar } from "@/components/ui/navbar";
import { Pagination } from "@/components/ui/pagination";
import { WallpaperCard } from "@/components/ui/wallpaper-card";
import { searchWallpapers } from "@/lib/wallhaven";
import { Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { cookies } from "next/headers";

export default async function NewPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
 const { page } = await searchParams;
 const currentPage = Number(page) || 1;
 const cookieStore = await cookies();
 const isNsfw = cookieStore.get("settings_nsfw")?.value === "true";
 const purity = isNsfw ? "111" : "100";

 return (
  <main className="min-h-screen relative overflow-hidden bg-background">
   <BackgroundBlobs />
   <Navbar />

   <section className="container mx-auto px-6 md:px-12 pt-60 pb-32">
    <div className="max-w-4xl mb-20 animate-fade-in-up">
     <div className="flex items-center gap-4 mb-8">
      <Link href="/" className="p-4 rounded-2xl glass-card hover:bg-accent/10 hover:border-accent/30 transition-all group">
       <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
      </Link>
      <div className="p-4 rounded-2xl bg-accent/10 border border-accent/20 text-accent shadow-2xl">
       <Clock className="w-8 h-8" />
      </div>
     </div>
     <h1 className="text-5xl md:text-8xl font-black text-foreground tracking-tighter mb-6 leading-[0.9]">
      Latest <span className="text-accent text-glow">Drops.</span>
     </h1>
     <p className="text-muted-foreground text-xl max-w-2xl font-medium leading-relaxed">
      The freshest pixels from the community. Updated in real-time as artists upload their work.
     </p>
    </div>

    <Suspense key={currentPage} fallback={<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="aspect-[16/10] rounded-[2rem] bg-muted animate-pulse border border-border" />
      ))}
    </div>}>
     <NewResults page={currentPage} purity={purity} />
    </Suspense>
   </section>
  </main>
 );
}

async function NewResults({ page, purity }: { page: number; purity: string }) {
 const data = await searchWallpapers("", page, "date_added", purity, 24).catch(() => null);

 if (!data || !data.data || data.data.length === 0) {
  return (
   <div className="flex flex-col items-center justify-center py-40 text-center glass-card rounded-[3rem] noise">
    <p className="text-foreground/50 mb-4 font-black text-xl">Unable to sync latest feed.</p>
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
     baseUrl="/new"
    />
   </div>
  </>
 );
}
