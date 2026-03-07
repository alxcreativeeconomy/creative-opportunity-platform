import React from 'react';
import { Search, Filter } from 'lucide-react';
import { SECTOR_TABS, LOCATION_FILTERS, REGION_TABS } from '../data/opportunities';

const FilterBar = ({ 
  searchQuery, 
  setSearchQuery, 
  selectedSector, 
  setSelectedSector, 
  selectedLocation, 
  setSelectedLocation,
  verificationFilter,
  setVerificationFilter,
  activeRegion,
  setActiveRegion
}) => {
  return (
    <div className="mb-8 space-y-6">
      {/* Region Tabs */}
      <div className="flex border-b border-slate-200 gap-8">
        {REGION_TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveRegion(tab.id)}
            className={`pb-4 text-sm font-black uppercase tracking-widest transition-all relative ${activeRegion === tab.id ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}
          >
            {tab.label}
            {activeRegion === tab.id && <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500 rounded-t-full"></div>}
          </button>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search opportunities, sources, or sectors..." 
            className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium text-slate-700 shadow-sm"
          />
        </div>

        {/* Location Filter */}
        <div className="relative min-w-[200px]">
          <select 
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 appearance-none transition-all font-bold text-slate-700 shadow-sm cursor-pointer"
          >
            {LOCATION_FILTERS.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
          <Filter className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
        </div>

        {/* Verification Filter */}
        <div className="relative min-w-[200px]">
          <select 
            value={verificationFilter}
            onChange={(e) => setVerificationFilter(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 appearance-none transition-all font-bold text-slate-700 shadow-sm cursor-pointer"
          >
            <option value="All">All Verifications</option>
            <option value="VERIFIED">Verified Only</option>
            <option value="PARTIAL">Partial Only</option>
            <option value="UNVERIFIED">Unverified Only</option>
          </select>
          <Filter className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
        </div>
      </div>

      {/* Sector Tabs */}
      <div className="flex flex-wrap gap-2 p-1 bg-slate-100 rounded-xl w-fit">
        {SECTOR_TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setSelectedSector(tab.id)}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${selectedSector === tab.id ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
