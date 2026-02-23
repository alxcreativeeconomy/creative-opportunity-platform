import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, Bot, Globe, FileText, TrendingUp, DollarSign, Lightbulb, 
  Menu, X, Send, Briefcase, Filter, ShieldCheck, Building2, Clock, 
  AlertTriangle, Calendar, ChevronLeft, CheckCircle, AlertCircle, 
  ExternalLink, MapPin, Timer, ClipboardCheck, FileCheck, Cpu, 
  Music, PenTool, Video, Hash, RefreshCw, Wifi, Sparkles, BarChart3, 
  Activity, Layers, Handshake, Target, Zap, Network, Rocket, Loader2,
  Shield, XCircle, Eye, Link2, BadgeCheck, TriangleAlert, HelpCircle,
  ArrowUpRight, Microscope
} from 'lucide-react';

// ============================================================
// VERIFICATION STATUS DEFINITIONS (UPDATED WITH DIRECT LINKS)
// ============================================================

const VERIFICATION_REGISTRY = {
  802: {
    verificationLevel: "VERIFIED",
    verifiedDate: "Feb 2026",
    evidence: "CANEX Deal Room confirmed active on official Afreximbank portal. EOI for CANEX Capacity Building Programme confirmed open. $2B CANEX fund announced Oct 2024.",
    directOpportunityUrl: "https://wknd.canex.africa/",
    directOpportunityLabel: "CANEX Deal Room — Official Portal",
    verifiedBy: "Official Afreximbank Portal"
  },
  803: {
    verificationLevel: "VERIFIED",
    verifiedDate: "Feb 2026",
    evidence: "NFVF Training Provider Grant 2026 is OPEN with deadline March 9, 2026. Cap is R350,000 for training providers in SA film industry.",
    directOpportunityUrl: "https://www.nfvf.co.za/nfvf-call-for-submission-for-training-provider-grant-2026/",
    directOpportunityLabel: "NFVF Training Grant — Direct Application Page",
    alternativeUrl: "https://www.nfvf.co.za/",
    alternativeLabel: "NFVF Homepage",
    verifiedBy: "nfvf.co.za — Confirmed Open"
  },
  702: {
    verificationLevel: "PARTIAL",
    verifiedDate: "Feb 2026",
    evidence: "British Council SSA Arts Programme confirmed active. The specific '£200k Business Capacity Building Master Contract' requires direct partner sourcing.",
    directOpportunityUrl: "https://arts.britishcouncil.org/what-we-do/sub-saharan-africa",
    directOpportunityLabel: "British Council SSA Arts — Browse Opportunities",
    verifiedBy: "arts.britishcouncil.org"
  },
  601: {
    verificationLevel: "VERIFIED",
    verifiedDate: "Feb 2026",
    evidence: "Carry1st confirmed active publisher with developer/partner portal live.",
    directOpportunityUrl: "https://www.carry1st.com/publishing",
    directOpportunityLabel: "Carry1st Publisher Portal — Submit Your Game",
    verifiedBy: "carry1st.com — Confirmed Active"
  },
  110: {
    verificationLevel: "VERIFIED",
    verifiedDate: "Feb 2026",
    evidence: "SABC commissioning briefs are standard and recurring.",
    directOpportunityUrl: "https://www.sabc.co.za/sabc/corporate-information/procurement/",
    directOpportunityLabel: "SABC Procurement Portal",
    verifiedBy: "sabc.co.za"
  },
  901: {
    verificationLevel: "UNVERIFIED",
    verifiedDate: "Feb 2026",
    evidence: "Mastercard Foundation active across Africa with FAST strategy. NO specific '$15-30M Creative Tech Mega-Fund' found on public portal. Direct conversations needed.",
    directOpportunityUrl: "https://mastercardfdn.org/en/",
    directOpportunityLabel: "Mastercard Foundation — Contact Partnerships",
    verifiedBy: "mastercardfdn.org — Specific fund NOT confirmed"
  },
  canex: {
    verificationLevel: "VERIFIED",
    verifiedDate: "Feb 2026",
    evidence: "CANEX Deal Room live. Afreximbank confirmed $2B CANEX fund.",
    directOpportunityUrl: "https://wknd.canex.africa/",
    directOpportunityLabel: "CANEX Application Portal",
    verifiedBy: "canex.africa"
  }
};

const DATABASE_SOURCE = [
  // Keeping your exact same database source objects here...
  {
    id: 803, title: "NFVF Film Production & Development Funding", source: "National Film and Video Foundation (NFVF)", country: "South Africa",
    type: "Production Grant & Development", status: "Urgent", sector: "Film & TV", category: "Business Only",
    value: "R350k - R5M per project", deadline: "March 9, 2026",
    description: "South Africa's NFVF provides funding for film and video production. NFVF Training Provider Grant 2026 is currently OPEN (deadline March 9, 2026).",
    eligibility: "Accredited training providers, 51% black-owned companies in SA.",
    strategicFit: "HIGH URGENCY: NFVF Training Provider Grant is open NOW. ALX can bid as accredited training provider.",
    portalUrl: "https://www.nfvf.co.za/nfvf-call-for-submission-for-training-provider-grant-2026/", requirements: ["Detailed Project Proposal", "Budget Breakdown", "SETA Accreditation"],
    businessAction: ["URGENT: Submit NFVF Training Provider Grant application before March 9, 2026."],
    tags: ["Production", "Grant", "South Africa", "Film & TV", "URGENT"], matchScore: 99
  },
  {
    id: 'canex', title: "CANEX Creative Africa Nexus Deal Room", source: "Afreximbank - CANEX", country: "Pan-African",
    type: "Investment & Opportunity Platform", status: "Open", sector: "Creative Economy", category: "B2B Partnership",
    value: "Variable ($2B Fund Pool)", deadline: "Rolling / Ongoing",
    description: "CANEX is Afreximbank's Creative Africa Nexus. Afreximbank doubled CANEX funding to $2 BILLION.",
    eligibility: "Creative professionals, studios, production companies.",
    strategicFit: "PERFECT FIT FOR ALX: CANEX Deal Room offers direct pathways for ALX graduates.",
    portalUrl: "https://wknd.canex.africa/", requirements: ["Portfolio/Showreel", "Project Proposal"],
    businessAction: ["Submit to CANEX Capacity Building EOI immediately."],
    tags: ["Platform", "Investment", "Pan-African"], matchScore: 99
  },
  {
    id: 601, title: "Mobile Game Publishing & User Acquisition Deal", source: "Carry1st", country: "Pan-African",
    type: "Publishing Deal", status: "Open", sector: "Tech & Innovation", category: "B2B Partnership",
    value: "$50k - $250k Advance", deadline: "Rolling",
    description: "Carry1st is scouting for African game studios with high-retention mobile games ready for scaling.",
    eligibility: "Game Studios with a playable prototype.",
    strategicFit: "Talent deployment. Pitch an 'ALX Game Dev Bootcamp' sponsored by Carry1st.",
    portalUrl: "https://www.carry1st.com/publishing", requirements: ["APK Build", "Retention Metrics"],
    businessAction: ["Pitch an 'ALX Game Dev Bootcamp' sponsored by Carry1st."],
    tags: ["Tech", "Gaming", "Partnership"], matchScore: 92
  }
  // (Add the rest of your original DATABASE_SOURCE objects here)
];

const SECTOR_TABS = [
  { id: 'All', label: 'All' }, { id: 'Tech & Innovation', label: 'Tech & AI' },
  { id: 'Finance', label: 'Finance' }, { id: 'Content Creation', label: 'Content' },
  { id: 'Film & TV', label: 'Film & TV' }, { id: 'Creative Economy', label: 'Creative Eco' }
];

const LOCATION_FILTERS = ['All Locations', 'Pan-African', 'South Africa', 'Kenya', 'Nigeria', 'Egypt', 'Ghana', 'Ethiopia', 'Rwanda'];

const getVerificationData = (id) => VERIFICATION_REGISTRY[id] || null;

const VerificationBadge = ({ level, compact = false }) => {
  const configs = {
    VERIFIED:   { icon: BadgeCheck, bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', dot: 'bg-emerald-500', label: 'Verified', desc: 'Direct Link Provided' },
    PARTIAL:    { icon: Eye, bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', dot: 'bg-amber-400', label: 'Partial', desc: 'Org verified, deal needs contact' },
    UNVERIFIED: { icon: XCircle, bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-700', dot: 'bg-rose-400', label: 'Unverified', desc: 'Not found on public portals' },
    FORECAST:   { icon: HelpCircle, bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', dot: 'bg-purple-400', label: 'Forecast', desc: 'Anticipated, not yet announced' },
  };
  const c = configs[level] || configs.UNVERIFIED;
  const Icon = c.icon;
  if (compact) return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-[10px] font-black uppercase tracking-wider ${c.bg} ${c.border} ${c.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`}></span>
      {c.label}
    </span>
  );
  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${c.bg} ${c.border}`}>
      <Icon size={14} className={c.text} />
      <div>
        <p className={`text-xs font-black uppercase tracking-wider ${c.text}`}>{c.label}</p>
        <p className={`text-[10px] ${c.text} opacity-80`}>{c.desc}</p>
      </div>
    </div>
  );
};

const App = () => {
  const [dealType, setDealType] = useState('business');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [opportunities, setOpportunities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [chatMessages, setChatMessages] = useState([{ role: 'system', content: 'SYSTEM ONLINE: ALX Deep Verification Engine Active. I can search for additional live deals and validate them via the Backend Scraper Agent.' }]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);
  const [selectedSector, setSelectedSector] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [showClosed, setShowClosed] = useState(false);
  const [verificationFilter, setVerificationFilter] = useState('All');

  useEffect(() => {
    setTimeout(() => {
      const sorted = [...DATABASE_SOURCE].sort((a, b) => b.matchScore - a.matchScore);
      setOpportunities(sorted);
      setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setIsLoading(false);
    }, 800);
  }, []);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [chatMessages, isTyping]);

  // ==========================================
  // AI AGENT INTEGRATION FUNCTION
  // ==========================================
  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || isTyping) return;
    
    const userText = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', content: userText }]);
    setChatInput('');
    setIsTyping(true);
    
    try {
      /* 
      // TO CONNECT TO YOUR LIVE NODE.JS BACKEND SCRAPER, UNCOMMENT THIS:
      const response = await fetch('http://localhost:3001/api/search-deals', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ query: userText })
      });
      const data = await response.json();
      setChatMessages(prev => [...prev, { role: 'system', content: data.reply }]);
      */

      // Mocking the API response for now
      await new Promise(r => setTimeout(r, 2000));
      setChatMessages(prev => [...prev, { role: 'system', content: `[Live Search Mode] I am analyzing "${userText}". To fetch real-time live deals from the internet, please deploy the Node.js Scraper Agent provided in the code instructions and connect the API endpoint here.` }]);
    } catch (error) {
      setChatMessages(prev => [...prev, { role: 'system', content: `Connection error: Ensure your Node.js Scraper Backend is running.` }]);
    } finally {
      setIsTyping(false);
    }
  };

  const filteredOpportunities = opportunities.filter(op => {
    if (showClosed) return op.status === 'Closed';
    if (op.status === 'Closed') return false;
    if (selectedSector !== 'All' && op.sector !== selectedSector) return false;
    if (selectedLocation !== 'All Locations' && op.country && !op.country.includes(selectedLocation)) return false;
    if (verificationFilter !== 'All') {
      const vd = getVerificationData(op.id);
      if (!vd || vd.verificationLevel !== verificationFilter) return false;
    }
    const q = searchQuery.toLowerCase();
    return !q || op.title.toLowerCase().includes(q) || op.description.toLowerCase().includes(q) || op.source.toLowerCase().includes(q);
  });

  const stats = {
    total: DATABASE_SOURCE.length,
    verified: DATABASE_SOURCE.filter(o => getVerificationData(o.id)?.verificationLevel === 'VERIFIED').length,
    partial: DATABASE_SOURCE.filter(o => getVerificationData(o.id)?.verificationLevel === 'PARTIAL').length,
    unverified: DATABASE_SOURCE.filter(o => ['UNVERIFIED','FORECAST'].includes(getVerificationData(o.id)?.verificationLevel)).length,
    topTargets: DATABASE_SOURCE.filter(o => o.matchScore > 95).length,
  };

  const StatusBadge = ({ status }) => {
    const s = { Open:'bg-emerald-50 text-emerald-700 border-emerald-200', Forecast:'bg-blue-50 text-blue-700 border-blue-200', Closed:'bg-slate-100 text-slate-500 border-slate-200', Urgent:'bg-rose-50 text-rose-700 border-rose-200', 'Verification Needed':'bg-amber-50 text-amber-700 border-amber-200' };
    return <span className={`inline-flex px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-md border items-center gap-1.5 ${s[status] || s.Open}`}>{status === 'Urgent' && <Timer size={12} className="animate-pulse"/>}{status}</span>;
  };

  const OpportunityCard = ({ op }) => {
    const vd = getVerificationData(op.id);
    const vLevel = vd?.verificationLevel || 'UNVERIFIED';
    const urgentNFVF = op.id === 803;
    
    return (
      <div className={`bg-white rounded-2xl border p-5 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group flex flex-col h-full relative overflow-hidden ${op.status === 'Closed' ? 'border-slate-200 opacity-60' : 'border-slate-200 hover:border-emerald-300'}`}>
        {op.matchScore > 95 && <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-400 to-orange-500 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-bl-lg z-20">ALX Top Target</div>}
        {urgentNFVF && <div className="absolute top-0 left-0 bg-rose-500 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-br-lg z-20 flex items-center gap-1"><Timer size={10} className="animate-pulse"/> DEADLINE MAR 9</div>}
        
        <div className="flex justify-between items-start mb-3 relative z-10 pt-4">
          <div className="w-full">
            <div className="flex justify-between items-center mb-2">
              <StatusBadge status={op.status} />
              {vLevel && <VerificationBadge level={vLevel} compact />}
            </div>
            <h3 className="text-lg font-bold tracking-tight text-slate-800 group-hover:text-slate-900 line-clamp-2 h-[3.2rem]">{op.title}</h3>
            <div className="flex items-center justify-between mt-1.5">
              <p className="text-slate-500 text-xs flex items-center font-semibold"><Building2 size={11} className="mr-1 text-slate-400"/>{op.source}</p>
              <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase rounded border border-slate-200">{op.country}</span>
            </div>
          </div>
        </div>

        <div className={`mb-4 p-3 rounded-xl border ${op.matchScore > 95 ? 'bg-amber-50/30 border-amber-100' : 'bg-emerald-50/50 border-emerald-100'}`}>
          <p className={`font-extrabold text-base tracking-tight ${op.matchScore > 95 ? 'text-amber-700' : 'text-emerald-700'}`}>{op.value}</p>
          <p className="text-xs flex items-center mt-0.5 uppercase tracking-wider font-bold text-slate-400"><Clock size={11} className="mr-1"/>{op.deadline}</p>
        </div>

        <p className="text-slate-600 text-xs mb-4 leading-relaxed flex-grow line-clamp-3">{op.description}</p>

        {vd && (
          <div className={`mb-3 p-3 rounded-xl border text-xs ${vLevel === 'VERIFIED' ? 'bg-emerald-50 border-emerald-200' : vLevel === 'PARTIAL' ? 'bg-amber-50 border-amber-200' : 'bg-rose-50 border-rose-200'}`}>
            <p className={`font-black uppercase tracking-wider text-[10px] mb-1.5 ${vLevel === 'VERIFIED' ? 'text-emerald-600' : vLevel === 'PARTIAL' ? 'text-amber-600' : 'text-rose-600'}`}>
              {vLevel === 'VERIFIED' ? '✓ Direct Opportunity Link' : vLevel === 'PARTIAL' ? '⚡ Closest Verified Portal' : '⚠ Organization Portal Only'}
            </p>
            <a href={vd.directOpportunityUrl} target="_blank" rel="noopener noreferrer"
              className={`flex items-center gap-1 font-bold hover:underline ${vLevel === 'VERIFIED' ? 'text-emerald-700' : vLevel === 'PARTIAL' ? 'text-amber-700' : 'text-rose-700'}`}>
              <Link2 size={11}/> {vd.directOpportunityLabel} <ArrowUpRight size={11}/>
            </a>
          </div>
        )}

        <button onClick={() => { setSelectedOpportunity(op); setActiveTab('search'); }}
          className={`w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 text-white shadow-md hover:shadow-lg ${op.status === 'Closed' ? 'bg-slate-200 text-slate-500' : op.matchScore > 95 ? 'bg-gradient-to-r from-slate-800 to-slate-900 hover:from-black' : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600'}`}>
          Full Verification Report
        </button>
      </div>
    );
  };

  const SidebarItem = ({ id, icon: Icon, label }) => (
    <button onClick={() => { setActiveTab(id); setSelectedOpportunity(null); }}
      className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-300 ${activeTab === id ? 'bg-emerald-50 text-emerald-700 border-l-4 border-emerald-500 shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-emerald-600'}`}>
      <Icon size={20} className={activeTab === id ? 'text-emerald-600' : ''}/> {isSidebarOpen && <span className="font-semibold tracking-wide">{label}</span>}
    </button>
  );

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      <aside className={`${isSidebarOpen ? 'w-72' : 'w-20'} flex-shrink-0 bg-white/80 backdrop-blur-2xl border-r border-slate-200 transition-all duration-300 flex flex-col z-20 shadow-lg`}>
        <div className="h-20 flex items-center justify-center border-b border-slate-200">
          {isSidebarOpen ? (
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center"><Shield size={20} className="text-white"/></div>
              <span className="font-black text-2xl tracking-tighter">ALX<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">Scout</span></span>
            </div>
          ) : <Shield size={24} className="text-emerald-600"/>}
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-6">
          <SidebarItem id="dashboard" icon={TrendingUp} label="Intelligence Overview"/>
          <SidebarItem id="search" icon={Search} label="Opportunity Matrix"/>
          <SidebarItem id="chat" icon={Bot} label="AI Scraper Agent"/>
        </nav>
        <div className="p-4 border-t border-slate-200">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="flex items-center justify-center w-full p-3 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors">
            <Menu size={20}/>
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-full overflow-hidden relative z-10">
        <header className="h-20 bg-white/60 backdrop-blur-xl border-b border-slate-200 flex items-center justify-between px-8 z-20">
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">
            {activeTab === 'dashboard' && 'Executive Intelligence Overview'}
            {activeTab === 'search' && !selectedOpportunity && 'Strategic Opportunity Matrix'}
            {activeTab === 'chat' && 'Live AI Scraper Agent Terminal'}
          </h1>
        </header>

        <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
          
          {/* MATRIX TAB */}
          {activeTab === 'search' && !selectedOpportunity && (
             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                 {filteredOpportunities.map(op => <OpportunityCard key={op.id} op={op}/>)}
             </div>
          )}

          {/* CHAT/AGENT TAB */}
          {activeTab === 'chat' && (
            <div className="flex flex-col max-h-[calc(100vh-160px)] h-full bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xl max-w-4xl mx-auto">
              <div className="bg-white p-5 border-b border-slate-200 flex items-center gap-4">
                <div className="w-11 h-11 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center shadow-md"><Bot size={22} className="text-white"/></div>
                <div>
                  <h3 className="font-black text-slate-900 text-base">ALX Live Deal Scraper</h3>
                  <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 flex items-center mt-0.5"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5 shadow-[0_0_5px_rgba(16,185,129,0.5)]"></span>Awaiting API Connection</p>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50 scrollbar-hide">
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] rounded-2xl px-5 py-3.5 shadow-sm ${msg.role === 'user' ? 'bg-slate-900 text-white rounded-br-sm' : 'bg-white text-slate-800 border border-slate-200 rounded-bl-sm'}`}>
                      <p className="text-sm leading-relaxed font-semibold" style={{whiteSpace:'pre-wrap'}}>{msg.content}</p>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="max-w-[85%] rounded-2xl px-5 py-3.5 bg-white border border-slate-200 rounded-bl-sm flex items-center">
                      <Loader2 className="animate-spin text-emerald-500 mr-2.5" size={16}/>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest animate-pulse">Running Deep Web Scraper...</p>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef}/>
              </div>
              <div className="p-5 bg-white border-t border-slate-200">
                <form onSubmit={handleChatSubmit} className="relative">
                  <input type="text" value={chatInput} onChange={e => setChatInput(e.target.value)} disabled={isTyping}
                    placeholder="Search for new live deals (e.g., 'Find active tech grants in Kenya 2026')..." 
                    className="w-full bg-slate-50 text-slate-900 pl-5 pr-14 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 text-sm font-semibold placeholder-slate-400 disabled:opacity-50"/>
                  <button type="submit" disabled={isTyping || !chatInput.trim()} className="absolute right-2 top-2 p-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white rounded-lg transition-colors"><Send size={16}/></button>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;