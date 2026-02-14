import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Hero() {
  const container = useRef();

  useGSAP(() => {
    const tl = gsap.timeline();
    
    // Animation for the main quote
    tl.from(".animate-text", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
    })
    // Subtle glow pulse for the accent text
    .to(".glow-text", {
      textShadow: "0px 0px 20px rgba(0, 242, 255, 0.6)",
      duration: 1.5,
      repeat: -1,
      yoyo: true
    });
  }, { scope: container });

  return (
    <section ref={container} className="relative py-24 px-6 flex flex-col items-center overflow-hidden">
      {/* Background Decorative Element (The "Singularity" Blur) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] -z-10" />

      <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-[0.9] text-center max-w-5xl">
        <span className="animate-text inline-block">THE BEST WAY TO</span> <br />
        <span className="animate-text inline-block">PREDICT THE</span> <br />
        <span className="animate-text inline-block glow-text text-accent">FUTURE</span> <br />
        <span className="animate-text inline-block">IS TO INVENT IT.</span>
      </h1>
      
      <p className="animate-text mt-8 text-gray-400 font-mono tracking-widest text-sm uppercase">
        [ Experimenting at the Event Horizon ]
      </p>
    </section>
  );
}