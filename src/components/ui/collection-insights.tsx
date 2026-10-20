import { ChartNoAxesColumn, ChevronDown } from "lucide-react";
import type { WallhavenImage } from "@/lib/wallhaven";
import { resolutionTier } from "@/lib/resolutions";
function Distribution({
  title,
  values,
  total,
}: {
  title: string;
  values: Record<string, number>;
  total: number;
}) {
  return (
    <section>
      <h3>{title}</h3>
      {Object.entries(values).map(([label, count]) => (
        <div className="chart-row" key={label}>
          <span>{label}</span>
          <div className="bar-track" aria-hidden="true">
            <div className="bar-fill" style={{ width: `${(count / total) * 100}%` }} />
          </div>
          <span>{count}</span>
        </div>
      ))}
    </section>
  );
}
export function CollectionInsights({ images }: { images: WallhavenImage[] }) {
  if (!images.length) return null;
  const categories: Record<string, number> = {};
  const resolutionCounts: Record<string, number> = {};
  for (const image of images) {
    const category = image.category.charAt(0).toUpperCase() + image.category.slice(1);
    categories[category] = (categories[category] || 0) + 1;
    const tier = resolutionTier(image.dimension_x, image.dimension_y);
    const label = tier === "Original" ? "Below HD" : tier;
    resolutionCounts[label] = (resolutionCounts[label] || 0) + 1;
  }
  const resolutionOrder = [
    "16K",
    "12K",
    "8K",
    "6K",
    "5K",
    "4K UHD",
    "QHD",
    "2K DCI",
    "FHD",
    "HD",
    "Below HD",
  ];
  const resolutions = Object.fromEntries(
    resolutionOrder
      .filter((label) => resolutionCounts[label])
      .map((label) => [label, resolutionCounts[label]]),
  );
  return (
    <details className="insights">
      <summary>
        <span>
          <ChartNoAxesColumn size={16} />
          Collection insights<small>{images.length} wallpapers on this page</small>
        </span>
        <ChevronDown size={15} />
      </summary>
      <div className="insight-grid">
        <Distribution title="By category" values={categories} total={images.length} />
        <Distribution title="By resolution" values={resolutions} total={images.length} />
      </div>
    </details>
  );
}
