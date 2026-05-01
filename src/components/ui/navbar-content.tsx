"use client";

import Link from "next/link";
import { Aperture } from "lucide-react";
import { SearchForm } from "./search-form";
import { NsfwToggle } from "./nsfw-toggle";
import { ThemeToggle } from "./theme-toggle";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface NavbarContentProps {
 isNsfw: boolean;
}

export function NavbarContent({ isNsfw }: NavbarContentProps) {
 const [isScrolled, setIsScrolled] = useState(false);
 const { scrollY } = useScroll();

 useMotionValueEvent(scrollY, "change", (latest) => {
  setIsScrolled(latest > 50);
 });

 return (
  <motion.nav
   initial={false}
   animate={{
    width: isScrolled ? "95%" : "100%",
    maxWidth: isScrolled ? "1280px" : "100%",
    top: isScrolled ? "24px" : "0px",
    borderRadius: isScrolled ? "32px" : "0px",
   }}
   transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
   className={cn(
    "fixed left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-8 transition-all duration-500",
    isScrolled 
     ? "glass-card border-border shadow-2xl h-16" 
     : "bg-background/80 backdrop-blur-md border-b border-border/50 h-20"
   )}
  >
   <Link href="/" className="flex items-center gap-2 group">
    <motion.div 
     animate={{ scale: isScrolled ? 1 : 1.1 }}
     className="p-2 rounded-xl bg-gradient-to-tr from-accent to-blue-500 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-[0_0_20px_rgba(var(--accent),0.3)]"
    >
     <Aperture className="w-5 h-5 text-white" />
    </motion.div>
    <span className="text-2xl font-black font-heading bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60 tracking-tighter">
     Lumina
    </span>
   </Link>

   <div className="flex-1 max-w-md mx-12 hidden md:block">
    <SearchForm />
   </div>

   <div className="flex items-center gap-4 md:gap-8">
    <div className="flex items-center gap-6 hidden sm:flex">
     <Link href="/popular" className="text-sm font-bold text-muted-foreground hover:text-foreground transition-all">
      Popular
     </Link>
     <Link href="/new" className="text-sm font-bold text-muted-foreground hover:text-foreground transition-all">
      New
     </Link>
     <Link href="/mobile" className="text-sm font-bold text-muted-foreground hover:text-foreground transition-all">
      Mobile
     </Link>
    </div>
    <div className="h-4 w-[1px] bg-border mx-2 hidden sm:block" />
    <div className="flex items-center gap-3">
     <NsfwToggle initialValue={isNsfw} />
     <ThemeToggle />
    </div>
   </div>
  </motion.nav>
 );
}
