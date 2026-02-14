'use client'
import { SpiralAnimation } from "./spiral-animation"
import { useState, useEffect } from 'react'

interface LoadingScreenProps {
  onEnter: () => void;
}

export function LoadingScreen({ onEnter }: LoadingScreenProps) {
  useEffect(() => {
    // Instead of waiting for a click, we wait 4 seconds and then auto-enter
    const autoTimer = setTimeout(() => {
      onEnter();
    }, 4500); // Adjust time to match when your spiral looks best
    
    return () => clearTimeout(autoTimer);
  }, [onEnter]);

  return (
    <div className="fixed inset-0 w-full h-full bg-black z-[9999] flex items-center justify-center">
      <SpiralAnimation />
      <div className="absolute bottom-10 animate-pulse text-xs font-mono tracking-widest text-gray-500 uppercase">
        Initializing Singularity Protocol...
      </div>
    </div>
  );
}