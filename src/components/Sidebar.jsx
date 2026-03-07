import React from 'react';
import { 
  TrendingUp, Search, Menu, Shield, X 
} from 'lucide-react';

const SidebarItem = ({ id, icon: Icon, label, activeTab, onClick, isSidebarOpen }) => (
  <button onClick={() => onClick(id)}
    className={`w-full flex items-center rounded-xl transition-all duration-300 group ${isSidebarOpen ? 'px-4 py-3.5 space-x-3' : 'px-0 py-3.5 justify-center'} ${activeTab === id ? 'bg-emerald-50 text-emerald-700 border-l-4 border-emerald-500 shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-emerald-600'}`}>
    <Icon size={20} className={`flex-shrink-0 ${activeTab === id ? 'text-emerald-600' : ''}`}/> 
    <span className={`font-semibold tracking-wide whitespace-nowrap transition-all duration-300 overflow-hidden ${isSidebarOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}>
      {label}
    </span>
  </button>
);

const Sidebar = ({ activeTab, setActiveTab, isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <>
      {/* Mobile Backdrop */}
      <div 
        className={`fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Sidebar Container */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 ${isSidebarOpen ? 'w-72 translate-x-0' : 'w-20 lg:translate-x-0 -translate-x-full'} bg-white border-r border-slate-200 transition-all duration-300 flex flex-col shadow-xl lg:shadow-none`}>
        <div className={`h-20 flex items-center border-b border-slate-200 transition-all duration-300 ${isSidebarOpen ? 'px-6 justify-between' : 'justify-center'}`}>
          <div className="flex items-center space-x-3 overflow-hidden">
            <div className="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-200">
              <Shield size={20} className="text-white"/>
            </div>
            <span className={`font-black text-2xl tracking-tighter transition-all duration-300 whitespace-nowrap ${isSidebarOpen ? 'opacity-100' : 'opacity-0 w-0'}`}>
              ALX<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">Scout</span>
            </span>
          </div>
          {isSidebarOpen && (
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg">
              <X size={20}/>
            </button>
          )}
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-6">
          <SidebarItem id="dashboard" icon={TrendingUp} label="Overview" activeTab={activeTab} onClick={(id) => { setActiveTab(id); if(window.innerWidth < 1024) setIsSidebarOpen(false); }} isSidebarOpen={isSidebarOpen} />
          <SidebarItem id="search" icon={Search} label="Matrix" activeTab={activeTab} onClick={(id) => { setActiveTab(id); if(window.innerWidth < 1024) setIsSidebarOpen(false); }} isSidebarOpen={isSidebarOpen} />
        </nav>

        <div className="p-4 border-t border-slate-200 hidden lg:block">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="flex items-center justify-center w-full p-3 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all">
            <Menu size={20} className={`transition-transform duration-500 ${isSidebarOpen ? 'rotate-180' : 'rotate-0'}`}/>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
