"use client";

import { useEffect, useRef } from "react";
import { useScroll, useTransform, useMotionValueEvent, useSpring } from "framer-motion";

interface ProductBottleScrollProps {
  folderPath: string; // e.g. "/images/mango"
}

export default function ProductBottleScroll({ folderPath }: ProductBottleScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  
  const totalFrames = 192; // Number of ezgif frames

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const frameIndex = useTransform(smoothProgress, [0, 1], [1, totalFrames]);

  useEffect(() => {
    // Preload images
    const images: HTMLImageElement[] = [];
    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const paddedIndex = String(i).padStart(3, "0");
      img.src = `${folderPath}/ezgif-frame-${paddedIndex}.jpg`;
      images.push(img);
    }
    imagesRef.current = images;

    // Initial draw once the first image loads
    images[0].onload = () => {
      renderFrame(1);
    };

    const handleResize = () => {
      if (canvasRef.current && window.innerWidth) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        renderFrame(frameIndex.get());
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [folderPath]);

  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const currentImage = imagesRef.current[Math.round(index) - 1];
    if (currentImage && currentImage.complete) {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw image to "cover" (Fullscreen)
      const hRatio = canvas.width / currentImage.width;
      const vRatio = canvas.height / currentImage.height;
      const ratio = Math.max(hRatio, vRatio);
      const centerShift_x = (canvas.width - currentImage.width * ratio) / 2;
      const centerShift_y = (canvas.height - currentImage.height * ratio) / 2;

      ctx.drawImage(
        currentImage,
        0,
        0,
        currentImage.width,
        currentImage.height,
        centerShift_x,
        centerShift_y,
        currentImage.width * ratio,
        currentImage.height * ratio
      );
    }
  };

  useMotionValueEvent(frameIndex, "change", (latest) => {
    renderFrame(latest);
  });

  return (
    <div ref={containerRef} className="h-[500vh] w-full relative">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-10 pointer-events-none">
        <canvas ref={canvasRef} className="w-full h-full object-contain" />
      </div>
    </div>
  );
}
