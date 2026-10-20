"use client";
import Link from "next/link";
import { ImageOff, Search, RotateCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
export function EmptyState({ error = false, query = "" }: { error?: boolean; query?: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  return (
    <div className="empty-state" role={error ? "alert" : "status"}>
      {error ? <ImageOff size={30} strokeWidth={1.3} /> : <Search size={30} strokeWidth={1.3} />}
      <h2>{error ? "The view is taking a moment." : "A little too specific?"}</h2>
      <p>
        {error
          ? "We could not reach the wallpaper collection. Give it another try in a moment."
          : query
            ? `No wallpapers matched “${query}” with these filters. Try another subject or a lower minimum resolution.`
            : "No wallpapers match these filters. Try another resolution, orientation, or category."}
      </p>
      {error ? (
        <button
          type="button"
          className="primary-button"
          disabled={pending}
          onClick={() => startTransition(() => router.refresh())}
        >
          <RotateCw size={15} />
          {pending ? "Trying again…" : "Try again"}
        </button>
      ) : (
        <Link className="primary-button" href="/search?resolution=any">
          Explore all wallpapers
        </Link>
      )}
    </div>
  );
}
