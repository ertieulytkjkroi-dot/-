
import React, { useState } from 'react';

interface TeamBuilderProps {
  names: string[];
}

interface Team {
  id: number;
  members: string[];
}

export const TeamBuilder: React.FC<TeamBuilderProps> = ({ names }) => {
  const [teamSize, setTeamSize] = useState(3);
  const [teams, setTeams] = useState<Team[]>([]);

  const generateTeams = () => {
    if (names.length === 0) return;
    
    const shuffled = [...names].sort(() => Math.random() - 0.5);
    const newTeams: Team[] = [];
    let currentTeam: string[] = [];
    
    shuffled.forEach((name, index) => {
      currentTeam.push(name);
      if (currentTeam.length === teamSize || index === shuffled.length - 1) {
        newTeams.push({
          id: newTeams.length + 1,
          members: currentTeam
        });
        currentTeam = [];
      }
    });

    setTeams(newTeams);
  };

  const downloadCSV = () => {
    if (teams.length === 0) return;

    // CSV header and content
    let csvContent = "Group ID,Member Name\n";
    teams.forEach(team => {
      team.members.forEach(member => {
        csvContent += `${team.id},"${member.replace(/"/g, '""')}"\n`;
      });
    });

    // Handle UTF-8 with BOM for Excel Chinese support
    const blob = new Blob(["\ufeff" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `team_results_${new Date().getTime()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const colors = [
    'bg-blue-50 border-blue-200 text-blue-800',
    'bg-emerald-50 border-emerald-200 text-emerald-800',
    'bg-purple-50 border-purple-200 text-purple-800',
    'bg-amber-50 border-amber-200 text-amber-800',
    'bg-rose-50 border-rose-200 text-rose-800',
    'bg-indigo-50 border-indigo-200 text-indigo-800',
    'bg-cyan-50 border-cyan-200 text-cyan-800',
    'bg-orange-50 border-orange-200 text-orange-800',
  ];

  return (
    <div className="p-8 flex flex-col h-full">
      <div className="mb-8 flex flex-col lg:flex-row lg:items-end gap-6 justify-between border-b pb-8">
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">自動分組系統</h2>
          <p className="text-slate-500">快速分組並可以導出 CSV 格式的分配結果。</p>
        </div>

        <div className="flex flex-wrap items-end gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-400 uppercase">每組人數</label>
            <input
              type="number"
              min="2"
              max={names.length}
              value={teamSize}
              onChange={(e) => setTeamSize(Number(e.target.value))}
              className="w-24 p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
          <button
            onClick={generateTeams}
            disabled={names.length === 0}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg transition-all active:scale-95 disabled:bg-slate-300"
          >
            開始分組
          </button>
          {teams.length > 0 && (
            <button
              onClick={downloadCSV}
              className="px-6 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl shadow-sm hover:bg-slate-50 transition-all flex items-center gap-2"
            >
              <svg className="w-5 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              下載 CSV
            </button>
          )}
        </div>
      </div>

      {teams.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in zoom-in duration-500">
          {teams.map((team, idx) => {
            const colorClass = colors[idx % colors.length];
            return (
              <div key={team.id} className={`border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow ${colorClass}`}>
                <div className="px-4 py-3 border-b border-inherit bg-white/50 flex justify-between items-center font-bold">
                  <span>第 {team.id} 組</span>
                  <span className="text-xs opacity-60">{team.members.length} 人</span>
                </div>
                <div className="p-4 space-y-2">
                  {team.members.map((member, mIdx) => (
                    <div key={mIdx} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/40 flex items-center justify-center text-[10px] font-black border border-inherit">
                        {mIdx + 1}
                      </div>
                      <span className="font-medium text-sm">{member}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-slate-300 py-20">
          <svg className="w-20 h-20 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <p className="text-lg font-medium">點擊「開始分組」生成結果</p>
        </div>
      )}
    </div>
  );
};
