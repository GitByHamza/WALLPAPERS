"use client";
import { Check, Copy, Download, LoaderCircle, Share2 } from "lucide-react";
import { useState } from "react";
export function DownloadButton({ url }: { url: string }) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  return (
    <>
      <button
        type="button"
        className="primary-button"
        disabled={pending}
        onClick={async () => {
          setPending(true);
          setError("");
          try {
            const response = await fetch(`/api/download?url=${encodeURIComponent(url)}`, {
              signal: AbortSignal.timeout(60000),
            });
            if (!response.ok) throw new Error(await response.text());
            const blob = await response.blob();
            const objectUrl = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = objectUrl;
            link.download =
              response.headers.get("content-disposition")?.match(/filename="([^"]+)"/)?.[1] ||
              "lumina-wallpaper.jpg";
            document.body.appendChild(link);
            link.click();
            link.remove();
            setTimeout(() => URL.revokeObjectURL(objectUrl), 30000);
          } catch {
            setError("Download unavailable. Please try again or open the original image.");
          } finally {
            setPending(false);
          }
        }}
      >
        {pending ? <LoaderCircle size={17} className="animate-spin" /> : <Download size={17} />}
        {pending ? "Preparing your download…" : "Download original"}
      </button>
      {error && (
        <p className="action-status" role="alert">
          {error}
        </p>
      )}
    </>
  );
}
export function ShareButton() {
  const [status, setStatus] = useState("");
  return (
    <>
      <button
        type="button"
        className="secondary-button"
        onClick={async () => {
          try {
            if (navigator.share) {
              await navigator.share({
                title: "A wallpaper from Lumina",
                url: window.location.href,
              });
              setStatus("Shared.");
            } else {
              await navigator.clipboard.writeText(window.location.href);
              setStatus("Link copied.");
            }
          } catch (error) {
            if (error instanceof Error && error.name === "AbortError") return;
            setStatus("Could not share. Copy this page’s address to share it.");
          }
        }}
      >
        {status === "Link copied." ? <Check size={16} /> : <Share2 size={16} />}
        {status === "Link copied." ? "Link copied" : "Share wallpaper"}
      </button>
      <p className="sr-only" aria-live="polite">
        {status}
      </p>
    </>
  );
}
export function ColorPalette({ colors }: { colors: string[] }) {
  const [copied, setCopied] = useState("");
  return (
    <>
      <div className="palette palette-labeled">
        {colors.map((color, index) => (
          <button
            key={`${color}-${index}`}
            type="button"
            aria-label={`Copy color ${color}`}
            title={`Copy ${color}`}
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(color);
                setCopied(`${color} copied to clipboard`);
              } catch {
                setCopied(`Color: ${color}`);
              }
            }}
          >
            <span className="palette-swatch" style={{ backgroundColor: color }} />
            <small>{color.toUpperCase()}</small>
          </button>
        ))}
      </div>
      <p className="action-status" aria-live="polite">
        {copied || (
          <>
            <Copy size={10} className="inline mr-1" />
            Select a color to copy its hex value.
          </>
        )}
      </p>
    </>
  );
}
