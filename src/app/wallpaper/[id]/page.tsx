import { BackgroundBlobs } from "@/components/ui/background-blobs";
import { Navbar } from "@/components/ui/navbar";
import { getWallpaper, searchWallpapers } from "@/lib/wallhaven";
import { WallpaperCard } from "@/components/ui/wallpaper-card";
import { ArrowLeft, Download, Maximize2, Share2, Tag, Info, Palette } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface PageProps {
 params: Promise<{ id: string }>;
}

export default async function WallpaperPage({ params }: PageProps) {
 const resolvedParams = await params;
 const image = await getWallpaper(resolvedParams.id).catch(() => null);

 if (!image) {
  notFound();
 }

 const primaryColor = image.colors[0] || "#6366f1";

 return (
  <main className="min-h-screen bg-background text-foreground relative overflow-hidden">
   <div 
    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] opacity-10 blur-[150px] pointer-events-none z-0 rounded-full"
    style={{ backgroundColor: primaryColor }}
   />
   <BackgroundBlobs />
   <Navbar />

   <div className="container mx-auto px-6 md:px-12 pt-48 pb-20 relative z-10">
    <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-10 transition-all hover:-translate-x-1 group">
     <div className="p-3 rounded-2xl glass-card group-hover:bg-accent/10 transition-colors">
      <ArrowLeft size={18} />
     </div>
     <span className="font-bold">Back to Discovery</span>
    </Link>

    <div className="grid lg:grid-cols-[1fr_400px] gap-16 items-start">
     {/* Image Preview Container */}
     <div className="space-y-8">
      <div className="relative aspect-video lg:aspect-auto h-[60vh] lg:h-[75vh] rounded-[2.5rem] overflow-hidden glass-card shadow-2xl group ring-1 ring-border">
       <Image
        src={image.path}
        alt={`Wallpaper ${image.id}`}
        fill
        className="object-contain"
        priority
        unoptimized
       />
       <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
       
       <a 
        href={image.path} 
        target="_blank" 
        className="absolute top-6 right-6 p-4 bg-black/40 hover:bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
       >
        <Maximize2 size={24} />
       </a>
      </div>
      
      {/* Mobile Actions (Visible on small screens) */}
      <div className="lg:hidden flex gap-4">
        <a
          href={`/api/download?url=${encodeURIComponent(image.path)}&filename=wallpaper-${image.id}.${image.file_type.split('/')[1]}`}
          className="flex-1 flex items-center justify-center gap-3 py-5 rounded-3xl bg-foreground text-background font-black shadow-xl active:scale-95 transition-all"
        >
          <Download size={20} /> Download Original
        </a>
      </div>
     </div>

     {/* Sidebar / Controls */}
     <div className="space-y-10 animate-fade-in-up">
      <div className="p-10 rounded-[2.5rem] glass-card relative overflow-hidden noise">
       <div className="absolute top-0 right-0 p-8 opacity-5">
        <Info size={120} />
       </div>
       
       <h1 className="text-4xl font-black mb-2 tracking-tighter">Wallpaper #{image.id}</h1>
       <p className="text-muted-foreground text-sm font-bold">Published on {new Date(image.created_at).toLocaleDateString(undefined, { dateStyle: 'long' })}</p>

       <div className="mt-12 space-y-6">
        <h3 className="text-xs font-black text-accent uppercase tracking-[0.2em]">Primary Action</h3>

        <a
         href={`/api/download?url=${encodeURIComponent(image.path)}&filename=wallpaper-${image.id}.${image.file_type.split('/')[1]}`}
         className="flex items-center justify-between p-6 rounded-[2rem] bg-foreground text-background hover:opacity-90 transition-all shadow-2xl active:scale-[0.98] group"
        >
         <span className="font-black text-xl flex items-center gap-3">
          <Download size={24} className="group-hover:translate-y-1 transition-transform" /> 
          Get Original
         </span>
         <span className="text-xs font-black bg-background/10 px-4 py-2 rounded-xl border border-background/10">{image.resolution}</span>
        </a>
        
        <button className="w-full flex items-center justify-center gap-3 py-5 rounded-[2rem] border border-border glass-card text-sm font-black text-muted-foreground hover:text-foreground hover:border-accent/30 transition-all">
         <Share2 size={20} /> Share with setup
        </button>
       </div>
      </div>

      <div className="p-10 rounded-[2.5rem] glass-card space-y-10 noise">
       <section>
        <h3 className="flex items-center gap-2 text-xs font-black text-muted-foreground uppercase tracking-[0.2em] mb-8">
         <Info size={16} /> Technical Info
        </h3>
        <div className="grid grid-cols-2 gap-y-8 gap-x-6">
         <div className="space-y-2">
          <p className="text-muted-foreground/50 text-[10px] uppercase font-black tracking-widest">Format</p>
          <p className="font-black text-base uppercase">{image.file_type.split('/')[1] || 'Image'}</p>
         </div>
         <div className="space-y-2">
          <p className="text-muted-foreground/50 text-[10px] uppercase font-black tracking-widest">Category</p>
          <p className="font-black text-base capitalize">{image.category}</p>
         </div>
         <div className="space-y-2">
          <p className="text-muted-foreground/50 text-[10px] uppercase font-black tracking-widest">Size</p>
          <p className="font-black text-base">{(image.file_size / 1024 / 1024).toFixed(2)} MB</p>
         </div>
         <div className="space-y-2">
          <p className="text-muted-foreground/50 text-[10px] uppercase font-black tracking-widest">Views</p>
          <p className="font-black text-base">{image.views.toLocaleString()}</p>
         </div>
        </div>
       </section>

       {/* Tags */}
       {image.tags && image.tags.length > 0 && (
        <section>
         <h3 className="flex items-center gap-2 text-xs font-black text-muted-foreground uppercase tracking-[0.2em] mb-6">
          <Tag size={16} /> Meta Tags
         </h3>
         <div className="flex flex-wrap gap-3">
          {image.tags.map((tag) => (
           <Link
            key={tag.id}
            href={`/search?q=${tag.name}`}
            className="px-5 py-2.5 rounded-2xl bg-muted border border-border text-xs font-black text-muted-foreground hover:bg-accent/10 hover:text-accent hover:border-accent/30 transition-all shadow-sm"
           >
            #{tag.name}
           </Link>
          ))}
         </div>
        </section>
       )}

       {/* Colors */}
       <section>
        <h3 className="flex items-center gap-2 text-xs font-black text-muted-foreground uppercase tracking-[0.2em] mb-6">
         <Palette size={16} /> Color Palette
        </h3>
        <div className="flex items-center gap-4">
         {image.colors.map((color, i) => (
          <div 
            key={i} 
            className="w-12 h-12 rounded-2xl border border-border shadow-xl hover:scale-110 transition-transform cursor-help" 
            style={{ backgroundColor: color }} 
            title={color}
          />
         ))}
        </div>
       </section>
      </div>
     </div>
    </div>

    {/* Related Wallpapers */}
    <section className="mt-40">
     <div className="flex items-center justify-between mb-12">
      <div>
       <h2 className="text-4xl font-black text-foreground tracking-tighter">Related <span className="text-accent text-glow">Visuals.</span></h2>
       <p className="text-muted-foreground text-lg mt-2 font-bold">Similar high-density renders for your setup.</p>
      </div>
     </div>
     
     <Suspense fallback={<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
       {[...Array(4)].map((_, i) => (
         <div key={i} className="aspect-[16/10] rounded-[2rem] bg-muted animate-pulse border border-border" />
       ))}
     </div>}>
      <RelatedWallpapers tags={image.tags?.map(t => t.name) || []} currentId={image.id} />
     </Suspense>
    </section>
   </div>
  </main>
 );
}

async function RelatedWallpapers({ tags, currentId }: { tags: string[]; currentId: string }) {
 const query = tags.slice(0, 3).join(" ") || "abstract";
 const data = await searchWallpapers(query, 1, "relevance", "100", 5).catch(() => null);

 if (!data || !data.data || data.data.length === 0) return null;

 // Filter out the current wallpaper
 const filtered = data.data.filter(img => img.id !== currentId).slice(0, 4);

 return (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
   {filtered.map((image) => (
    <WallpaperCard key={image.id} image={image} />
   ))}
  </div>
 );
}
