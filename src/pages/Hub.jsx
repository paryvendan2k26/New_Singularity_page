import Hero from '../components/Hero';
import { labs } from '../data/labs';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function Hub() {
  return (
    <main>
      <Hero />
      
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="flex justify-between items-end mb-12 border-b border-white/10 pb-4">
          <h2 className="text-2xl font-mono uppercase tracking-tighter">Lab_Divisions.v2</h2>
          <span className="text-xs text-gray-500 font-mono">SCROLL_TO_EXPLORE</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {labs.map((lab) => (
            <Link 
              key={lab.id} 
              to={`/lab/${lab.id}`}
              className="group relative p-8 bg-muted/30 border border-white/5 hover:border-accent/50 transition-all duration-500 overflow-hidden"
            >
              {/* Hover Background Effect */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" 
                style={{ backgroundColor: lab.color }}
              />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-[2px]" style={{ backgroundColor: lab.color }} />
                  <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all" />
                </div>
                
                <h3 className="text-2xl font-bold mb-2">{lab.name}</h3>
                <p className="text-gray-400 text-sm font-mono uppercase tracking-wide">{lab.focus}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}