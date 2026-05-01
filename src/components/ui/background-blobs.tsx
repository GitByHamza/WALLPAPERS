"use client";

import { motion } from "framer-motion";

export function BackgroundBlobs() {
 return (
  <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none noise">
   <motion.div
    animate={{
     x: [0, 50, 0],
     y: [0, -50, 0],
     scale: [1, 1.1, 1],
    }}
    transition={{
     duration: 15,
     repeat: Infinity,
     ease: "easeInOut",
    }}
    className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-accent/10 rounded-full blur-[120px] dark:mix-blend-screen mix-blend-multiply"
   />
   <motion.div
    animate={{
     x: [0, -80, 0],
     y: [0, 80, 0],
     scale: [1, 1.2, 1],
    }}
    transition={{
     duration: 25,
     repeat: Infinity,
     ease: "easeInOut",
     delay: 2,
    }}
    className="absolute top-[30%] right-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] dark:mix-blend-screen mix-blend-multiply"
   />
   <motion.div
    animate={{
     x: [0, 100, 0],
     y: [0, 100, 0],
     scale: [1, 1.1, 1],
    }}
    transition={{
     duration: 20,
     repeat: Infinity,
     ease: "easeInOut",
     delay: 5,
    }}
    className="absolute bottom-[-20%] left-[10%] w-[900px] h-[900px] bg-purple-500/5 rounded-full blur-[150px] dark:mix-blend-screen mix-blend-multiply"
   />
  </div>
 );
}
