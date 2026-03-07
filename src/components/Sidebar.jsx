import React from 'react';
import { 
  TrendingUp, Search, Bot, Menu, Shield 
} from 'lucide-react';

const SidebarItem = ({ id, icon: Icon, label, activeTab, onClick, isSidebarOpen }) => (
  <button onClick={() => onClick(id)}
    className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-300 ${activeTab === id ? 'bg-emerald-50 text-emerald-700 border-l-4 border-emerald-500 shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-emerald-600'}`}>
    <Icon size={20} className={activeTab === id ? 'text-emerald-600' : ''}/> {isSidebarOpen && <span className="font-semibold tracking-wide">{label}</span>}
  </button>
);

const Sidebar = ({ activeTab, setActiveTab, isSidebarOpen, setIsSidebarOpen }) => {
  return (
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
        <SidebarItem id="dashboard" icon={TrendingUp} label="Intelligence Overview" activeTab={activeTab} onClick={setActiveTab} isSidebarOpen={isSidebarOpen} />
        <SidebarItem id="search" icon={Search} label="Opportunity Matrix" activeTab={activeTab} onClick={setActiveTab} isSidebarOpen={isSidebarOpen} />
      </nav>
      <div className="p-4 border-t border-slate-200">
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="flex items-center justify-center w-full p-3 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors">
          <Menu size={20}/>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
