"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function AutoRefresh() {
 const router = useRouter();

 useEffect(() => {
  // Check if we've already reloaded to prevent infinite loops
  const hasReloaded = sessionStorage.getItem("auto_refreshed");

  if (!hasReloaded) {
   sessionStorage.setItem("auto_refreshed", "true");
   console.log("Auto-refreshing page to fix empty data...");
   window.location.reload();
  } else {
   // Clear flag after a delay so it works on next navigation
   setTimeout(() => sessionStorage.removeItem("auto_refreshed"), 5000);
  }
 }, [router]);

 return (
  <div className="fixed inset-0 flex items-center justify-center bg-black/90 z-50">
   <div className="text-center">
    <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4" />
    <p className="text-white/60">Optimizing connection...</p>
   </div>
  </div>
 );
}
