import Link from "next/link";
import { Aperture } from "lucide-react";
import { cookies } from "next/headers";
import { NsfwToggle } from "./nsfw-toggle";
import { SearchForm } from "./search-form";

export async function Navbar() {
 const cookieStore = await cookies();
 const isNsfw = cookieStore.get("settings_nsfw")?.value === "true";

 return (
  <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/20 backdrop-blur-xl">
   <div className="container mx-auto px-4 h-16 flex items-center justify-between">
    <Link href="/" className="flex items-center gap-2 group">
     <div className="p-2 rounded-lg bg-gradient-to-tr from-purple-500 to-blue-500 group-hover:scale-110 transition-transform">
      <Aperture className="w-5 h-5 text-white" />
     </div>
     <span className="text-xl font-bold font-heading bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
      Lumina
     </span>
    </Link>

    <SearchForm />

    <div className="flex items-center gap-4">
     <Link href="/popular" className="text-sm text-white/70 hover:text-white transition-colors">
      Popular
     </Link>
     <Link href="/new" className="text-sm text-white/70 hover:text-white transition-colors">
      New
     </Link>
     <div className="h-4 w-[1px] bg-white/10 mx-2" />
     <NsfwToggle initialValue={isNsfw} />
    </div>
   </div>
  </nav>
 );
}
