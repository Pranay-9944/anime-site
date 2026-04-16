"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { products } from "../data/products";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductBottleScroll from "../components/ProductBottleScroll";
import ProductTextOverlays from "../components/ProductTextOverlays";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const activeProduct = products[currentIndex];
  
  // Set global gradient for smooth theme transition
  useEffect(() => {
    document.documentElement.style.setProperty("--product-gradient", activeProduct.gradient);
    document.body.style.backgroundColor = activeProduct.themeColor;
  }, [activeProduct]);

  // Reset scroll when switching flavor
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Staggered list variants for Details Section
  const detailsVariants: import("framer-motion").Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen relative font-sans w-full overflow-x-clip">
        
        {/* Main Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProduct.id}
            initial={{ opacity: 0, filter: "blur(20px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(20px)" }}
            transition={{ duration: 1 }}
            className="w-full relative"
          >
            {/* Scrollytelling Section */}
            <div ref={scrollContainerRef} className="relative w-full">
              <ProductBottleScroll folderPath={activeProduct.folderPath} />
              <ProductTextOverlays product={activeProduct} containerRef={scrollContainerRef} />
            </div>

            {/* Content that appears after scroll */}
            <div className="relative z-30 bg-neutral-950/80 backdrop-blur-2xl text-white pt-32 pb-24 border-t border-white/10 rounded-t-[3rem] -mt-[100vh]">
              <div className="max-w-7xl mx-auto px-6 md:px-12">
                
                {/* Details Section */}
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={detailsVariants}
                  className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-40 items-center"
                >
                  <div>
                    <h3 className="text-sm uppercase tracking-[0.3em] text-white/50 mb-4">Deep Dive</h3>
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                      {activeProduct.detailsSection.title}
                    </h2>
                    <p className="text-xl text-neutral-300 leading-relaxed mb-8">
                      {activeProduct.detailsSection.description}
                    </p>
                    
                    <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
                      {activeProduct.stats.map((stat, i) => (
                        <div key={i}>
                          <div className="text-3xl font-bold mb-1" style={{ color: activeProduct.themeColor }}>
                            {stat.val}
                          </div>
                          <div className="text-sm text-neutral-400 font-medium uppercase tracking-wider">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Freshness Card */}
                  <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10" style={{ color: activeProduct.themeColor }}>
                        ✧
                      </div>
                      {activeProduct.freshnessSection.title}
                    </h3>
                    <p className="text-neutral-300 leading-relaxed relative z-10">
                      {activeProduct.freshnessSection.description}
                    </p>
                  </div>
                </motion.div>

                {/* Buy Now Section */}
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={detailsVariants}
                  className="bg-neutral-900 rounded-[2.5rem] border border-white/10 p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-2xl"
                >
                  <div className="absolute -top-64 -right-64 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 pointer-events-none" style={{ backgroundColor: activeProduct.themeColor }} />
                  
                  <div className="flex-1">
                    <h2 className="text-4xl md:text-5xl font-bold mb-2">Taste {activeProduct.name}</h2>
                    <p className="text-xl text-neutral-400 mb-8">{activeProduct.buyNowSection.deliveryPromise}</p>
                    
                    <div className="flex flex-wrap gap-3 mb-10">
                      {activeProduct.buyNowSection.processingParams.map((param, i) => (
                        <div key={i} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm font-medium">
                          <Check size={16} style={{ color: activeProduct.themeColor }} />
                          {param}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="w-full md:w-auto bg-black/40 backdrop-blur-md rounded-3xl p-8 border border-white/5 flex flex-col items-center min-w-[320px] shadow-xl">
                    <div className="text-5xl font-bold mb-2 tracking-tighter" style={{ color: activeProduct.themeColor }}>
                      {activeProduct.buyNowSection.price}
                    </div>
                    <div className="text-sm text-neutral-400 mb-8">
                      {activeProduct.buyNowSection.unit}
                    </div>
                    <button 
                      className="w-full py-4 rounded-xl font-bold text-lg text-black transition-transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 shadow-lg"
                      style={{ backgroundColor: activeProduct.themeColor }}
                    >
                      Add to Cart
                    </button>
                    <p className="text-xs text-neutral-500 mt-4 text-center max-w-[200px]">
                      {activeProduct.buyNowSection.returnPolicy}
                    </p>
                  </div>
                </motion.div>

              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Global Navigation Controls */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-black/40 backdrop-blur-xl border border-white/10 p-2 rounded-full shadow-2xl">
          <button 
            onClick={handlePrev}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          
          <div className="flex gap-2 px-2">
            {products.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => setCurrentIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-500 ${
                  idx === currentIndex ? "w-8 bg-white" : "bg-white/30 hover:bg-white/50"
                }`}
                style={{ backgroundColor: idx === currentIndex ? p.themeColor : undefined }}
                aria-label={`Go to ${p.name}`}
              />
            ))}
          </div>

          <button 
            onClick={handleNext}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        </div>

      </main>
      <Footer />
    </>
  );
}
