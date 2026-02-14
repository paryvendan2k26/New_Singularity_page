import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoadingScreen } from './components/ui/loading-screen';
import Hub from './pages/Hub';
import LabDetail from './pages/LabDetail';

function App() {
  const [isEntryComplete, setIsEntryComplete] = useState(false);

  return (
    <Router>
      <main className="bg-black min-h-screen text-white overflow-x-hidden">
        {!isEntryComplete ? (
          <LoadingScreen onEnter={() => setIsEntryComplete(true)} />
        ) : (
          /* Smooth entry animation for the entire Hub */
          <div className="animate-in fade-in zoom-in-90 duration-1000 ease-out">
            <Routes>
              <Route path="/" element={<Hub />} />
              <Route path="/lab/:labId" element={<LabDetail />} />
            </Routes>
          </div>
        )}
      </main>
    </Router>
  );
}

export default App;