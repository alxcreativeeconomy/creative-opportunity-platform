import React from 'react';
import { 
  BarChart3, Globe, AlertCircle, DollarSign, 
  TrendingUp, Award, Zap, ShieldCheck 
} from 'lucide-react';
import { DATABASE_SOURCE } from '../data/opportunities';

const StatCard = ({ icon: Icon, label, value, color, subValue }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-start gap-4">
    <div className={`p-3 rounded-2xl ${color} bg-opacity-10`}>
      <Icon className={color.replace('bg-', 'text-')} size={24} />
    </div>
    <div>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
      <h3 className="text-2xl font-black text-slate-900">{value}</h3>
      {subValue && <p className="text-[10px] font-bold text-slate-500 mt-1 uppercase">{subValue}</p>}
    </div>
  </div>
);

const Dashboard = ({ onSelectDeal }) => {
  const totalDeals = DATABASE_SOURCE.length;
  const expiringSoon = DATABASE_SOURCE.filter(d => d.isExpiring).length;
  const topTargets = DATABASE_SOURCE.filter(d => d.matchScore >= 98).length;
  
  // Quick Sector Count
  const sectorCount = DATABASE_SOURCE.reduce((acc, curr) => {
    acc[curr.sector] = (acc[curr.sector] || 0) + 1;
    return acc;
  }, {});

  // Quick Region Count
  const regionCount = DATABASE_SOURCE.reduce((acc, curr) => {
    const reg = curr.region || (curr.country === 'USA' || curr.country === 'UK' ? 'International' : 'Africa');
    acc[reg] = (acc[reg] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={ShieldCheck} 
          label="Verified Deals" 
          value={totalDeals} 
          color="bg-emerald-500"
          subValue="Active 2026/27 Cycle"
        />
        <StatCard 
          icon={AlertCircle} 
          label="Urgent Deadlines" 
          value={expiringSoon} 
          color="bg-rose-500"
          subValue="Closing within 30 days"
        />
        <StatCard 
          icon={Award} 
          label="Strategic Fits" 
          value={topTargets} 
          color="bg-amber-500"
          subValue="Match Score > 98%"
        />
        <StatCard 
          icon={DollarSign} 
          label="Capital Pool" 
          value="$2.7B+" 
          color="bg-blue-500"
          subValue="Combined Portfolio Value"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Market Distribution */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Market Intelligence Distribution</h3>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Global vs Regional Pipeline</p>
            </div>
            <Globe className="text-slate-300" size={32} />
          </div>
          
          <div className="space-y-6">
            {Object.entries(regionCount).map(([region, count]) => (
              <div key={region} className="space-y-2">
                <div className="flex justify-between items-end">
                  <span className="text-sm font-black text-slate-700 uppercase tracking-wider">{region}</span>
                  <span className="text-sm font-bold text-slate-400">{Math.round((count/totalDeals)*100)}%</span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${region === 'Africa' ? 'bg-emerald-500' : 'bg-blue-500'}`}
                    style={{ width: `${(count/totalDeals)*100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4">
             {Object.entries(sectorCount).slice(0, 6).map(([sector, count]) => (
               <div key={sector} className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                 <p className="text-[10px] font-black text-slate-400 uppercase mb-1 truncate">{sector}</p>
                 <p className="text-lg font-black text-slate-700">{count} <span className="text-xs font-bold text-slate-400">Deals</span></p>
               </div>
             ))}
          </div>
        </div>

        {/* Hot List Feed */}
        <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Zap size={120} />
          </div>
          <h3 className="text-xl font-black mb-6 relative z-10">Strategic Hot List</h3>
          <div className="space-y-4 relative z-10">
            {DATABASE_SOURCE.filter(d => d.isExpiring || d.matchScore >= 100).slice(0, 5).map(deal => (
              <button 
                key={deal.id} 
                onClick={() => onSelectDeal(deal)}
                className="w-full text-left p-4 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm hover:bg-white/20 transition-all group"
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 group-hover:text-emerald-300">{deal.country}</span>
                  {deal.isExpiring && <span className="text-[10px] font-black uppercase bg-rose-500 px-2 py-0.5 rounded text-white animate-pulse">Urgent</span>}
                </div>
                <h4 className="text-sm font-bold leading-tight line-clamp-1 group-hover:text-emerald-400">{deal.title}</h4>
                <p className="text-[11px] font-bold text-slate-400 mt-1 uppercase tracking-wider">{deal.deadline}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
