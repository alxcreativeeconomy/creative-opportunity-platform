import React from 'react';
import { Building2, Clock, Timer, Link2, ArrowUpRight } from 'lucide-react';
import StatusBadge from './StatusBadge';
import VerificationBadge from './VerificationBadge';
import { getVerificationData } from '../data/registry';

const OpportunityCard = ({ op, onSelect }) => {
  const vd = getVerificationData(op.id);
  const vLevel = vd?.verificationLevel || 'UNVERIFIED';
  
  if (vd) {
    console.log(`Matched ID: ${op.id}, Level: ${vLevel}`);
  } else {
    console.warn(`No match found in registry for ID: ${op.id}`);
  }

  const urgentNFVF = op.id === 'nfvf_funding_2026'; 
  const isExpiringSoon = op.isExpiring === true;
  
  return (
    <div className={`bg-white rounded-2xl border p-5 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group flex flex-col h-full relative overflow-hidden ${op.status === 'Closed' ? 'border-slate-200 opacity-60' : 'border-slate-200 hover:border-emerald-300'}`}>
      {op.matchScore > 95 && <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-400 to-orange-500 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-bl-lg z-20">ALX Top Target</div>}
      {(urgentNFVF || isExpiringSoon) && (
        <div className="absolute top-0 left-0 bg-rose-500 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-br-lg z-20 flex items-center gap-1 shadow-lg">
          <Timer size={10} className="animate-pulse"/> 
          URGENT: CLOSES {op.deadline.toUpperCase()}
        </div>
      )}
      
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

      <button onClick={() => onSelect(op)}
        className={`w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 text-white shadow-md hover:shadow-lg ${op.status === 'Closed' ? 'bg-slate-200 text-slate-500' : op.matchScore > 95 ? 'bg-gradient-to-r from-slate-800 to-slate-900 hover:from-black' : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600'}`}>
        Full Verification Report
      </button>
    </div>
  );
};

export default OpportunityCard;
