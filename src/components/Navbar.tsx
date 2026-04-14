"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Zap } from "lucide-react";

export default function Navbar() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.7]);
  const blur = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(12px)"]);
  const py = useTransform(scrollY, [0, 100], ["1.5rem", "1rem"]);

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 transition-all border-b border-white/5 mx-auto"
      style={{ backgroundColor: `rgba(0, 0, 0, ${bgOpacity.get()})`, backdropFilter: blur }}
    >
      <motion.div 
        style={{ paddingTop: py, paddingBottom: py }}
        className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center"
      >
        <div></div>
        <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-medium px-6 py-2 rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]">
          Order Now
        </button>
      </motion.div>
    </motion.nav>
  );
}
