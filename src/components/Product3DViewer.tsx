"use client";
import React, { useRef, useState, useEffect } from "react";
import { RotateCw } from "lucide-react";
import Image from "next/image";

interface Product360ViewerProps {
  images: string[];
  autoRotate?: boolean;
  rotationSpeed?: number;
}

export default function Product360Viewer({
  images = [],
  autoRotate = false,
  rotationSpeed = 100,
}: Product360ViewerProps) {
  const [frame, setFrame] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef<number | null>(null);
  const autoRotateRef = useRef<NodeJS.Timeout | null>(null);

  // 🔄 Auto-rotation (optional)
  useEffect(() => {
    if (autoRotate && images.length > 1) {
      autoRotateRef.current = setInterval(() => {
        setFrame((prev) => (prev + 1) % images.length);
      }, rotationSpeed);
    }
    return () => {
      if (autoRotateRef.current) clearInterval(autoRotateRef.current);
    };
  }, [autoRotate, rotationSpeed, images.length]);

  // 🖱️ Mouse & Touch Drag Controls
  const handleStart = (clientX: number) => {
    if (autoRotateRef.current) clearInterval(autoRotateRef.current);
    setIsDragging(true);
    dragStart.current = clientX;
  };

  const handleMove = (clientX: number) => {
    if (!isDragging || dragStart.current === null) return;
    const deltaX = clientX - dragStart.current;
    const sensitivity = 5;

    if (Math.abs(deltaX) > sensitivity) {
      const direction = deltaX > 0 ? -1 : 1;
      setFrame((prev) => (prev + direction + images.length) % images.length);
      dragStart.current = clientX;
    }
  };

  const handleEnd = () => {
    setIsDragging(false);
    dragStart.current = null;
  };

  if (!images.length) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-100 text-gray-400 italic">
        No 360° images available
      </div>
    );
  }

  return (
    <div
      className="relative w-full aspect-[4/3] bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden select-none rounded-xl "
      onMouseDown={(e) => handleStart(e.clientX)}
      onMouseMove={(e) => handleMove(e.clientX)}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={(e) => handleStart(e.touches[0].clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      onTouchEnd={handleEnd}
    >
      <Image
        src={images[frame]}
        alt={`Product view ${frame + 1}`}
        className={`w-full h-full object-cover transition-transform duration-100 ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        fill
        draggable={false}
      />

 
    </div>
  );
}
