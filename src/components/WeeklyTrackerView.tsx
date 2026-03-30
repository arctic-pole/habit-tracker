import React from 'react';
import { ChevronLeft, ChevronRight, Plus, Check } from 'lucide-react';
import { MOCK_HABITS } from '../constants';

const WeeklyTrackerView: React.FC = () => {
  const days = [
    { name: 'Mon', date: 23 },
    { name: 'Tue', date: 24, active: true },
    { name: 'Wed', date: 25 },
    { name: 'Thu', date: 26 },
    { name: 'Fri', date: 27 },
    { name: 'Sat', date: 28 },
    { name: 'Sun', date: 29 },
  ];

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight">Weekly Tracker</h2>
          <div className="flex items-center gap-3 text-slate-400 mt-1.5">
            <button className="hover:text-white transition-colors"><ChevronLeft size={16} /></button>
            <span className="text-sm font-bold text-white">Oct 23 - Oct 29, 2023</span>
            <button className="hover:text-white transition-colors"><ChevronRight size={16} /></button>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Weekly Goal Progress</span>
            <div className="w-32 h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
              <div className="h-full bg-primary w-[68%] rounded-full shadow-[0_0_10px_rgba(19,91,236,0.3)]" />
            </div>
          </div>
          <button className="flex items-center gap-2 bg-primary hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 transition-all">
            <Plus size={18} />
            New Habit
          </button>
        </div>
      </div>

      <div className="glass-panel rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full min-w-[800px] text-left border-collapse">
            <thead>
              <tr className="bg-white/5 text-slate-500 text-[10px] font-bold uppercase tracking-widest border-b border-white/5">
                <th className="p-6 w-1/4 sticky left-0 bg-[#1a202c] z-10 border-r border-white/5">Habit</th>
                {days.map(day => (
                  <th key={day.name} className={`p-6 text-center border-r border-white/5 last:border-r-0 ${day.active ? 'bg-primary/5' : ''}`}>
                    <span className="block mb-1 opacity-60">{day.name}</span>
                    <span className={`text-sm font-black ${day.active ? 'text-primary' : 'text-white'}`}>{day.date}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {MOCK_HABITS.map((habit) => (
                <tr key={habit.id} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="p-6 sticky left-0 bg-[#1a202c] group-hover:bg-[#222936] transition-colors z-10 border-r border-white/5">
                    <div className="flex items-center gap-4">
                      <div 
                        className="size-10 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${habit.color}15`, color: habit.color }}
                      >
                        <Check size={18} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">{habit.name}</div>
                        <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">{habit.category}</div>
                      </div>
                    </div>
                  </td>
                  {days.map((day, idx) => {
                    const isDone = habit.history[idx] === 1;
                    return (
                      <td key={day.name} className={`p-6 text-center border-r border-white/5 last:border-r-0 ${day.active ? 'bg-primary/5' : ''}`}>
                        <button 
                          className={`size-9 mx-auto rounded-full flex items-center justify-center transition-all duration-300 ${
                            isDone 
                              ? 'bg-primary text-white shadow-[0_0_15px_rgba(19,91,236,0.4)] scale-100' 
                              : 'border-2 border-white/10 hover:border-white/30 scale-95 hover:scale-100'
                          }`}
                        >
                          {isDone && <Check size={18} strokeWidth={3} />}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WeeklyTrackerView;
