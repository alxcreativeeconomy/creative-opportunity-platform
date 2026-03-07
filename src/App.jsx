import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { DATABASE_SOURCE, REGION_TABS } from './data/opportunities';
import { getVerificationData } from './data/registry';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import OpportunityMatrix from './components/OpportunityMatrix';
import VerificationReport from './components/VerificationReport';
import FilterBar from './components/FilterBar';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeRegion, setActiveRegion] = useState('Africa');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [opportunities, setOpportunities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  
  const [selectedSector, setSelectedSector] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [showClosed, setShowClosed] = useState(false);
  const [verificationFilter, setVerificationFilter] = useState('All');

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      const sorted = [...DATABASE_SOURCE].sort((a, b) => b.matchScore - a.matchScore);
      setOpportunities(sorted);
      setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredOpportunities = opportunities.filter(op => {
    if (op.region !== activeRegion) return false;
    if (showClosed) return op.status === 'Closed';
    if (op.status === 'Closed') return false;
    if (selectedSector !== 'All' && op.sector !== selectedSector) return false;
    if (selectedLocation !== 'All Locations' && op.country && !op.country.includes(selectedLocation)) return false;
    if (verificationFilter !== 'All') {
      const vd = getVerificationData(op.id);
      if (!vd || vd.verificationLevel.toUpperCase() !== verificationFilter.toUpperCase()) return false;
    }
    const q = searchQuery.toLowerCase();
    return !q || 
           op.title.toLowerCase().includes(q) || 
           op.description.toLowerCase().includes(q) || 
           op.source.toLowerCase().includes(q);
  });

  const handleSelectOpportunity = (op) => {
    setSelectedOpportunity(op);
    setActiveTab('search');
  };

  const handleBackToMatrix = () => {
    setSelectedOpportunity(null);
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isSidebarOpen={isSidebarOpen} 
        setIsSidebarOpen={setIsSidebarOpen} 
      />

      <main className="flex-1 flex flex-col h-full overflow-hidden relative z-10">
        <header className="h-20 bg-white/60 backdrop-blur-xl border-b border-slate-200 flex items-center justify-between px-8 z-20">
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">
            {activeTab === 'dashboard' && 'Executive Intelligence Overview'}
            {activeTab === 'search' && !selectedOpportunity && 'Strategic Opportunity Matrix'}
            {activeTab === 'search' && selectedOpportunity && 'Verification Report'}
          </h1>
          {lastUpdated && (
             <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
               Last Updated: {lastUpdated}
             </p>
          )}
        </header>

        <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full space-y-4">
              <Loader2 className="animate-spin text-emerald-600" size={48} />
              <p className="text-slate-400 font-bold uppercase tracking-widest animate-pulse">Synchronizing Intelligence...</p>
            </div>
          ) : (
            <>
              {activeTab === 'dashboard' && <Dashboard onSelectDeal={handleSelectOpportunity} />}

              {activeTab === 'search' && !selectedOpportunity && (
                <>
                  <FilterBar 
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    selectedSector={selectedSector}
                    setSelectedSector={setSelectedSector}
                    selectedLocation={selectedLocation}
                    setSelectedLocation={setSelectedLocation}
                    verificationFilter={verificationFilter}
                    setVerificationFilter={setVerificationFilter}
                    activeRegion={activeRegion}
                    setActiveRegion={setActiveRegion}
                  />
                  <OpportunityMatrix 
                    opportunities={filteredOpportunities} 
                    onSelectOpportunity={handleSelectOpportunity} 
                  />
                </>
              )}

              {activeTab === 'search' && selectedOpportunity && (
                <VerificationReport 
                  op={selectedOpportunity} 
                  onBack={handleBackToMatrix} 
                />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
