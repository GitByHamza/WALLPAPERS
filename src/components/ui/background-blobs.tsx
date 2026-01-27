"use client";

import { motion } from "framer-motion";

export function BackgroundBlobs() {
 return (
  <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
   <motion.div
    animate={{
     x: [0, 100, 0],
     y: [0, -100, 0],
     scale: [1, 1.2, 1],
    }}
    transition={{
     duration: 20,
     repeat: Infinity,
     ease: "linear",
    }}
    className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px] mix-blend-screen"
   />
   <motion.div
    animate={{
     x: [0, -100, 0],
     y: [0, 100, 0],
     scale: [1, 1.3, 1],
    }}
    transition={{
     duration: 25,
     repeat: Infinity,
     ease: "linear",
     delay: 2,
    }}
    className="absolute top-[20%] right-0 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[100px] mix-blend-screen"
   />
   <motion.div
    animate={{
     x: [0, 50, 0],
     y: [0, 50, 0],
     scale: [1, 1.1, 1],
    }}
    transition={{
     duration: 18,
     repeat: Infinity,
     ease: "linear",
     delay: 5,
    }}
    className="absolute bottom-0 left-[20%] w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[120px] mix-blend-screen"
   />
  </div>
 );
}
