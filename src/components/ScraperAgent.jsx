import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, Loader2, CheckCircle, Link2 } from 'lucide-react';
import { searchGoogle, scrapeWebsite } from '../utils/scraper';
import { validateWithAI } from '../utils/ai';

const ScraperAgent = ({ geminiApiKey, serperApiKey }) => {
  const [chatMessages, setChatMessages] = useState([{ 
    role: 'system', 
    content: 'SYSTEM ONLINE: Live Deal Scraper active. Ask me to find deals (e.g., "Find active tech grants for startups in Kenya 2026").' 
  }]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [agentStatus, setAgentStatus] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => { 
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); 
  }, [chatMessages, isTyping]);

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || isTyping) return;
    
    const userQuery = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', content: userQuery }]);
    setChatInput('');
    setIsTyping(true);
    
    try {
      const links = await searchGoogle(userQuery, serperApiKey);
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
          const dealData = await validateWithAI(pageText, links[i], geminiApiKey);
          
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
      console.error("Scraper Error:", error);
      setChatMessages(prev => [...prev, { role: 'system', content: "An error occurred during the scraping process. Check API keys and console logs." }]);
    } finally {
      setIsTyping(false);
      setAgentStatus('');
    }
  };

  return (
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
  );
};

export default ScraperAgent;
