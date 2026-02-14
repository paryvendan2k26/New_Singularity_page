import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { labs } from '../data/labs';
import { useNavigate } from 'react-router-dom';
import { DottedSurface } from '../components/ui/dotted-surface';

gsap.registerPlugin(ScrollTrigger);

export default function Hub() {
  const container = useRef(null);
  const navigate = useNavigate();

  useGSAP(() => {
    const sections = container.current.querySelectorAll(".scroll-node");
    
    sections.forEach((section, i) => {
      const isLab = section.classList.contains('lab-node');
      const isHero = i === 0;
      const isLast = i === sections.length - 1;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          // 400vh provides a very slow, smooth travel distance
          start: `${i * 400}vh`, 
          end: `${(i + 1) * 400}vh`,
          scrub: 2, 
        }
      });

      if (isHero) {
        // Hero is visible immediately, then drifts up and away
        tl.to(section, { opacity: 0, y: -200, scale: 1.1, filter: "blur(10px)", duration: 3 });
      } else if (isLast) {
        // Contact section fades in and stays at the bottom
        tl.fromTo(section, 
          { opacity: 0, y: 100 }, 
          { opacity: 1, y: 0, duration: 3 }
        );
      } else {
        // Lab cards emergence and departure
        tl.fromTo(section, 
          { opacity: 0, y: 200, scale: 0.7, filter: "blur(20px)" }, 
          { 
            opacity: 1, y: 0, scale: 0.85, filter: "blur(0px)",
            x: isLab ? (i % 2 === 0 ? -250 : 250) : 0, 
            duration: 4 
          }
        )
        .to(section, { opacity: 1, duration: 4 }) // Hold
        .to(section, { opacity: 0, y: -200, scale: 1.1, filter: "blur(20px)", duration: 4 });
      }
    });
  }, { scope: container });

  return (
    <div ref={container} className="relative bg-[#020203] h-[4000vh] overflow-hidden text-white">
      
      {/* 3D DOTTED BACKGROUND */}
      <DottedSurface className="opacity-30" />

      {/* TOP NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-[100] p-10 flex justify-between items-center mix-blend-difference">
        <div className="font-black italic text-2xl tracking-tighter">SINGULARITY</div>
        <div className="flex gap-10 font-mono text-[10px] tracking-[0.3em] opacity-60">
          <span className="hover:opacity-100 cursor-pointer transition-opacity">MISSION</span>
          <span className="hover:opacity-100 cursor-pointer transition-opacity">LABS</span>
          <span className="hover:opacity-100 cursor-pointer transition-opacity">CONTACT</span>
        </div>
      </nav>

      <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
        
        {/* 1. HERO - Visible on Start */}
        <div className="scroll-node absolute flex flex-col items-center">
          <h1 className="text-[14vw] font-black italic tracking-tighter uppercase leading-none">
            Singularity
          </h1>
          <p className="font-mono text-xs tracking-[2.5em] text-pink-300/30 mt-12 uppercase">
             Departure_Point // 001
          </p>
        </div>

        {/* 2. ABOUT */}
        <div className="scroll-node absolute max-w-4xl text-center px-10">
          <p className="text-4xl md:text-6xl leading-tight font-serif italic text-pink-100/70">
            "The best way to predict the future is to invent it."
          </p>
        </div>

        {/* 3-9. LAB CARDS */}
        {labs.map((lab, i) => (
          <div key={lab.id} onClick={() => navigate(`/lab/${lab.id}`)}
            className="scroll-node lab-node absolute w-[450px] cursor-pointer pointer-events-auto group">
            <div className="p-16 border border-white/10 bg-black/40 backdrop-blur-3xl group-hover:border-pink-500/20 transition-all duration-1000 shadow-2xl">
               <span className="text-[10px] font-mono text-teal-300/30 uppercase tracking-[0.5em] mb-8 block italic">
                 Sector_Archive // 0{i+1}
               </span>
               <h2 className="text-6xl font-black italic uppercase mb-8 tracking-tighter group-hover:text-pink-100 transition-colors">
                 {lab.name}
               </h2>
               <p className="text-xs font-mono text-white/40 uppercase leading-loose mb-12">
                 {lab.focus}
               </p>
               <div className="text-[10px] font-bold border-t border-white/5 pt-8 text-white/20 group-hover:text-teal-300 transition-colors tracking-[0.3em]">
                 ACCESS_RESEARCH_DATA →
               </div>
            </div>
          </div>
        ))}

        {/* 10. CONTACT US */}
        <div className="scroll-node absolute flex flex-col items-center text-center">
          <h2 className="text-[10vw] font-black italic uppercase tracking-tighter mb-10">Contact_Us</h2>
          <p className="text-2xl font-mono text-white/40 mb-16 uppercase tracking-[1em]">Event_Horizon_Reached</p>
          <button className="px-16 py-6 border-2 border-white text-white font-black uppercase text-xs tracking-widest hover:bg-white hover:text-black transition-all">
            Send Transmission
          </button>
        </div>
      </div>

      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,2,3,0.9)_100%)] z-10" />
    </div>
  );
}