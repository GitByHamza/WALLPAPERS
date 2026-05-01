import Link from "next/link";
import { Aperture, Github, Twitter, Instagram, Mail } from "lucide-react";

const FOOTER_LINKS = [
 {
  title: "Explore",
  links: [
   { label: "Trending", href: "/popular" },
   { label: "Latest Drops", href: "/new" },
   { label: "Mobile Collection", href: "/mobile" },
   { label: "Top Rated", href: "/popular" },
  ],
 },
 {
  title: "Categories",
  links: [
   { label: "Cyberpunk", href: "/search?q=cyberpunk" },
   { label: "Minimalist", href: "/search?q=minimalist" },
   { label: "Abstract", href: "/search?q=abstract" },
   { label: "Nature", href: "/search?q=nature" },
  ],
 },
 {
  title: "Styles",
  links: [
   { label: "Dark Mode", href: "/search?q=dark" },
   { label: "White / Clean", href: "/search?q=white" },
   { label: "Glassmorphism", href: "/search?q=glassmorphism" },
   { label: "Black & Gold", href: "/search?q=black gold" },
  ],
 },
 {
  title: "Legal",
  links: [
   { label: "About Us", href: "/about" },
   { label: "Privacy Policy", href: "/privacy" },
   { label: "Terms of Service", href: "/privacy" },
   { label: "API Policy", href: "https://wallhaven.cc/help/api", external: true },
  ],
 },
];

export function Footer() {
 return (
  <footer className="relative mt-20 border-t border-border bg-muted/30 backdrop-blur-3xl pt-20 pb-10 overflow-hidden noise">
   <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-accent/5 blur-[120px] rounded-full -z-10" />
   
   <div className="container mx-auto px-4">
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
     <div className="col-span-2 lg:col-span-1">
      <Link href="/" className="flex items-center gap-2 group mb-6">
       <div className="p-2 rounded-xl bg-gradient-to-tr from-accent to-blue-500 group-hover:scale-110 transition-all duration-500">
        <Aperture className="w-5 h-5 text-white" />
       </div>
       <span className="text-2xl font-bold font-heading bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60 tracking-tight">
        Lumina
       </span>
      </Link>
      <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-xs font-medium">
       The ultimate destination for 4K & 8K wallpapers. Curated for professionals who value high-density visuals and clean setup aesthetics.
      </p>
      <div className="flex items-center gap-4">
       {[Twitter, Instagram, Github, Mail].map((Icon, i) => (
        <Link key={i} href="#" className="p-2 rounded-lg bg-background border border-border text-muted-foreground hover:text-accent hover:border-accent transition-all">
         <Icon size={18} />
        </Link>
       ))}
      </div>
     </div>

     {FOOTER_LINKS.map((section) => (
      <div key={section.title}>
       <h4 className="text-foreground font-black text-xs uppercase tracking-[0.2em] mb-6">{section.title}</h4>
       <ul className="space-y-4">
        {section.links.map((link) => (
         <li key={link.label}>
          {link.external ? (
           <a 
            href={link.href} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-accent transition-colors font-medium"
           >
            {link.label}
           </a>
          ) : (
           <Link 
            href={link.href} 
            className="text-sm text-muted-foreground hover:text-accent transition-colors font-medium"
           >
            {link.label}
           </Link>
          )}
         </li>
        ))}
       </ul>
      </div>
     ))}
    </div>

    <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
     <p className="text-muted-foreground/30 text-[10px] font-bold uppercase tracking-widest">
      &copy; {new Date().getFullYear()} Lumina Walls &bull; All Rights Reserved
     </p>
     <div className="flex items-center gap-8">
      <div className="flex items-center gap-2">
       <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
       <span className="text-muted-foreground/30 text-[10px] font-bold uppercase tracking-widest">System Operational</span>
      </div>
      <div className="text-muted-foreground/30 text-[10px] font-bold uppercase tracking-widest">
       Powered by <span className="text-muted-foreground/60">Wallhaven API</span>
      </div>
     </div>
    </div>
   </div>
  </footer>
 );
}
