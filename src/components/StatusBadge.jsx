import React from 'react';
import { Timer } from 'lucide-react';

const StatusBadge = ({ status }) => {
  const s = { 
    Open: 'bg-emerald-50 text-emerald-700 border-emerald-200', 
    Forecast: 'bg-blue-50 text-blue-700 border-blue-200', 
    Closed: 'bg-slate-100 text-slate-500 border-slate-200', 
    Urgent: 'bg-rose-50 text-rose-700 border-rose-200', 
    'Verification Needed': 'bg-amber-50 text-amber-700 border-amber-200' 
  };
  return (
    <span className={`inline-flex px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-md border items-center gap-1.5 ${s[status] || s.Open}`}>
      {status === 'Urgent' && <Timer size={12} className="animate-pulse"/>}
      {status}
    </span>
  );
};

export default StatusBadge;
