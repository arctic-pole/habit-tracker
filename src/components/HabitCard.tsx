import React from 'react';
import { MoreHorizontal, Droplets, Dumbbell, Book, Code, Sparkles, User } from 'lucide-react';
import { Habit } from '../types';
import { motion } from 'motion/react';

interface HabitCardProps {
  habit: Habit;
  onToggle: (id: string) => void;
}

const CategoryIcon = ({ category }: { category: string }) => {
  switch (category) {
    case 'Health': return <Droplets size={20} />;
    case 'Fitness': return <Dumbbell size={20} />;
    case 'Study': return <Book size={20} />;
    case 'Work': return <Code size={20} />;
    case 'Mind': return <Sparkles size={20} />;
    default: return <User size={20} />;
  }
};

const HabitCard: React.FC<HabitCardProps> = ({ habit, onToggle }) => {
  // Simple sparkline path generator
  const generatePath = (data: number[]) => {
    const width = 100;
    const height = 40;
    const step = width / (data.length - 1);
    return data.map((val, i) => {
      const x = i * step;
      const y = height - (val * 30 + 5); // 0 -> 35, 1 -> 5
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel rounded-2xl p-6 flex flex-col gap-5 transition-all duration-300 hover:-translate-y-1 group"
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <div 
            className="size-11 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${habit.color}20`, color: habit.color }}
          >
            <CategoryIcon category={habit.category} />
          </div>
          <div>
            <h3 className="font-bold text-lg leading-none">{habit.name}</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1.5">
              {habit.category} • {habit.frequency}
            </p>
          </div>
        </div>
        <button className="text-slate-500 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5">
          <MoreHorizontal size={20} />
        </button>
      </div>

      <div className="flex items-end justify-between">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-mono font-bold tracking-tight">{habit.streak}</span>
            <span className="text-xs text-slate-400 font-medium">day streak</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <span className="text-[11px] text-slate-400 font-medium">Target: {habit.target}</span>
          <span 
            className="px-2.5 py-1 rounded-md text-[10px] font-bold border"
            style={{ 
              backgroundColor: `${habit.color}10`, 
              color: habit.color,
              borderColor: `${habit.color}20`
            }}
          >
            {habit.priority} Priority
          </span>
        </div>
      </div>

      {/* Sparkline */}
      <div className="h-12 w-full mt-2 relative">
        <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 40">
          <path 
            d={generatePath(habit.history)} 
            fill="none" 
            stroke={habit.color} 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          <circle 
            cx="100" 
            cy={habit.history[habit.history.length-1] === 1 ? 5 : 35} 
            r="3.5" 
            fill="#101622" 
            stroke={habit.color} 
            strokeWidth="2" 
          />
        </svg>
      </div>

      <div className="flex items-center justify-between pt-5 border-t border-white/5">
        <span className="text-[11px] text-slate-500 font-medium">Last 7 days activity</span>
        <label className="flex items-center cursor-pointer group/toggle">
          <div className="relative">
            <input 
              type="checkbox" 
              checked={habit.isDoneToday} 
              onChange={() => onToggle(habit.id)}
              className="sr-only peer" 
            />
            <div className="w-11 h-6 bg-slate-700 rounded-full peer peer-checked:bg-primary transition-colors"></div>
            <div className="absolute left-1 top-1 size-4 bg-white rounded-full transition-all peer-checked:left-6"></div>
          </div>
          <span className={`ml-3 text-xs font-bold transition-colors ${habit.isDoneToday ? 'text-white' : 'text-slate-400'}`}>
            {habit.isDoneToday ? 'Done' : 'To Do'}
          </span>
        </label>
      </div>
    </motion.div>
  );
};

export default HabitCard;
