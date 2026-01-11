
import React from 'react';
import { AppTab } from '../App';

interface NavbarProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <span className="font-bold text-xl hidden md:block">HR Pro Toolkit</span>
        </div>
        
        <nav className="flex gap-1">
          <button 
            onClick={() => setActiveTab(AppTab.INPUT)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === AppTab.INPUT ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            名單管理
          </button>
          <button 
            onClick={() => setActiveTab(AppTab.DRAW)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === AppTab.DRAW ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            抽獎系統
          </button>
          <button 
            onClick={() => setActiveTab(AppTab.TEAMS)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === AppTab.TEAMS ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            自動分組
          </button>
        </nav>
      </div>
    </header>
  );
};
