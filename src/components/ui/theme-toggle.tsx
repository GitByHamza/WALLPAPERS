"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
const subscribe = () => () => {};
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  return (
    <div className="theme-switch" role="group" aria-label="Color theme">
      <button
        type="button"
        onClick={() => setTheme("light")}
        aria-label="Use light theme"
        aria-pressed={mounted && resolvedTheme === "light"}
        title="Light theme"
      >
        <Sun size={16} />
      </button>
      <button
        type="button"
        onClick={() => setTheme("dark")}
        aria-label="Use dark theme"
        aria-pressed={mounted && resolvedTheme === "dark"}
        title="Dark theme"
      >
        <Moon size={15} />
      </button>
    </div>
  );
}
