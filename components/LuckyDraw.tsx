
import React, { useState, useEffect, useCallback, useRef } from 'react';

interface LuckyDrawProps {
  names: string[];
  setNames: React.Dispatch<React.SetStateAction<string[]>>;
}

export const LuckyDraw: React.FC<LuckyDrawProps> = ({ names, setNames }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [allowRepeat, setAllowRepeat] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [displayNames, setDisplayNames] = useState<string[]>([]);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    // Fill initial pool for animation
    if (names.length > 0) {
      setDisplayNames(names.length < 5 ? [...names, ...names, ...names] : names);
    }
  }, [names]);

  const startDraw = useCallback(() => {
    if (names.length === 0 || isSpinning) return;
    
    setIsSpinning(true);
    setWinner(null);
    let counter = 0;
    const duration = 2000;
    const interval = 50;

    timerRef.current = window.setInterval(() => {
      const randomIndex = Math.floor(Math.random() * names.length);
      setWinner(names[randomIndex]);
      counter += interval;

      if (counter >= duration) {
        if (timerRef.current) clearInterval(timerRef.current);
        const finalWinner = names[randomIndex];
        setWinner(finalWinner);
        setHistory(prev => [finalWinner, ...prev]);
        setIsSpinning(false);

        if (!allowRepeat) {
          setNames(prev => prev.filter(name => name !== finalWinner));
        }
      }
    }, interval);
  }, [names, isSpinning, allowRepeat, setNames]);

  return (
    <div className="p-8 flex flex-col h-full items-center">
      <div className="w-full mb-8 text-center">
        <h2 className="text-3xl font-extrabold text-slate-800 mb-2 uppercase tracking-tight">獎品抽籤系統</h2>
        <div className="flex items-center justify-center gap-6 mt-4">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={allowRepeat}
              onChange={(e) => setAllowRepeat(e.target.checked)}
              className="w-5 h-5 rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-sm font-medium group-hover:text-indigo-600 transition-colors">允許重複獲獎</span>
          </label>
          <div className="text-sm font-medium text-slate-500">
            當前獎池: <span className="text-indigo-600 font-bold">{names.length}</span> 人
          </div>
        </div>
      </div>

      <div className="w-full max-w-2xl bg-slate-900 rounded-3xl p-8 shadow-2xl relative overflow-hidden slot-machine-gradient border-8 border-slate-800">
        <div className="h-48 flex items-center justify-center bg-white/5 rounded-2xl border-2 border-white/10 relative">
          <div className="absolute top-0 bottom-0 left-4 w-1 bg-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
          <div className="absolute top-0 bottom-0 right-4 w-1 bg-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
          
          <div className={`text-5xl md:text-7xl font-black transition-all duration-75 ${isSpinning ? 'text-indigo-400 blur-[1px] scale-105' : 'text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]'}`}>
            {winner || "???"}
          </div>
        </div>

        <button
          onClick={startDraw}
          disabled={isSpinning || names.length === 0}
          className={`mt-10 w-full py-6 rounded-2xl font-black text-2xl uppercase tracking-widest transition-all ${isSpinning || names.length === 0 ? 'bg-slate-700 text-slate-500 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_8px_0_rgb(67,56,202)] active:translate-y-1 active:shadow-none hover:-translate-y-1'}`}
        >
          {isSpinning ? "SHUFFLING..." : "PUSH TO DRAW"}
        </button>
      </div>

      {history.length > 0 && (
        <div className="mt-12 w-full max-w-2xl">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            獲獎名單紀錄
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {history.map((name, i) => (
              <div key={i} className="bg-white border p-3 rounded-lg text-sm font-medium text-slate-700 shadow-sm flex items-center justify-between animate-in slide-in-from-top duration-300">
                <span className="truncate">{name}</span>
                <span className="text-[10px] bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded">#{history.length - i}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
