"use client";
import { Eye, ShieldCheck } from "lucide-react";
import { toggleNsfw } from "@/app/actions";
import { useState, useTransition } from "react";
export function NsfwToggle({ initialValue }: { initialValue: boolean }) {
  const [error, setError] = useState(false);
  const [pending, startTransition] = useTransition();
  return (
    <button
      type="button"
      role="switch"
      aria-label="Include mature content"
      aria-checked={initialValue}
      disabled={pending}
      className="content-toggle"
      title={
        initialValue
          ? "Show only safe-for-work content"
          : "Include mature content (requires a Wallhaven API key)"
      }
      onClick={() => {
        setError(false);
        startTransition(async () => {
          try {
            await toggleNsfw(initialValue);
          } catch {
            setError(true);
          }
        });
      }}
    >
      {initialValue ? <Eye size={14} /> : <ShieldCheck size={14} />}
      <span>{error ? "Try again" : pending ? "Updating" : initialValue ? "ALL" : "SFW"}</span>
    </button>
  );
}
