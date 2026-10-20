"use client";
import Image from "next/image";
import { ImageOff } from "lucide-react";
import { useState } from "react";
import type { WallhavenImage } from "@/lib/wallhaven";
export function WallpaperImage({
  image,
  priority = false,
  sizes,
  full = false,
}: {
  image: WallhavenImage;
  priority?: boolean;
  sizes: string;
  full?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  if (failed)
    return (
      <span className="image-failure">
        <ImageOff size={17} />
        Preview unavailable
      </span>
    );
  const description =
    image.tags
      ?.slice(0, 3)
      .map((tag) => tag.name)
      .join(", ") || `${image.category} wallpaper`;
  return (
    <Image
      src={full ? image.path : image.thumbs.large}
      alt={`${description}, ${image.resolution}`}
      fill
      sizes={sizes}
      priority={priority}
      quality={85}
      onError={() => setFailed(true)}
      unoptimized={!full}
    />
  );
}
