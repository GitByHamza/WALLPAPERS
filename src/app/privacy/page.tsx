import { BackgroundBlobs } from "@/components/ui/background-blobs";
import { Navbar } from "@/components/ui/navbar";
import { ShieldCheck } from "lucide-react";

export default function PrivacyPage() {
 return (
  <main className="min-h-screen relative overflow-hidden bg-background text-white">
   <BackgroundBlobs />
   <Navbar />

   <div className="container mx-auto px-4 pt-48 pb-20 relative z-10">
    <div className="max-w-3xl mx-auto">
     <div className="flex items-center gap-4 mb-10 animate-fade-in-up">
      <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
       <ShieldCheck size={32} />
      </div>
      <div>
       <h1 className="text-4xl font-black tracking-tight">Privacy Protocol</h1>
       <p className="text-white/40 text-sm font-medium">Last updated: May 2026</p>
      </div>
     </div>

     <div className="space-y-12 animate-fade-in-up delay-100">
      <section className="space-y-4">
       <h2 className="text-xl font-bold tracking-tight text-white">1. Data Architecture</h2>
       <p className="text-white/50 leading-relaxed font-medium">
        Lumina Walls is designed with a "privacy-first" approach. We do not require account creation to browse or download wallpapers. Most of our data processing happens server-side via the Wallhaven API, and we do not store personal identifiers on our systems.
       </p>
      </section>

      <section className="space-y-4">
       <h2 className="text-xl font-bold tracking-tight text-white">2. Cookies & Local Storage</h2>
       <p className="text-white/50 leading-relaxed font-medium">
        We use essential cookies to manage your preferences, specifically the "Purity" (NSFW/SFW) setting. These cookies are stored locally on your device and are used to synchronize your experience across browsing sessions.
       </p>
      </section>

      <section className="space-y-4">
       <h2 className="text-xl font-bold tracking-tight text-white">3. Third-Party Integration</h2>
       <p className="text-white/50 leading-relaxed font-medium">
        Our images are served via the Wallhaven API. When you view or download an image, a request is made to their servers. We encourage you to review the <a href="https://wallhaven.cc/help/api" className="text-accent hover:underline">Wallhaven Privacy Policy</a> for more information on how they handle metadata.
       </p>
      </section>

      <section className="space-y-4">
       <h2 className="text-xl font-bold tracking-tight text-white">4. Digital Rights</h2>
       <p className="text-white/50 leading-relaxed font-medium">
        All wallpapers are the property of their respective creators. Lumina Walls acts as a portal to public domain and creative commons content. We do not claim ownership of the visual assets provided through the API.
       </p>
      </section>

      <div className="p-8 rounded-3xl glass-card noise border border-white/5 mt-20">
       <p className="text-white/30 text-xs text-center font-bold uppercase tracking-[0.2em]">
        End of Protocol
       </p>
      </div>
     </div>
    </div>
   </div>
  </main>
 );
}
