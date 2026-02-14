'use client'
import { SpiralAnimation } from "./spiral-animation"
import { useState, useEffect } from 'react'

interface LoadingScreenProps {
  onEnter: () => void;
}

export function LoadingScreen({ onEnter }: LoadingScreenProps) {
  const [visible, setVisible] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000)
    return () => clearTimeout(timer)
  }, [])
  
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden bg-black z-[9999] flex items-center justify-center">
      <div className="absolute inset-0">
        <SpiralAnimation />
      </div>
      
      <div className={`relative z-10 transition-all duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        <button 
          onClick={onEnter}
          className="text-white text-2xl tracking-[0.3em] uppercase font-light hover:scale-110 transition-transform animate-pulse border border-white/20 px-8 py-3 backdrop-blur-sm"
        >
          Enter The Singularity
        </button>
      </div>
    </div>
  )
}