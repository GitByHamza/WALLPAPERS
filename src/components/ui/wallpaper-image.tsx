"use client";
import Image from "next/image";
import { ImageOff } from "lucide-react";
import { useState } from "react";
import type { WallhavenImage } from "@/lib/wallhaven";

type ImageSource = { src: string; optimized: boolean };

function retryUrl(src: string) {
  const url = new URL(src);
  url.searchParams.set("lumina_retry", "1");
  return url.href;
}

export function WallpaperImage({
  image,
  priority = false,
  sizes,
  full = false,
  uncropped = false,
}: {
  image: WallhavenImage;
  priority?: boolean;
  sizes: string;
  full?: boolean;
  uncropped?: boolean;
}) {
  const description =
    image.tags
      ?.slice(0, 3)
      .map((tag) => tag.name)
      .join(", ") || `${image.category} wallpaper`;
  const sources: ImageSource[] = full
    ? [
        { src: image.path, optimized: true },
        { src: image.path, optimized: false },
        { src: image.thumbs.original, optimized: false },
      ]
    : uncropped
      ? [
          { src: image.thumbs.original, optimized: false },
          { src: retryUrl(image.thumbs.original), optimized: false },
          { src: image.path, optimized: false },
        ]
      : [
          { src: image.thumbs.large, optimized: false },
          { src: image.thumbs.small, optimized: false },
          { src: retryUrl(image.thumbs.large), optimized: false },
        ];
  return (
    <ImageWithFallback
      key={JSON.stringify(sources)}
      sources={sources}
      alt={`${description}, ${image.resolution}`}
      sizes={sizes}
      priority={priority}
    />
  );
}

function ImageWithFallback({
  sources,
  alt,
  sizes,
  priority,
}: {
  sources: ImageSource[];
  alt: string;
  sizes: string;
  priority: boolean;
}) {
  const [attempt, setAttempt] = useState(0);
  const source = sources[attempt];
  if (!source)
    return (
      <span className="image-failure">
        <ImageOff size={17} aria-hidden="true" />
        Preview unavailable
      </span>
    );
  return (
    <Image
      key={`${source.src}-${source.optimized}`}
      src={source.src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      quality={85}
      onError={() => setAttempt(attempt + 1)}
      unoptimized={!source.optimized}
    />
  );
}
