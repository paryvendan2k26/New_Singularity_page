import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { useGSAP } from '@gsap/react';

import { labs } from '../data/labs';
import { ClipPathLinks } from '../components/ui/clip-path-links';
import { FallingPattern } from '../components/ui/falling-pattern';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, DrawSVGPlugin);

const CLOUDINARY_BASE = "https://res.cloudinary.com/djtemmctt/image/upload/q_auto:eco,f_auto/";
const CLOUDINARY_BASEVID = "https://res.cloudinary.com/djtemmctt/video/upload/q_auto:eco,f_auto/";

const singularityLogo = "https://res.cloudinary.com/djtemmctt/image/upload/v1771104005/singularity_new_logo_knedxr.png";

export default function Hub() {
  const container = useRef(null);
  const navigate = useNavigate();
  
  // 1. Array to hold all video DOM elements
  const videoRefs = useRef([]);

  // Helper to safely play/pause
  const playVideo = (index) => {
    const vid = videoRefs.current[index];
    if (vid && vid.paused) vid.play().catch(() => {});
  };

  const pauseVideo = (index) => {
    const vid = videoRefs.current[index];
    if (vid && !vid.paused) vid.pause();
  };

  useGSAP(() => {
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.35,
      effects: true,
      normalizeScroll: true,
      ignoreMobileResize: true 
    });

    gsap.from('.draw-path', {
      drawSVG: "0%",
      ease: "power2.out",
      scrollTrigger: {
        trigger: '.hero-heading',
        start: "top center",
        end: "bottom center",
        scrub: 1,
      }
    });

    const cards = gsap.utils.toArray(".card-wrapper");
    
    cards.forEach((card, i) => {
      ScrollTrigger.create({
        trigger: card,
        start: "top 12%",
        endTrigger: ".cards-container",
        end: "bottom 90%",
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,
        
        // --- LOGIC: PAUSE 1st WHEN 3rd SHOWS UP ---
        onEnter: () => {
           // 1. Play current video
           playVideo(i);
           
           // 2. Pause the video from 2 cards ago (e.g., if we are at Card 3, pause Card 1)
           if (i >= 2) {
             pauseVideo(i - 2);
           }
        },
        
        // --- LOGIC: PLAY IT AGAIN IF WE SCROLL BACK UP ---
        onLeaveBack: () => {
           // If we leave Card 3 going UP to Card 2, we should ensure Card 1 is ready to play again
           // because it will be visible behind Card 2.
           if (i >= 2) {
             playVideo(i - 2);
           }
        }
      });

      if (i < cards.length - 1) {
        gsap.to(card, {
          scale: 0.94,
          opacity: 0.3,
          duration: 0.5, 
          ease: "none",
          scrollTrigger: {
            trigger: cards[i + 1],
            start: "top 80%",
            end: "top 12%",
            scrub: true,
          }
        });
      }
    });

  }, { scope: container });

  const handleMediaLoad = () => {
    ScrollTrigger.refresh();
  };

  return (
    <div ref={container} className="bg-black text-white font-sans overflow-hidden">
      
      <div id="smooth-wrapper">
        <div id="smooth-content" style={{ willChange: 'transform' }}>
          
          <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
            <FallingPattern color="rgba(255, 255, 255, 0.15)" />
          </div>

          <nav className="fixed top-0 left-0 w-full z-[100] px-10 py-6 flex justify-between items-center mix-blend-difference">
            <div className="flex items-center gap-4">
              <img src={singularityLogo} alt="Logo" className="w-10 h-10 object-contain" />
              <div className="font-black text-xl tracking-tighter uppercase leading-none">Singularity Student Lab</div>
            </div>
            <div className="flex gap-10 font-mono text-[11px] tracking-[0.3em] opacity-60 uppercase">
              <span>About Us</span>
              <span>Labs</span>
              <span>Events</span>
              <span>Contact</span>
            </div>
          </nav>

          <section className="relative min-h-[150vh] pt-60 flex flex-col items-center">
            <div className="hero-heading-container relative z-10 mix-blend-difference pointer-events-none">
              <h1 className="text-[10vw] font-black tracking-tighter uppercase leading-none text-center hero-heading">
                <span className="relative inline-block">
                  Singularity
                  <svg className="absolute top-1/2 left-[-6%] w-[112%] translate-y-[-50%] rotate-[2deg]" viewBox="0 0 842.14 500">
                    <path className="draw-path" d="M336.2,130.05C261.69,118,16.52,122,20.65,244.29c4.17,123,484.3,299.8,734.57,108.37,244-186.65-337.91-311-546.54-268.47" 
                          fill="none" stroke="white" strokeWidth="8" />
                  </svg>
                </span>
                <br />
                <span className="text-[1vw] tracking-[0.5em] opacity-50 block mt-4 uppercase">{"<Student_Research_Lab/>"}</span>
              </h1>
            </div>

            <div className="parallax-grid grid grid-cols-4 gap-8 w-full px-12 absolute top-1/2 -translate-y-1/2 z-0">
               {[
                 "WhatsApp_Image_2026-02-15_at_2.46.24_AM_aj1qy8.jpg",
                 "WhatsApp_Image_2026-02-15_at_2.46.25_AM_ttclec.jpg",
                 "WhatsApp_Image_2026-02-15_at_2.46.25_AM_1_b5r7lz.jpg",
                 "WhatsApp_Image_2026-02-15_at_2.46.25_AM_2_f2qg5v.jpg"
               ].map((img, idx) => (
                  <img 
                    key={idx}
                    onLoad={handleMediaLoad} 
                    data-speed={`clamp(${2.4 - (idx * 0.3)})`}
                    className="h-[70vh] object-cover mt-80" 
                    src={`${CLOUDINARY_BASE}v1771104005/${img}`} 
                    alt="" 
                  />
               ))}
            </div>
          </section>

          <div className="cards-container relative w-full max-w-4xl mx-auto px-6 py-[20vh] z-20">
            {labs.map((lab, i) => (
              <div key={lab.id} className="card-wrapper w-full mb-[80vh] last:mb-0">
                {/* Kept bg-black/95 for performance */}
                <div className="relative w-full h-[550px] overflow-hidden border border-white/10 bg-black/95 group transition-all duration-700 hover:border-white/30 shadow-2xl">
                  
                  <div className="absolute inset-0 z-0">
                    {lab.video_id ? (
                      <video
                        ref={(el) => (videoRefs.current[i] = el)} // Assign ref
                        onLoadedData={handleMediaLoad}
                        src={`${CLOUDINARY_BASEVID}/${lab.video_id}.mp4`}
                        autoPlay
                        loop
                        muted
                        playsInline
                        style={{ willChange: 'transform' }} 
                        className="w-full h-full object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-40 transition-all duration-1000 scale-105 group-hover:scale-100"
                      />
                    ) : (
                      <img 
                        onLoad={handleMediaLoad}
                        src={`${CLOUDINARY_BASE}/${lab.image_id || 'placeholder_lab'}.png`} 
                        alt={lab.name}
                        className="w-full h-full object-cover opacity-30 grayscale group-hover:grayscale-0 group-hover:opacity-50 transition-all duration-1000"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
                  </div>

                  <div className="relative z-10 h-full p-16 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-mono text-white/40 uppercase tracking-[0.4em] block">Archive // 0{i+1}</span>
                      <img src={singularityLogo} alt="" className="w-8 h-8 opacity-20" />
                    </div>

                    <div>
                      <h2 className="text-6xl font-black uppercase tracking-tighter leading-none mb-6">{lab.name}</h2>
                      <p className="text-sm font-mono text-white/60 uppercase leading-relaxed max-w-md">{lab.focus}</p>
                    </div>

                    <div 
                      onClick={() => navigate(`/labs/${lab.id}`)}
                      className="text-[10px] font-bold border-t border-white/10 pt-8 text-white/20 tracking-[0.3em] flex justify-between items-center group-hover:text-white transition-colors cursor-pointer"
                    >
                      <span>VIEW_LIVE_FEED</span>
                      <span className="text-lg">→</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <section className="relative min-h-[70vh] flex flex-col items-center justify-center z-30 px-6 py-10 bg-black">
            <h2 className="text-[5vw] font-black uppercase tracking-tighter mb-16 leading-none">Ping Us</h2>
            <div className="w-full max-w-5xl">
              <ClipPathLinks />
            </div>
          </section>

          <div className="fixed bottom-4 left-4 z-[110] pointer-events-none">
             <img src={`${CLOUDINARY_BASE}v1771106322/Screenshot_from_2026-02-15_03-27-52_abg98x.png`}  alt="" className="w-20 md:w-50 h-auto object-contain opacity-50 grayscale hover:opacity-100 transition-all duration-500 rounded-sm" />
          </div>

          <div className="h-[2vh]" />
        </div> 
      </div> 
    </div>
  );
}