export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-[100] p-8 flex justify-between items-center mix-blend-difference">
      <div className="font-black italic text-xl tracking-tighter text-white">SINGULARITY</div>
      <div className="flex gap-8 font-mono text-[10px] tracking-widest text-white/60">
        <a href="#about" className="hover:text-white transition-colors">ABOUT</a>
        <a href="#labs" className="hover:text-white transition-colors">LABS</a>
        <a href="#contact" className="hover:text-white transition-colors">CONTACT</a>
      </div>
    </nav>
  );
}