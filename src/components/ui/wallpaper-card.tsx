import Link from "next/link";
import { ArrowUpRight, Eye, Heart } from "lucide-react";
import type { WallhavenImage } from "@/lib/wallhaven";
import { compactNumber, formatResolution } from "@/lib/format";
import { WallpaperImage } from "./wallpaper-image";
export function WallpaperCard({
  image,
  priority = false,
  portrait = false,
}: {
  image: WallhavenImage;
  priority?: boolean;
  portrait?: boolean;
}) {
  return (
    <Link
      href={`/wallpaper/${image.id}`}
      className="wallpaper-card"
      aria-label={`View ${image.category} wallpaper, ${formatResolution(image.resolution)}`}
    >
      <div className={`wallpaper-image${portrait ? " portrait" : ""}`}>
        <WallpaperImage
          image={image}
          priority={priority}
          sizes={
            portrait
              ? "(max-width: 640px) 45vw, (max-width: 900px) 30vw, 20vw"
              : "(max-width: 900px) 45vw, 30vw"
          }
        />
        <span className="card-open" aria-hidden="true">
          <ArrowUpRight size={16} />
        </span>
      </div>
      <div className="card-caption">
        <span className="card-resolution">{formatResolution(image.resolution)}</span>
        <span className="card-category">{image.category}</span>
      </div>
      <div className="card-data">
        <span>
          <Eye size={11} aria-hidden="true" />
          <span className="sr-only">Views:</span>
          {compactNumber(image.views)}
          <Heart size={10} aria-hidden="true" />
          <span className="sr-only">Favorites:</span>
          {compactNumber(image.favorites)}
        </span>
        <span className="card-colors" aria-label={`Colors: ${image.colors.join(", ")}`}>
          {image.colors.slice(0, 5).map((color, index) => (
            <i key={`${color}-${index}`} style={{ backgroundColor: color }} />
          ))}
        </span>
      </div>
    </Link>
  );
}
