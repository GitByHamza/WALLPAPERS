"use client";
import { Expand, Image as ImageIcon, Monitor, Smartphone } from "lucide-react";
import { useRef, useState, type CSSProperties } from "react";
import type { WallhavenImage } from "@/lib/wallhaven";
import { formatResolution } from "@/lib/format";
import { WallpaperImage } from "./wallpaper-image";
const modes = [
  { value: "image", label: "Image", icon: ImageIcon },
  { value: "desktop", label: "Desktop", icon: Monitor },
  { value: "phone", label: "Phone", icon: Smartphone },
] as const;
export function WallpaperViewer({ image }: { image: WallhavenImage }) {
  const [mode, setMode] = useState<"image" | "desktop" | "phone">("image");
  const [notice, setNotice] = useState("");
  const stage = useRef<HTMLDivElement>(null);
  return (
    <section className="wallpaper-viewer" aria-label="Wallpaper preview">
      <div
        ref={stage}
        className={`viewer-stage viewer-stage-${mode}`}
        style={
          { "--wallpaper-ratio": `${image.dimension_x} / ${image.dimension_y}` } as CSSProperties
        }
      >
        <div className={`viewer-frame viewer-frame-${mode}`}>
          <WallpaperImage image={image} full priority sizes="(max-width: 640px) 95vw, 90vw" />
          {mode === "phone" && <span className="phone-camera" aria-hidden="true" />}
        </div>
      </div>
      <div className="viewer-toolbar">
        <div className="viewer-modes" role="group" aria-label="Preview format">
          {modes.map(({ value, label, icon: Icon }) => (
            <button
              type="button"
              key={value}
              aria-pressed={mode === value}
              onClick={() => setMode(value)}
            >
              <Icon size={15} aria-hidden="true" />
              {label}
            </button>
          ))}
        </div>
        <span className="viewer-dimensions">
          {formatResolution(image.resolution)}
          <span> · {image.file_type.split("/")[1]?.toUpperCase()}</span>
        </span>
        <button
          type="button"
          className="viewer-expand"
          aria-label="Open wallpaper preview full screen"
          onClick={async () => {
            try {
              if (stage.current?.requestFullscreen) await stage.current.requestFullscreen();
              else window.open(image.path, "_blank", "noopener,noreferrer");
            } catch {
              setNotice("Full screen is unavailable. Use the original image link below.");
            }
          }}
        >
          <Expand size={16} />
          <span>Full screen</span>
        </button>
      </div>
      <p className="viewer-note" aria-live="polite">
        {notice ||
          (mode === "image"
            ? "The complete image. Original download available below."
            : "Device previews crop the image to fit. Your download keeps the original dimensions.")}
      </p>
    </section>
  );
}
