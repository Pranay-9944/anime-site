"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Product } from "../data/products";
import { RefObject } from "react";

interface ProductTextOverlaysProps {
  product: Product;
  containerRef: RefObject<HTMLDivElement>;
}

export default function ProductTextOverlays({ product, containerRef }: ProductTextOverlaysProps) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Fade transformations mapping to scroll 0 -> 1 over the 500vh container
  const o1 = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.25], [1, 1, 0, 0]);
  const o2 = useTransform(scrollYProgress, [0.2, 0.3, 0.45, 0.5], [0, 1, 1, 0]);
  const o3 = useTransform(scrollYProgress, [0.45, 0.55, 0.7, 0.75], [0, 1, 1, 0]);
  const o4 = useTransform(scrollYProgress, [0.7, 0.8, 0.95, 1], [0, 1, 1, 0]);

  const t1 = useTransform(scrollYProgress, [0, 0.2], [40, -40]);
  const t2 = useTransform(scrollYProgress, [0.2, 0.5], [40, -40]);
  const t3 = useTransform(scrollYProgress, [0.45, 0.75], [40, -40]);
  const t4 = useTransform(scrollYProgress, [0.7, 1], [40, -40]);

  return (
    <div className="absolute inset-0 z-20 pointer-events-none">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center pt-24 pb-24 px-6 md:px-12 pointer-events-none">
        
        {/* Section 1 */}
        <motion.div style={{ opacity: o1, y: t1 }} className="absolute top-24 md:top-32 left-6 md:left-12 flex flex-col items-start text-left max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white drop-shadow-lg mb-4">
            {product.section1.title}
          </h1>
          <p className="text-2xl md:text-3xl text-white/90 drop-shadow flex max-w-lg text-balance">
            {product.section1.subtitle}
          </p>
        </motion.div>

        {/* Section 2 */}
        <motion.div style={{ opacity: o2, y: t2 }} className="absolute bottom-24 md:bottom-32 right-6 md:right-12 flex flex-col items-end text-right max-w-2xl">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white drop-shadow-lg mb-6">
            {product.section2.title}
          </h2>
          <p className="text-xl md:text-2xl font-medium text-white/95 drop-shadow max-w-lg">
            {product.section2.subtitle}
          </p>
        </motion.div>

        {/* Section 3 */}
        <motion.div style={{ opacity: o3, y: t3 }} className="absolute top-24 md:top-32 right-6 md:right-12 flex flex-col items-end text-right max-w-2xl">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white drop-shadow-lg mb-6">
            {product.section3.title}
          </h2>
          <p className="text-xl md:text-2xl font-medium text-white/95 drop-shadow max-w-lg">
            {product.section3.subtitle}
          </p>
        </motion.div>

        {/* Section 4 */}
        <motion.div style={{ opacity: o4, y: t4 }} className="absolute bottom-24 md:bottom-32 left-6 md:left-12 flex flex-col items-start text-left max-w-2xl text-balance">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white drop-shadow-lg mb-6 w-full max-w-xl">
            {product.section4.title}
          </h2>
          {product.section4.subtitle && (
            <p className="text-xl md:text-2xl font-medium text-white/95 drop-shadow max-w-lg">
              {product.section4.subtitle}
            </p>
          )}
        </motion.div>

      </div>
    </div>
  );
}
