
import React, { useState, useMemo } from 'react';

interface NameListInputProps {
  names: string[];
  onUpdate: (names: string[]) => void;
  onComplete: () => void;
}

export const NameListInput: React.FC<NameListInputProps> = ({ names, onUpdate, onComplete }) => {
  const [inputText, setInputText] = useState(names.join('\n'));

  const duplicates = useMemo(() => {
    const seen = new Set<string>();
    const dupes = new Set<string>();
    const lines = inputText.split(/[\n,]+/).map(n => n.trim()).filter(n => n !== '');
    lines.forEach(name => {
      if (seen.has(name)) {
        dupes.add(name);
      }
      seen.add(name);
    });
    return Array.from(dupes);
  }, [inputText]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setInputText(text);
    const parsed = text.split(/[\n,]+/).map(n => n.trim()).filter(n => n !== '');
    onUpdate(parsed);
  };

  const loadMockData = () => {
    const mockNames = [
      "王小明", "李大華", "張美麗", "陳志強", "林佩芬", 
      "周杰倫", "蔡依林", "吳曉東", "鄭博文", "許芳瑜",
      "何守正", "謝和弦", "郭台銘", "馬雲", "庫克",
      "馬斯克", "比爾蓋茲", "賈伯斯", "蘇姿丰", "黃仁勳"
    ];
    const text = mockNames.join('\n');
    setInputText(text);
    onUpdate(mockNames);
  };

  const removeDuplicates = () => {
    const unique = Array.from(new Set(names));
    const text = unique.join('\n');
    setInputText(text);
    onUpdate(unique);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const lines = content.split(/[\r\n,]+/).map(n => n.trim()).filter(n => n !== '');
      setInputText(lines.join('\n'));
      onUpdate(lines);
    };
    reader.readAsText(file);
  };

  return (
    <div className="p-8 flex flex-col h-full">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold mb-2">上傳名單</h2>
          <p className="text-slate-500">請輸入員工姓名或上傳 CSV 檔案。</p>
        </div>
        <button 
          onClick={loadMockData}
          className="text-sm px-4 py-2 border border-indigo-200 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          載入範例名單
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
        <div className="flex flex-col">
          <label className="block text-sm font-semibold mb-2">貼上姓名 (每行一位)</label>
          <textarea
            value={inputText}
            onChange={handleTextChange}
            placeholder="王小明&#10;李大華&#10;張美麗..."
            className="flex-1 p-4 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none font-mono text-sm"
          />
        </div>

        <div className="flex flex-col space-y-4">
          <div className="p-6 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 flex flex-col items-center justify-center text-center">
            <svg className="w-10 h-10 text-slate-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-sm font-medium mb-2">上傳 CSV 檔案</p>
            <input
              type="file"
              accept=".csv,.txt"
              onChange={handleFileUpload}
              className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
            />
          </div>

          <div className="bg-white border rounded-xl p-5 flex-1 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold flex items-center gap-2">
                <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded text-xs">SUM</span>
                當前人數: {names.length}
              </h3>
              {duplicates.length > 0 && (
                <button 
                  onClick={removeDuplicates}
                  className="text-xs bg-rose-100 text-rose-700 px-3 py-1.5 rounded-lg hover:bg-rose-200 transition-colors font-semibold"
                >
                  移除重複 ({duplicates.length})
                </button>
              )}
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-1 pr-2">
              {names.map((name, i) => {
                const isDuplicate = duplicates.includes(name);
                return (
                  <div key={i} className={`text-sm py-1.5 px-2 rounded border-b border-slate-50 last:border-0 flex justify-between items-center ${isDuplicate ? 'bg-rose-50 border-rose-100' : ''}`}>
                    <span className={isDuplicate ? 'text-rose-700 font-medium' : 'text-slate-600'}>
                      {i + 1}. {name}
                    </span>
                    {isDuplicate && <span className="text-[10px] text-rose-500 font-bold uppercase">Duplicate</span>}
                  </div>
                );
              })}
              {names.length === 0 && <div className="text-sm text-slate-400 italic text-center py-10">名單目前為空</div>}
            </div>
          </div>
          
          <button
            onClick={onComplete}
            disabled={names.length === 0}
            className={`w-full py-4 rounded-xl font-bold text-white transition-all ${names.length === 0 ? 'bg-slate-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg'}`}
          >
            確認並開始
          </button>
        </div>
      </div>
    </div>
  );
};
