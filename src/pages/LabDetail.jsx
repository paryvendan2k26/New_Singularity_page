import { useParams, useNavigate } from 'react-router-dom';
import { labs } from '../data/labs';

export default function LabDetail() {
  const { labId } = useParams();
  const navigate = useNavigate();
  const lab = labs.find(l => l.id === labId);

  if (!lab) return <div className="bg-black min-h-screen" />;

  return (
    <div className="min-h-screen bg-[#080a08] text-[#4ade80] p-6 md:p-20 font-mono selection:bg-[#4ade80] selection:text-black">
      {/* SCANLINES EFFECT */}
      <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] z-50 bg-[length:100%_4px]" />

      <div className="max-w-4xl mx-auto border-2 border-[#4ade80]/20 p-8 md:p-12 bg-[#0c0f0c] shadow-[0_0_50px_rgba(0,0,0,0.8)] relative">
        
        <button onClick={() => navigate('/')} className="text-[10px] mb-12 hover:bg-[#4ade80] hover:text-black px-3 py-1 transition-colors border border-[#4ade80]/30 uppercase">
           {'< Return_to_Flight'}
        </button>

        <header className="border-b-2 border-[#4ade80]/20 pb-10 mb-12">
          <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-4">{lab.name}</h1>
          <div className="flex justify-between text-[10px] opacity-50 tracking-widest">
             <span>ENTRY_CODE: SIG_{lab.id.toUpperCase()}</span>
             <span className="text-right italic">STRICTLY_CONFIDENTIAL</span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="md:col-span-2 space-y-12">
            <section>
              <h3 className="text-[11px] font-black bg-[#4ade80] text-black px-2 inline-block mb-6 uppercase">Mission_Brief</h3>
              <p className="text-sm leading-relaxed opacity-80 uppercase italic tracking-tight">{lab.description}</p>
            </section>

            <section className="border-l-2 border-[#4ade80]/20 pl-6 space-y-4">
              <h3 className="text-[10px] font-black uppercase opacity-40">Primary_Research_Focus</h3>
              <p className="text-2xl font-bold uppercase tracking-tighter">{lab.focus}</p>
            </section>
          </div>

          <aside className="space-y-8">
            <div className="border border-[#4ade80]/20 p-4 aspect-square flex flex-col items-center justify-center text-center bg-black/50">
               <div className="w-12 h-12 border-2 border-[#4ade80]/30 border-t-[#4ade80] rounded-full animate-spin mb-4" />
               <span className="text-[9px] opacity-40 tracking-widest uppercase animate-pulse">Analyzing...</span>
            </div>
            <p className="text-[9px] opacity-30 leading-relaxed italic uppercase">
              All data contained within this dossier is the property of the Singularity collective. 
            </p>
          </aside>
        </div>

        <footer className="mt-20 pt-8 border-t border-[#4ade80]/20 flex justify-between items-center opacity-40 text-[9px]">
           <span className="font-black italic uppercase">The Singularity // SRMAP</span>
           <span className="text-right">AUTHORIZED_ACCESS_ONLY</span>
        </footer>
      </div>
    </div>
  );
}