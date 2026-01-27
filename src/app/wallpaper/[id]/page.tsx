import { BackgroundBlobs } from "@/components/ui/background-blobs";
import { Navbar } from "@/components/ui/navbar";
import { getWallpaper } from "@/lib/wallhaven";
import { ArrowLeft, Download, Maximize2, Share2, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
 params: Promise<{ id: string }>;
}

export default async function WallpaperPage({ params }: PageProps) {
 const resolvedParams = await params;
 const image = await getWallpaper(resolvedParams.id).catch(() => null);

 if (!image) {
  notFound();
 }

 return (
  <main className="min-h-screen bg-black text-white relative">
   <BackgroundBlobs />
   <Navbar />

   <div className="container mx-auto px-4 pt-32 pb-20">
    <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors">
     <ArrowLeft size={20} /> Back to Gallery
    </Link>

    <div className="grid lg:grid-cols-[1fr_350px] gap-8">
     {/* Image Preview */}
     <div className="relative aspect-video lg:aspect-auto h-[60vh] lg:h-[80vh] rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-2xl group">
      <Image
       src={image.path}
       alt={`Wallpaper ${image.id}`}
       fill
       className="object-contain"
       priority
       unoptimized
      />
      <a href={image.path} target="_blank" className="absolute top-4 right-4 p-3 bg-black/50 hover:bg-black/70 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
       <Maximize2 size={20} />
      </a>
     </div>

     {/* Sidebar / Controls */}
     <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
       <h1 className="text-2xl font-bold mb-2">Wallpaper #{image.id}</h1>
       <p className="text-white/60 text-sm">Uploaded on {new Date(image.created_at).toLocaleDateString()}</p>

       <div className="mt-6 space-y-3">
        <h3 className="text-sm font-medium text-white/40 uppercase tracking-wider">Actions</h3>

        <a
         href={`/api/download?url=${encodeURIComponent(image.path)}&filename=wallpaper-${image.id}.${image.file_type.split('/')[1]}`}
         className="flex items-center justify-between p-4 rounded-xl bg-white text-black hover:bg-white/90 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)] group"
        >
         <span className="font-bold flex items-center gap-2"><Download size={20} /> Download Original</span>
         <span className="text-xs font-mono bg-black/10 px-2 py-1 rounded">{image.resolution}</span>
        </a>
       </div>

       <div className="mt-6 pt-6 border-t border-white/10 flex gap-4">
        <button className="flex-1 py-2 rounded-lg border border-white/10 hover:bg-white/5 flex items-center justify-center gap-2 text-sm text-white/80 transition-colors">
         <Share2 size={16} /> Share
        </button>
       </div>
      </div>

      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
       <h3 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-4">Properties</h3>
       <div className="space-y-3 text-sm">
        <div className="flex justify-between py-2 border-b border-white/5">
         <span className="text-white/60">Category</span>
         <span className="capitalize text-white">{image.category}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-white/5">
         <span className="text-white/60">Resolution</span>
         <span className="text-white">{image.resolution}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-white/5">
         <span className="text-white/60">Size</span>
         <span className="text-white">{(image.file_size / 1024 / 1024).toFixed(2)} MB</span>
        </div>
        <div className="flex justify-between py-2 border-b border-white/5">
         <span className="text-white/60">Type</span>
         <span className="uppercase text-white">{image.file_type}</span>
        </div>
        <div className="flex justify-between py-2">
         <span className="text-white/60">Views</span>
         <span className="text-white">{image.views.toLocaleString()}</span>
        </div>
       </div>

       {/* Tags */}
       {image.tags && image.tags.length > 0 && (
        <div className="mt-6">
         <h4 className="text-xs font-medium text-white/40 uppercase mb-3">Tags</h4>
         <div className="flex flex-wrap gap-2">
          {image.tags.map((tag) => (
           <Link
            key={tag.id}
            href={`/search?q=${tag.name}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/70 hover:bg-white/10 hover:text-white transition-all"
           >
            <Tag size={12} />
            {tag.name}
           </Link>
          ))}
         </div>
        </div>
       )}

       {/* Colors */}
       <div className="mt-6">
        <h4 className="text-xs font-medium text-white/40 uppercase mb-3">Palette</h4>
        <div className="flex flex-wrap gap-2">
         {image.colors.map((color, i) => (
          <div key={i} className="w-8 h-8 rounded-full border border-white/10 shadow-lg" style={{ backgroundColor: color }} title={color}></div>
         ))}
        </div>
       </div>
      </div>
     </div>
    </div>
   </div>
  </main>
 );
}
