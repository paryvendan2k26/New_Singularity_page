import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-6 border-b border-white/10 bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <Link to="/" className="text-xl font-black tracking-tighter hover:text-accent transition-colors">
        THE <span className="text-accent">SINGULARITY</span>
      </Link>
      
      <div className="flex items-center gap-6">
        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest hidden md:block">
          Powered by Microsoft Student Community - SRMAP
        </span>
        <div className="h-8 w-[1px] bg-white/10 hidden md:block"></div>
        <button className="text-sm font-medium hover:text-accent transition-colors">
          About
        </button>
      </div>
    </nav>
  );
}