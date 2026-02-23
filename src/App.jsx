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

// Import Google Gemini SDK (Make sure to run: npm install @google/generative-ai)
import { GoogleGenerativeAI } from '@google/generative-ai';

// ============================================================
// API KEYS
// ============================================================
const GEMINI_API_KEY = "AIzaSyDXYq9YL99fGB7sTuMjgKygk4XO0zmjWC8"; 
const SERPER_API_KEY = "1e6ba8f087a0618c01c8a99225828cfda96a88b0";

// ============================================================
// VERIFICATION STATUS DEFINITIONS (UPDATED WITH DIRECT LINKS)
// ============================================================
const VERIFICATION_REGISTRY = {
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
  canex: {
    verificationLevel: "VERIFIED",
    verifiedDate: "Feb 2026",
    evidence: "CANEX Deal Room live. Afreximbank confirmed $2B CANEX fund.",
    directOpportunityUrl: "https://wknd.canex.africa/",
    directOpportunityLabel: "CANEX Application Portal",
    verifiedBy: "canex.africa"
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
  702: {
    verificationLevel: "PARTIAL",
    verifiedDate: "Feb 2026",
    evidence: "British Council SSA Arts Programme confirmed active. The specific '£200k Business Capacity Building Master Contract' requires direct partner sourcing.",
    directOpportunityUrl: "https://arts.britishcouncil.org/what-we-do/sub-saharan-africa",
    directOpportunityLabel: "British Council SSA Arts — Browse Opportunities",
    verifiedBy: "arts.britishcouncil.org"
  },
  901: {
    verificationLevel: "UNVERIFIED",
    verifiedDate: "Feb 2026",
    evidence: "Mastercard Foundation active across Africa with FAST strategy. NO specific '$15-30M Creative Tech Mega-Fund' found on public portal. Direct conversations needed.",
    directOpportunityUrl: "https://mastercardfdn.org/en/",
    directOpportunityLabel: "Mastercard Foundation — Contact Partnerships",
    verifiedBy: "mastercardfdn.org — Specific fund NOT confirmed"
  }
};

const DATABASE_SOURCE = [
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
  
  // Scraper Agent State
  const [chatMessages, setChatMessages] = useState([{ 
    role: 'system', 
    content: 'SYSTEM ONLINE: Live Deal Scraper active. Ask me to find deals (e.g., "Find active tech grants for startups in Kenya 2026").' 
  }]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [agentStatus, setAgentStatus] = useState('');
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

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [chatMessages, isTyping, agentStatus]);

  // ==========================================
  // LIVE AI SCRAPER AGENT FUNCTIONS
  // ==========================================

  const searchGoogle = async (query) => {
    setAgentStatus('Searching the web via Serper...');
    const response = await fetch("https://google.serper.dev/search", {
      method: 'POST',
      headers: {
        'X-API-KEY': SERPER_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ q: query, num: 3 }) // Grab top 3 to keep it fast
    });
    const data = await response.json();
    return data.organic ? data.organic.map(result => result.link) : [];
  };

  const scrapeWebsite = async (url) => {
    try {
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
      const response = await fetch(proxyUrl);
      const data = await response.json();
      
      const parser = new DOMParser();
      const doc = parser.parseFromString(data.contents, 'text/html');
      
      const scripts = doc.querySelectorAll('script, style, nav, footer, header');
      scripts.forEach(s => s.remove());
      
      const rawText = doc.body.innerText.replace(/\s+/g, ' ').trim();
      return rawText.substring(0, 3000); 
    } catch (error) {
      console.error(`Failed to scrape ${url}:`, error);
      return null;
    }
  };

  const validateWithAI = async (pageText, url) => {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    const prompt = `
      You are an AI Deal Scout for an African tech network. Read this webpage text and determine if it contains a valid funding, grant, or B2B opportunity.
      
      Webpage Text: "${pageText}"
      URL: ${url}
      
      Respond ONLY with a valid JSON object. Do not use markdown blocks.
      If it is NOT a valid deal or has expired, return: {"isLegit": false}
      If it IS a valid deal, return:
      {
        "isLegit": true,
        "title": "Exact Title of Deal",
        "source": "Organization Name",
        "value": "Value or 'Variable'",
        "deadline": "Deadline Date",
        "description": "Short 2 sentence summary",
        "directLink": "${url}"
      }
    `;

    try {
      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(cleanJson);
    } catch (error) {
      console.error("AI Parsing Error:", error);
      return { isLegit: false };
    }
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || isTyping) return;
    
    const userQuery = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', content: userQuery }]);
    setChatInput('');
    setIsTyping(true);
    
    try {
      const links = await searchGoogle(userQuery);
      if (links.length === 0) {
        setChatMessages(prev => [...prev, { role: 'system', content: "I couldn't find any relevant results on Google." }]);
        setIsTyping(false);
        return;
      }

      setAgentStatus(`Found ${links.length} potential sources. Scraping pages...`);
      let foundDeals = [];

      for (let i = 0; i < links.length; i++) {
        setAgentStatus(`Reading page ${i + 1} of ${links.length}...`);
        const pageText = await scrapeWebsite(links[i]);
        
        if (pageText && pageText.length > 50) {
          setAgentStatus(`Analyzing text with Gemini...`);
          const dealData = await validateWithAI(pageText, links[i]);
          
          if (dealData && dealData.isLegit) {
            foundDeals.push(dealData);
          }
        }
      }

      if (foundDeals.length > 0) {
        setChatMessages(prev => [...prev, { 
          role: 'system', 
          content: `Verification Complete. I found ${foundDeals.length} valid deal(s) across the web:`, 
          deals: foundDeals 
        }]);
      } else {
        setChatMessages(prev => [...prev, { role: 'system', content: "I scanned the pages but none of them contained active, valid deals based on your criteria." }]);
      }

    } catch (error) {
      setChatMessages(prev => [...prev, { role: 'system', content: "An error occurred during the scraping process. Check API keys and console logs." }]);
    } finally {
      setIsTyping(false);
      setAgentStatus('');
    }
  };

  // ==========================================
  // RENDER HELPERS
  // ==========================================

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
          
          {/* DASHBOARD TAB (Basic stub for space) */}
          {activeTab === 'dashboard' && (
            <div className="max-w-7xl mx-auto flex items-center justify-center h-full">
               <h2 className="text-3xl font-black text-slate-300">Navigate to AI Scraper Agent to Test Live Fetching</h2>
            </div>
          )}

          {/* MATRIX TAB */}
          {activeTab === 'search' && !selectedOpportunity && (
             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                 {filteredOpportunities.map(op => <OpportunityCard key={op.id} op={op}/>)}
             </div>
          )}

          {/* FULL VERIFICATION REPORT TAB */}
          {activeTab === 'search' && selectedOpportunity && (
            <div className="max-w-6xl mx-auto">
              <button onClick={() => setSelectedOpportunity(null)} className="mb-6 flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-colors">
                <ChevronLeft size={18}/> Back to Matrix
              </button>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xl">
                {/* Header */}
                <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-8 text-white">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h1 className="text-3xl font-black tracking-tight mb-2">{selectedOpportunity.title}</h1>
                      <p className="text-slate-300 text-lg font-bold flex items-center gap-2">
                        <Building2 size={20}/> {selectedOpportunity.source}
                      </p>
                    </div>
                    <div className="text-right">
                      <StatusBadge status={selectedOpportunity.status}/>
                      {getVerificationData(selectedOpportunity.id) && (
                        <div className="mt-3">
                          <VerificationBadge level={getVerificationData(selectedOpportunity.id).verificationLevel} />
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-slate-200 text-sm leading-relaxed">{selectedOpportunity.description}</p>
                </div>

                {/* Content Sections */}
                <div className="p-8 space-y-8">
                  
                  {/* Deal Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
                      <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-2">💰 Value</p>
                      <p className="text-2xl font-black text-emerald-900">{selectedOpportunity.value}</p>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                      <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">📅 Deadline</p>
                      <p className="text-2xl font-black text-blue-900">{selectedOpportunity.deadline}</p>
                    </div>
                    <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6">
                      <p className="text-xs font-bold uppercase tracking-widest text-purple-600 mb-2">🎯 ALX Score</p>
                      <p className="text-2xl font-black text-purple-900">{selectedOpportunity.matchScore}/100</p>
                    </div>
                  </div>

                  {/* Key Info Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-black uppercase tracking-widest text-slate-600 mb-3">📍 Location</h3>
                      <p className="text-lg font-bold text-slate-900">{selectedOpportunity.country}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-black uppercase tracking-widest text-slate-600 mb-3">🏷️ Category</h3>
                      <p className="text-lg font-bold text-slate-900">{selectedOpportunity.category}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-black uppercase tracking-widest text-slate-600 mb-3">💼 Type</h3>
                      <p className="text-lg font-bold text-slate-900">{selectedOpportunity.type}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-black uppercase tracking-widest text-slate-600 mb-3">🎨 Sector</h3>
                      <p className="text-lg font-bold text-slate-900">{selectedOpportunity.sector}</p>
                    </div>
                  </div>

                  {/* Strategic Fit */}
                  <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6">
                    <h3 className="text-sm font-black uppercase tracking-widest text-amber-700 mb-3">🚀 Strategic Fit for ALX</h3>
                    <p className="text-slate-800 leading-relaxed">{selectedOpportunity.strategicFit}</p>
                  </div>

                  {/* Eligibility */}
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-600 mb-3">✅ Eligibility Requirements</h3>
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                      <p className="text-slate-800 leading-relaxed">{selectedOpportunity.eligibility}</p>
                    </div>
                  </div>

                  {/* Requirements */}
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-600 mb-4">📋 Documents Required</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedOpportunity.requirements.map((req, idx) => (
                        <div key={idx} className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                          <CheckCircle size={18} className="text-emerald-600 flex-shrink-0"/>
                          <span className="font-semibold text-slate-800">{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Business Actions */}
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-600 mb-4">🎯 Recommended Actions</h3>
                    <div className="space-y-2">
                      {selectedOpportunity.businessAction.map((action, idx) => (
                        <div key={idx} className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-lg p-3">
                          <input type="checkbox" className="mt-1 w-5 h-5 text-blue-600 cursor-pointer"/>
                          <span className="text-slate-800 font-medium">{action}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-600 mb-3">🏷️ Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedOpportunity.tags.map((tag, idx) => (
                        <span key={idx} className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold uppercase tracking-wider">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Verification Details */}
                  {getVerificationData(selectedOpportunity.id) && (
                    <div className="border-t-2 border-slate-200 pt-8">
                      <h3 className="text-sm font-black uppercase tracking-widest text-slate-600 mb-4">🔍 Verification Details</h3>
                      {(() => {
                        const vd = getVerificationData(selectedOpportunity.id);
                        const levelConfig = {
                          VERIFIED: { bg: 'bg-emerald-50', border: 'border-emerald-200', title: '✓ Verified', color: 'text-emerald-700' },
                          PARTIAL: { bg: 'bg-amber-50', border: 'border-amber-200', title: '⚡ Partially Verified', color: 'text-amber-700' },
                          UNVERIFIED: { bg: 'bg-rose-50', border: 'border-rose-200', title: '⚠ Unverified', color: 'text-rose-700' }
                        };
                        const config = levelConfig[vd.verificationLevel] || levelConfig.UNVERIFIED;
                        return (
                          <div className={`${config.bg} border-2 ${config.border} rounded-2xl p-6`}>
                            <div className="mb-4">
                              <p className={`font-black text-lg ${config.color}`}>{config.title}</p>
                              <p className={`text-sm font-semibold ${config.color} opacity-80`}>Verified: {vd.verifiedDate}</p>
                            </div>
                            <p className="text-slate-800 mb-4 leading-relaxed">{vd.evidence}</p>
                            <div className="space-y-2">
                              {vd.directOpportunityUrl && (
                                <a href={vd.directOpportunityUrl} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg transition-colors`}>
                                  <ExternalLink size={16}/> {vd.directOpportunityLabel}
                                </a>
                              )}
                              {vd.alternativeUrl && (
                                <a href={vd.alternativeUrl} target="_blank" rel="noopener noreferrer" className={`block text-sm font-semibold text-slate-700 hover:text-emerald-600 transition-colors`}>
                                  Alternative: {vd.alternativeLabel}
                                </a>
                              )}
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  )}

                  {/* Footer CTA */}
                  <div className="flex gap-3 pt-6 border-t border-slate-200">
                    <a href={selectedOpportunity.portalUrl} target="_blank" rel="noopener noreferrer" className="flex-1 py-3 px-6 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black rounded-lg transition-all text-center flex items-center justify-center gap-2">
                      <ExternalLink size={18}/> Visit Official Portal
                    </a>
                    <button onClick={() => setSelectedOpportunity(null)} className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-colors">
                      Close Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CHAT/AGENT TAB (Fully functional with your keys) */}
          {activeTab === 'chat' && (
            <div className="flex flex-col h-full bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xl max-w-4xl mx-auto">
              <div className="bg-white p-5 border-b border-slate-200 flex items-center gap-4">
                <div className="w-11 h-11 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center shadow-md">
                  <Bot size={22} className="text-white"/>
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-base">Client-Side Scraper Agent</h3>
                  <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 flex items-center mt-0.5">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5 shadow-[0_0_5px_rgba(16,185,129,0.5)]"></span>
                    Online — Live Web Search Active
                  </p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50 scrollbar-hide">
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`max-w-[85%] rounded-2xl px-5 py-3.5 shadow-sm ${msg.role === 'user' ? 'bg-slate-900 text-white rounded-br-sm' : 'bg-white text-slate-800 border border-slate-200 rounded-bl-sm'}`}>
                      <p className="text-sm leading-relaxed font-semibold">{msg.content}</p>
                    </div>
                    
                    {/* Render Deals if AI found them */}
                    {msg.deals && (
                      <div className="mt-3 space-y-3 w-[85%]">
                        {msg.deals.map((deal, dIdx) => (
                          <div key={dIdx} className="bg-white border border-emerald-200 rounded-xl p-4 shadow-sm">
                            <div className="flex justify-between items-start mb-2">
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                                <CheckCircle size={10} className="mr-1"/> Verified Deal
                              </span>
                              <span className="text-xs font-bold text-slate-400">Deadline: {deal.deadline}</span>
                            </div>
                            <h4 className="font-bold text-slate-900 text-sm mb-1">{deal.title}</h4>
                            <p className="text-xs font-semibold text-emerald-600 mb-2">{deal.source} · {deal.value}</p>
                            <p className="text-xs text-slate-600 mb-3">{deal.description}</p>
                            <a href={deal.directLink} target="_blank" rel="noopener noreferrer" 
                               className="inline-flex items-center px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-emerald-600 transition-colors">
                              <Link2 size={12} className="mr-1.5"/> Apply / View Page
                            </a>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="max-w-[85%] rounded-2xl px-5 py-3.5 bg-white border border-emerald-200 rounded-bl-sm flex items-center shadow-sm">
                      <Loader2 className="animate-spin text-emerald-500 mr-2.5" size={16}/>
                      <p className="text-xs font-bold text-slate-600 uppercase tracking-widest animate-pulse">{agentStatus}</p>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef}/>
              </div>

              <div className="p-5 bg-white border-t border-slate-200">
                <form onSubmit={handleChatSubmit} className="relative">
                  <input 
                    type="text" 
                    value={chatInput} 
                    onChange={e => setChatInput(e.target.value)} 
                    disabled={isTyping}
                    placeholder="Search for new live deals (e.g., 'Find active tech grants in Kenya')..." 
                    className="w-full bg-slate-50 text-slate-900 pl-5 pr-14 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 text-sm font-semibold placeholder-slate-400 disabled:opacity-50"
                  />
                  <button 
                    type="submit" 
                    disabled={isTyping || !chatInput.trim()} 
                    className="absolute right-2 top-2 p-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white rounded-lg transition-colors">
                    <Send size={16}/>
                  </button>
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