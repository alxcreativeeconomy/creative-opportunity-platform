import React from 'react';
import { 
  Globe, AlertCircle, DollarSign, 
  TrendingUp, Award, Zap, ShieldCheck, Target, 
  BarChart4, ArrowUpRight
} from 'lucide-react';
import { DATABASE_SOURCE } from '../data/opportunities';

const StatCard = ({ icon: Icon, label, value, color, subValue, trend }) => (
  <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
    <div className={`absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform duration-700 ${color.replace('bg-', 'text-')}`}>
      <Icon size={120} />
    </div>
    <div className="flex items-start justify-between relative z-10">
      <div className={`p-3 rounded-2xl ${color} bg-opacity-10 transition-colors group-hover:bg-opacity-20`}>
        <Icon className={color.replace('bg-', 'text-')} size={24} />
      </div>
      {trend && (
        <span className="flex items-center text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">
          <TrendingUp size={10} className="mr-1" /> {trend}
        </span>
      )}
    </div>
    <div className="mt-4 relative z-10">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-1">{label}</p>
      <h3 className="text-3xl font-black text-slate-900 tracking-tight">{value}</h3>
      {subValue && <p className="text-[11px] font-bold text-slate-500 mt-1 flex items-center opacity-80">{subValue}</p>}
    </div>
  </div>
);

const Dashboard = ({ onSelectDeal }) => {
  const totalDeals = DATABASE_SOURCE.length;
  const expiringSoon = DATABASE_SOURCE.filter(d => d.isExpiring).length;
  const topTargets = DATABASE_SOURCE.filter(d => d.matchScore >= 98).length;
  
  const regionCount = DATABASE_SOURCE.reduce((acc, curr) => {
    const reg = curr.region || 'Africa';
    acc[reg] = (acc[reg] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-top-4 duration-700">
      {/* Executive Quick-Look Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard 
          icon={ShieldCheck} label="Intelligence Pool" value={totalDeals} 
          color="bg-emerald-500" subValue="Institutional Scale Portals" trend="+12% WoW"
        />
        <StatCard 
          icon={AlertCircle} label="Active Deadlines" value={expiringSoon} 
          color="bg-rose-500" subValue="High Priority Action Items"
        />
        <StatCard 
          icon={Award} label="Strategic Alignments" value={topTargets} 
          color="bg-amber-500" subValue="Match Score Threshold > 98%" trend="Elite"
        />
        <StatCard 
          icon={DollarSign} label="Estimated Allocation" value="$2.7B+" 
          color="bg-blue-500" subValue="Combined Fund Capacities" trend="Verified"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Market Intelligence Panel */}
        <div className="xl:col-span-8 bg-white rounded-[2.5rem] border border-slate-200 p-8 lg:p-10 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none group-hover:rotate-12 transition-transform duration-1000">
            <BarChart4 size={200} />
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
            <div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Market Distribution Analysis</h3>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Cross-Regional Strategic Footprint</p>
            </div>
            <div className="flex bg-slate-100 p-1.5 rounded-2xl">
              <button className="px-4 py-2 bg-white shadow-sm rounded-xl text-xs font-black text-slate-700 uppercase tracking-wider transition-all">Region</button>
              <button className="px-4 py-2 text-xs font-black text-slate-400 uppercase tracking-wider hover:text-slate-600 transition-all">Sector</button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {Object.entries(regionCount).map(([region, count]) => (
                <div key={region} className="group/item">
                  <div className="flex justify-between items-end mb-2.5 px-1">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${region === 'Africa' ? 'bg-emerald-500' : 'bg-blue-500'}`}></span>
                      <span className="text-sm font-black text-slate-700 uppercase tracking-wider">{region} Portfolio</span>
                    </div>
                    <span className="text-xs font-black text-slate-400 group-hover/item:text-slate-900 transition-colors">{count} Deals · {Math.round((count/totalDeals)*100)}%</span>
                  </div>
                  <div className="h-4 bg-slate-100 rounded-full overflow-hidden p-1 border border-slate-50">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 delay-300 shadow-sm ${region === 'Africa' ? 'bg-gradient-to-r from-emerald-400 to-emerald-600' : 'bg-gradient-to-r from-blue-400 to-blue-600'}`}
                      style={{ width: `${(count/totalDeals)*100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 flex flex-col items-center text-center group/sq">
                <Target size={32} className="text-emerald-500 mb-3 group-hover/sq:scale-110 transition-transform" />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Focus</p>
                <p className="text-xl font-black text-slate-800">Africa Core</p>
              </div>
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 flex flex-col items-center text-center group/sq">
                <Globe size={32} className="text-blue-500 mb-3 group-hover/sq:scale-110 transition-transform" />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Scope</p>
                <p className="text-xl font-black text-slate-800">Global B2B</p>
              </div>
            </div>
          </div>
        </div>

        {/* High-Velocity Strategic Feed */}
        <div className="xl:col-span-4 bg-[#0F172A] rounded-[2.5rem] p-8 lg:p-10 text-white shadow-2xl relative overflow-hidden border border-white/5">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Zap size={150} />
          </div>
          
          <div className="flex items-center justify-between mb-8 relative z-10">
            <h3 className="text-xl font-black tracking-tight">Strategic Hot List</h3>
            <span className="w-2 h-2 bg-rose-500 rounded-full animate-ping"></span>
          </div>

          <div className="space-y-4 relative z-10">
            {DATABASE_SOURCE.filter(d => d.isExpiring || d.matchScore >= 100).slice(0, 5).map(deal => (
              <button 
                key={deal.id} 
                onClick={() => onSelectDeal(deal)}
                className="w-full text-left p-5 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-md hover:bg-white/10 hover:border-emerald-500/30 transition-all group flex flex-col gap-2"
              >
                <div className="flex justify-between items-start">
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-400 opacity-80">{deal.country}</span>
                  {deal.isExpiring && (
                    <span className="text-[8px] font-black uppercase bg-rose-500/20 text-rose-400 border border-rose-500/30 px-2 py-0.5 rounded-full">Urgent</span>
                  )}
                </div>
                <h4 className="text-sm font-bold leading-snug group-hover:text-emerald-400 transition-colors line-clamp-2">{deal.title}</h4>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{deal.deadline}</p>
                  <ArrowUpRight size={14} className="text-slate-500 group-hover:text-white transition-colors" />
                </div>
              </button>
            ))}
          </div>

          <p className="mt-8 text-[10px] font-bold text-center text-slate-500 uppercase tracking-[0.2em]">
            Prioritized by Operational Match Score
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
