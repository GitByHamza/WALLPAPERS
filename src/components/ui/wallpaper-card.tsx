"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { WallhavenImage } from "@/lib/wallhaven";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MouseEvent } from "react";

interface WallpaperCardProps {
 image: WallhavenImage;
 priority?: boolean;
 aspectRatio?: string;
}

export function WallpaperCard({ image, priority = false, aspectRatio = "aspect-[16/10]" }: WallpaperCardProps) {
 const x = useMotionValue(0);
 const y = useMotionValue(0);

 const mouseX = useSpring(x, { stiffness: 500, damping: 50 });
 const mouseY = useSpring(y, { stiffness: 500, damping: 50 });

 function onMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
  const { left, top, width, height } = currentTarget.getBoundingClientRect();
  x.set((clientX - left) / width);
  y.set((clientY - top) / height);
 }

 const background = useTransform(
  [mouseX, mouseY],
  ([x, y]) => `radial-gradient(600px circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.1), transparent 40%)`
 );

 return (
  <motion.div
   initial={{ opacity: 0, y: 20 }}
   whileInView={{ opacity: 1, y: 0 }}
   viewport={{ once: true }}
   onMouseMove={onMouseMove}
   className={cn(
    "group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-lg hover:shadow-2xl transition-all duration-500",
    aspectRatio
   )}
  >
   <Link href={`/wallpaper/${image.id}`} className="block w-full h-full">
    <motion.div
     style={{ background }}
     className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
    />

    <Image
     src={image.thumbs.large}
     alt={`Wallpaper ${image.id}`}
     fill
     className="object-cover transition-transform duration-1000 group-hover:scale-105"
     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw min-w-[300px]"
     priority={priority}
     unoptimized
    />

    {/* Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 z-20">
     <div className="transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
      <div className="flex justify-between items-start">
       <div>
        <p className="text-white font-bold text-lg tracking-tight mb-1">{image.resolution}</p>
        <p className="text-white/50 text-xs font-medium uppercase tracking-widest">{image.category} • {Math.round(image.file_size / 1024 / 1024 * 100) / 100}MB</p>
       </div>
       <div className="p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white">
        <ArrowUpRight size={16} />
       </div>
      </div>
     </div>
    </div>
   </Link>
  </motion.div>
 );
}
