import React from 'react';
import { 
  ChevronLeft, Building2, ExternalLink, CheckCircle, ArrowUpRight 
} from 'lucide-react';
import StatusBadge from './StatusBadge';
import VerificationBadge from './VerificationBadge';
import { getVerificationData } from '../data/registry';

const VerificationReport = ({ op, onBack }) => {
  const vd = getVerificationData(op.id);
  
  return (
    <div className="max-w-6xl mx-auto">
      <button onClick={onBack} className="mb-6 flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-colors">
        <ChevronLeft size={18}/> Back to Matrix
      </button>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-8 text-white">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-black tracking-tight mb-2">{op.title}</h1>
              <p className="text-slate-300 text-lg font-bold flex items-center gap-2">
                <Building2 size={20}/> {op.source}
              </p>
            </div>
            <div className="text-right">
              <StatusBadge status={op.status}/>
              {vd && (
                <div className="mt-3">
                  <VerificationBadge level={vd.verificationLevel} />
                </div>
              )}
            </div>
          </div>
          <p className="text-slate-200 text-sm leading-relaxed">{op.description}</p>
        </div>

        {/* Content Sections */}
        <div className="p-8 space-y-8">
          
          {/* Deal Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-2">💰 Value</p>
              <p className="text-2xl font-black text-emerald-900">{op.value}</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">📅 Deadline</p>
              <p className="text-2xl font-black text-blue-900">{op.deadline}</p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-purple-600 mb-2">🎯 ALX Score</p>
              <p className="text-2xl font-black text-purple-900">{op.matchScore}/100</p>
            </div>
          </div>

          {/* Key Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-600 mb-3">📍 Location</h3>
              <p className="text-lg font-bold text-slate-900">{op.country}</p>
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-600 mb-3">🏷️ Category</h3>
              <p className="text-lg font-bold text-slate-900">{op.category}</p>
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-600 mb-3">💼 Type</h3>
              <p className="text-lg font-bold text-slate-900">{op.type}</p>
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-600 mb-3">🎨 Sector</h3>
              <p className="text-lg font-bold text-slate-900">{op.sector}</p>
            </div>
          </div>

          {/* Strategic Fit */}
          <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6">
            <h3 className="text-sm font-black uppercase tracking-widest text-amber-700 mb-3">🚀 Strategic Fit for ALX</h3>
            <p className="text-slate-800 leading-relaxed">{op.strategicFit}</p>
          </div>

          {/* Eligibility */}
          <div>
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-600 mb-3">✅ Eligibility Requirements</h3>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-slate-800 leading-relaxed">{op.eligibility}</p>
            </div>
          </div>

          {/* Requirements */}
          <div>
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-600 mb-4">📋 Documents Required</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {op.requirements.map((req, idx) => (
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
              {op.businessAction.map((action, idx) => (
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
              {op.tags.map((tag, idx) => (
                <span key={idx} className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Verification Details */}
          {vd && (
            <div className="border-t-2 border-slate-200 pt-8">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-600 mb-4">🔍 Verification Details</h3>
              {(() => {
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

                    {/* Mini Intelligence Report */}
                    {vd.sourceArticles && vd.sourceArticles.length > 0 && (
                      <div className="mt-6 mb-4">
                        <p className={`font-black uppercase tracking-wider text-[10px] mb-3 ${config.color}`}>
                          📰 Mini Intelligence Report (Source Articles)
                        </p>
                        <div className="grid grid-cols-1 gap-2">
                          {vd.sourceArticles.map((article, idx) => (
                            <a key={idx} href={article.url} target="_blank" rel="noopener noreferrer" 
                               className="flex items-center justify-between p-3 bg-white/50 border border-current/20 rounded-xl hover:bg-white transition-colors group">
                              <span className="font-bold text-slate-700 text-sm group-hover:text-emerald-600">{article.title}</span>
                              <ArrowUpRight size={14} className="text-slate-400 group-hover:text-emerald-600"/>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="space-y-2 pt-4 border-t border-current/10">                      {vd.directOpportunityUrl && (
                        <a href={vd.directOpportunityUrl} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg transition-colors`}>
                          <ExternalLink size={16}/> {vd.directOpportunityLabel}
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
            <a href={op.portalUrl} target="_blank" rel="noopener noreferrer" className="flex-1 py-3 px-6 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black rounded-lg transition-all text-center flex items-center justify-center gap-2">
              <ExternalLink size={18}/> Visit Official Portal
            </a>
            <button onClick={onBack} className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-colors">
              Close Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationReport;
