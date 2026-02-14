import { useParams, Link } from 'react-router-dom';
import { labs } from '../data/labs';

export default function LabDetail() {
  const { labId } = useParams();
  const lab = labs.find(l => l.id === labId);

  if (!lab) return <div className="p-10 text-red-500">Lab Not Found</div>;

  return (
    <div className="p-10">
      <Link to="/" className="text-accent hover:underline mb-8 block">← Back to Hub</Link>
      <h1 className="text-6xl font-black mb-4" style={{ color: lab.color }}>{lab.name}</h1>
      <div className="bg-muted p-6 rounded-xl border border-white/10">
        <h3 className="text-lg font-mono text-gray-400">RESEARCH_FOCUS:</h3>
        <p className="text-2xl">{lab.focus}</p>
      </div>
    </div>
  );
}