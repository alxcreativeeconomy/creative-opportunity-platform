import React from 'react';
import { BadgeCheck, Eye, XCircle, HelpCircle } from 'lucide-react';

const VerificationBadge = ({ level, compact = false }) => {
  const normalizedLevel = level?.toUpperCase() || 'UNVERIFIED';
  const configs = {
    VERIFIED:   { icon: BadgeCheck, bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', dot: 'bg-emerald-500', label: 'Verified', desc: 'Direct Link Provided' },
    PARTIAL:    { icon: Eye, bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', dot: 'bg-amber-400', label: 'Partial', desc: 'Org verified, deal needs contact' },
    UNVERIFIED: { icon: XCircle, bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-700', dot: 'bg-rose-400', label: 'Unverified', desc: 'Not found on public portals' },
    FORECAST:   { icon: HelpCircle, bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', dot: 'bg-purple-400', label: 'Forecast', desc: 'Anticipated, not yet announced' },
  };
  const c = configs[normalizedLevel] || configs.UNVERIFIED;
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

export default VerificationBadge;
