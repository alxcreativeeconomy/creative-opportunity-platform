import React, { useState, useEffect } from 'react';
import { Loader2, Menu, Bell, UserCircle, Info } from 'lucide-react';
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
  const [verificationFilter, setVerificationFilter] = useState('All');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsSidebarOpen(true);
      else setIsSidebarOpen(false);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
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

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-slate-900 font-sans overflow-hidden">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isSidebarOpen={isSidebarOpen} 
        setIsSidebarOpen={setIsSidebarOpen} 
      />

      <main className="flex-1 flex flex-col h-full overflow-hidden relative z-10 w-full">
        {/* Executive Glass Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6 lg:px-10 z-20 sticky top-0">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2.5 text-slate-500 hover:bg-slate-100 hover:text-emerald-600 rounded-xl transition-all"
            >
              <Menu size={22}/>
            </button>
            <div className="h-8 w-[1px] bg-slate-200 hidden md:block"></div>
            <div>
              <h1 className="text-xl lg:text-2xl font-black text-slate-800 tracking-tight">
                {activeTab === 'dashboard' && 'Executive Overview'}
                {activeTab === 'search' && !selectedOpportunity && 'Opportunity Matrix'}
                {activeTab === 'search' && selectedOpportunity && 'Verification Intelligence'}
              </h1>
              <p className="hidden md:block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-0.5">
                ALX Creative Economy Operational Node
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 lg:gap-6">
            <div className="hidden xl:flex flex-col items-end">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">System Health</p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]"></span>
                <span className="text-xs font-bold text-slate-600">Sync Active: {lastUpdated}</span>
              </div>
            </div>
            <div className="h-8 w-[1px] bg-slate-200 hidden md:block"></div>
            <button className="p-2.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all relative">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="flex items-center gap-3 p-1.5 pr-4 bg-slate-100 hover:bg-slate-200 rounded-full transition-all group">
              <UserCircle size={32} className="text-slate-400 group-hover:text-emerald-600" />
              <span className="text-xs font-black text-slate-700 hidden lg:block">OPS BOSS</span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <div className="max-w-[1600px] mx-auto p-6 lg:p-10">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
                <div className="relative">
                  <Loader2 className="animate-spin text-emerald-600" size={60} />
                  <div className="absolute inset-0 bg-emerald-500/10 blur-xl rounded-full"></div>
                </div>
                <p className="text-slate-400 font-black uppercase tracking-[0.3em] animate-pulse text-xs">Calibrating Intelligence Streams...</p>
              </div>
            ) : (
              <>
                {activeTab === 'dashboard' && <Dashboard onSelectDeal={handleSelectOpportunity} />}

                {activeTab === 'search' && !selectedOpportunity && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
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
                  </div>
                )}

                {activeTab === 'search' && selectedOpportunity && (
                  <div className="animate-in zoom-in-95 fade-in duration-500">
                    <VerificationReport 
                      op={selectedOpportunity} 
                      onBack={() => setSelectedOpportunity(null)} 
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Sticky Disclaimer Footer */}
        <footer className="shrink-0 bg-white/80 backdrop-blur-md border-t border-slate-200 px-6 lg:px-10 py-3 z-20">
          <div className="max-w-[1600px] mx-auto flex items-start gap-3">
            <div className="shrink-0 mt-0.5">
              <Info size={14} className="text-emerald-500" />
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              <span className="font-bold text-slate-500">Heads up:</span> Opportunities listed here are sourced from public and partner databases and may require manual outreach to verify current availability. 
              We recommend confirming details directly with the relevant parties before taking action. 
              Please also note that some external links may have moved or been taken down by their site owners — if you hit a dead link, it's worth searching for the opportunity directly.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;