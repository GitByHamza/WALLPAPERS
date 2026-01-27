"use client";

import Image from "next/image";
import Link from "next/link";
import { Maximize2, Download } from "lucide-react";
import { WallhavenImage } from "@/lib/wallhaven";
import { motion } from "framer-motion";

interface WallpaperCardProps {
 image: WallhavenImage;
 priority?: boolean;
}

export function WallpaperCard({ image, priority = false }: WallpaperCardProps) {
 return (
  <motion.div
   initial={{ opacity: 0, y: 20 }}
   whileInView={{ opacity: 1, y: 0 }}
   viewport={{ once: true }}
   whileHover={{ y: -5 }}
   className="group relative aspect-[16/9] rounded-xl overflow-hidden bg-white/5 border border-white/10"
  >
   <Link href={`/wallpaper/${image.id}`} className="block w-full h-full">
    <Image
     src={image.thumbs.large}
     alt={`Wallpaper ${image.id}`}
     fill
     className="object-cover transition-transform duration-700 group-hover:scale-110"
     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw min-w-[300px]"
     priority={priority}
     unoptimized
    />

    {/* Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
     <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
      <div className="flex justify-between items-end">
       <div>
        <p className="text-white font-medium truncate">{image.resolution}</p>
        <p className="text-white/60 text-sm truncate">{image.category} • {Math.round(image.file_size / 1024)}KB</p>
       </div>
      </div>

      <div className="mt-4 flex gap-2">
       <button className="flex-1 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs py-2 rounded-lg flex items-center justify-center gap-2 transition-colors">
        <Maximize2 size={14} /> View
       </button>
      </div>
     </div>
    </div>
   </Link>
  </motion.div>
 );
}
