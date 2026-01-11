
import React, { useState, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { NameListInput } from './components/NameListInput';
import { LuckyDraw } from './components/LuckyDraw';
import { TeamBuilder } from './components/TeamBuilder';

export enum AppTab {
  INPUT = 'input',
  DRAW = 'draw',
  TEAMS = 'teams'
}

const App: React.FC = () => {
  const [names, setNames] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.INPUT);

  const handleUpdateNames = useCallback((newList: string[]) => {
    setNames(newList);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.INPUT:
        return <NameListInput names={names} onUpdate={handleUpdateNames} onComplete={() => setActiveTab(AppTab.DRAW)} />;
      case AppTab.DRAW:
        return <LuckyDraw names={names} setNames={setNames} />;
      case AppTab.TEAMS:
        return <TeamBuilder names={names} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden min-h-[600px] flex flex-col">
          {renderContent()}
        </div>
      </main>
      <footer className="p-4 text-center text-slate-400 text-sm">
        © 2024 HR Pro Toolkit • Powered by Gemini AI
      </footer>
    </div>
  );
};

export default App;
