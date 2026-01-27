import { BackgroundBlobs } from "@/components/ui/background-blobs";
import { Navbar } from "@/components/ui/navbar";
import { Pagination } from "@/components/ui/pagination";
import { WallpaperCard } from "@/components/ui/wallpaper-card";
import { searchWallpapers } from "@/lib/wallhaven";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { cookies } from "next/headers";

interface NewPageProps {
 searchParams: Promise<{ page?: string }>;
}

async function NewResults({ page, isNsfw }: { page: number; isNsfw: boolean }) {
 const purity = isNsfw ? "111" : "100";
 const data = await searchWallpapers("", page, "date_added", purity, 24).catch(() => null);

 if (!data || !data.data || data.data.length === 0) {
  return (
   <div className="flex flex-col items-center justify-center py-20 text-center">
    <p className="text-white/50 mb-4">No new wallpapers found.</p>
   </div>
  );
 }

 return (
  <>
   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {data.data.map((image, index) => (
     <WallpaperCard key={image.id} image={image} priority={index < 4} />
    ))}
   </div>

   <Pagination
    currentPage={data.meta.current_page}
    totalPages={data.meta.last_page}
    baseUrl="/new"
   />
  </>
 );
}

export default async function NewPage({ searchParams }: NewPageProps) {
 const { page } = await searchParams;
 const currentPage = Number(page) || 1;
 const cookieStore = await cookies();
 const isNsfw = cookieStore.get("settings_nsfw")?.value === "true";

 return (
  <main className="min-h-screen bg-black text-white relative">
   <BackgroundBlobs />
   <Navbar />

   <div className="container mx-auto px-4 pt-32 pb-20">
    <div className="flex items-center gap-4 mb-8">
     <Link href="/" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
      <ArrowLeft size={20} />
     </Link>
     <h1 className="text-3xl font-bold">Latest Wallpapers</h1>
    </div>

    <Suspense fallback={<div className="text-white/40">Loading...</div>}>
     <NewResults page={currentPage} isNsfw={isNsfw} />
    </Suspense>
   </div>
  </main>
 );
}
