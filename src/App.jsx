import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoadingScreen } from './components/ui/loading-screen';
import Hub from './pages/Hub';
import LabDetail from './pages/LabDetail';
import Navbar from './components/Navbar';

function App() {
  // tracks whether the user has clicked "Enter" on the spiral animation
  const [isEntryComplete, setIsEntryComplete] = useState(false);

  return (
    <Router>
      <main className="bg-black min-h-screen text-white selection:bg-accent selection:text-black">
        {!isEntryComplete ? (
          /* 1. INITIAL LOADING STATE */
          <LoadingScreen onEnter={() => setIsEntryComplete(true)} />
        ) : (
          /* 2. REVEAL MAIN CONTENT */
          <div className="animate-in fade-in zoom-in-95 duration-1000 ease-out">
            <Navbar />
            <Routes>
              {/* Home Hub */}
              <Route path="/" element={<Hub />} />
              
              {/* Individual Lab Pages (Dynamic) */}
              <Route path="/lab/:labId" element={<LabDetail />} />
            </Routes>
          </div>
        )}
      </main>
    </Router>
  );
}

export default App;