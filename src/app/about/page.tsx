import { BackgroundBlobs } from "@/components/ui/background-blobs";
import { Navbar } from "@/components/ui/navbar";
import { Aperture, Shield, Zap, Heart } from "lucide-react";

export default function AboutPage() {
 return (
  <main className="min-h-screen relative overflow-hidden bg-background text-white">
   <BackgroundBlobs />
   <Navbar />

   <div className="container mx-auto px-4 pt-48 pb-20 relative z-10">
    <div className="max-w-4xl mx-auto text-center mb-20 animate-fade-in-up">
     <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">
      Redefining the <br /> 
      <span className="text-accent text-glow">Visual Setup.</span>
     </h1>
     <p className="text-xl text-white/40 font-medium leading-relaxed max-w-2xl mx-auto">
      Lumina Walls was born from a simple obsession: finding the perfect pixels for the perfect desk setup. We curate the world's most stunning 4K renders.
     </p>
    </div>

    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-32">
     {[
      {
       icon: Zap,
       title: "Peak Performance",
       desc: "Our engine is optimized for high-speed delivery of raw, uncompressed 4K and 8K wallpaper buffers.",
      },
      {
       icon: Shield,
       title: "Safe & Pure",
       desc: "We prioritize safety with advanced filtering systems, ensuring your browsing experience remains professional.",
      },
      {
       icon: Heart,
       title: "Community First",
       desc: "Powered by the Wallhaven community, we bring human-curated art to your digital workspace.",
      },
     ].map((feature, i) => (
      <div key={i} className="p-8 rounded-3xl glass-card noise animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
       <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-6">
        <feature.icon size={24} />
       </div>
       <h3 className="text-xl font-black mb-4 tracking-tight">{feature.title}</h3>
       <p className="text-white/40 text-sm font-medium leading-relaxed">
        {feature.desc}
       </p>
      </div>
     ))}
    </div>

    <div className="max-w-4xl mx-auto p-12 rounded-[3rem] glass-card noise border border-white/10 text-center animate-fade-in-up">
     <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/40 mb-8">
      The Mission
     </div>
     <h2 className="text-3xl font-black mb-6 tracking-tight">Focus on the Pixels.</h2>
     <p className="text-white/40 font-medium leading-relaxed mb-10">
      We believe that your digital environment directly impacts your creativity and focus. Lumina Walls isn't just an image gallery—it's a tool for creators, developers, and enthusiasts to personalize their core experience.
     </p>
     <div className="flex items-center justify-center gap-2">
      <div className="w-10 h-[1px] bg-white/10" />
      <Aperture className="text-accent" size={24} />
      <div className="w-10 h-[1px] bg-white/10" />
     </div>
    </div>
   </div>
  </main>
 );
}
