import React from 'react';
import { 
  Flame, 
  Layers, 
  Donut, 
  Clock, 
  TrendingUp, 
  TrendingDown, 
  Zap, 
  Link as LinkIcon, 
  Lightbulb,
  ChevronDown
} from 'lucide-react';
import { motion } from 'motion/react';
import { MOCK_INSIGHTS } from '../constants';
import { Habit } from '../types';

interface AnalyticsViewProps {
  habits: Habit[];
}

const AnalyticsView: React.FC<AnalyticsViewProps> = ({ habits }) => {
  const bestStreak = habits.length > 0 ? Math.max(...habits.map(h => h.streak)) : 0;
  const totalHabits = habits.length;
  const doneToday = habits.filter(h => h.isDoneToday).length;
  const completionRate = totalHabits > 0 ? Math.round((doneToday / totalHabits) * 100) : 0;

  const stats = [
    { label: 'Best Streak', value: `${bestStreak} Days`, change: 'Across all habits', icon: Flame, color: 'text-orange-500', bg: 'bg-orange-500/10' },
    { label: 'Total Active Habits', value: `${totalHabits} Active`, change: `${doneToday} done today`, icon: Layers, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Completion Rate', value: `${completionRate}%`, change: 'Today\'s progress', icon: Donut, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Focus Time', value: '—', change: 'Coming soon', icon: Clock, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  ];

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight">Analytics</h2>
          <p className="text-slate-400 mt-1.5 font-medium">Track your progress and consistency trends across all routines.</p>
        </div>
        <button className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-sm font-bold text-slate-300 hover:text-white transition-all">
          Last 30 Days
          <ChevronDown size={16} />
        </button>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel rounded-2xl p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</h3>
              <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                <stat.icon size={18} />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-2xl font-black">{stat.value}</span>
              <span className={`text-[10px] font-bold ${stat.change.includes('+') ? 'text-emerald-500' : 'text-slate-500'}`}>
                {stat.change}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Consistency Score Graph */}
        <div className="lg:col-span-2 glass-panel rounded-3xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold">Consistency Score</h3>
              <p className="text-xs text-slate-400 font-medium mt-1">Daily completion average over 30 days</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <span className="size-2 rounded-full bg-primary" />
                This Month
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <span className="size-2 rounded-full bg-slate-700" />
                Last Month
              </div>
            </div>
          </div>

          <div className="h-64 w-full relative">
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 50">
              <defs>
                <linearGradient id="chartGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#135bec" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#135bec" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Grid Lines */}
              {[0, 1, 2, 3, 4].map(i => (
                <line key={i} x1="0" y1={i * 12.5} x2="100" y2={i * 12.5} stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
              ))}
              <path 
                d="M0 40 Q 10 35, 20 20 T 40 15 T 60 25 T 80 10 T 100 5 L 100 50 L 0 50 Z" 
                fill="url(#chartGrad)" 
              />
              <path 
                d="M0 40 Q 10 35, 20 20 T 40 15 T 60 25 T 80 10 T 100 5" 
                fill="none" 
                stroke="#135bec" 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
            </svg>
            <div className="flex justify-between mt-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              <span>Week 1</span>
              <span>Week 2</span>
              <span>Week 3</span>
              <span>Week 4</span>
            </div>
          </div>
        </div>

        {/* Smart Insights */}
        <div className="glass-panel rounded-3xl overflow-hidden flex flex-col">
          <div className="p-6 border-b border-white/5 bg-gradient-to-r from-primary/10 to-transparent">
            <div className="flex items-center gap-2 mb-1">
              <Zap size={18} className="text-primary" />
              <h3 className="text-lg font-bold">Smart Insights</h3>
            </div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">AI-powered analysis of your habits</p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
            {MOCK_INSIGHTS.map((insight) => (
              <div key={insight.id} className="bg-white/5 rounded-2xl p-4 border border-white/5 hover:border-primary/30 transition-all group cursor-pointer">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-xl ${
                    insight.type === 'drop-off' ? 'bg-red-500/10 text-red-400' :
                    insight.type === 'streak' ? 'bg-emerald-500/10 text-emerald-400' :
                    insight.type === 'pattern' ? 'bg-amber-500/10 text-amber-400' :
                    'bg-primary/10 text-primary'
                  }`}>
                    {insight.type === 'drop-off' ? <TrendingDown size={18} /> :
                     insight.type === 'streak' ? <TrendingUp size={18} /> :
                     insight.type === 'pattern' ? <LinkIcon size={18} /> :
                     <Lightbulb size={18} />}
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-bold">{insight.title}</p>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                      {insight.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t border-white/5">
            <button className="w-full py-3 rounded-xl border border-white/10 text-slate-400 text-xs font-bold hover:text-white hover:bg-white/5 transition-all uppercase tracking-widest">
              View All Insights
            </button>
          </div>
        </div>
      </div>

      {/* Activity Log Heatmap */}
      <div className="glass-panel rounded-3xl p-8">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-lg font-bold">Activity Log</h3>
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            <span>Less</span>
            <div className="flex gap-1">
              <div className="size-3 rounded-sm bg-slate-800" />
              <div className="size-3 rounded-sm bg-primary/30" />
              <div className="size-3 rounded-sm bg-primary/60" />
              <div className="size-3 rounded-sm bg-primary" />
            </div>
            <span>More</span>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 overflow-x-auto pb-2 scrollbar-hide">
          {['Mon', 'Wed', 'Fri'].map(day => (
            <div key={day} className="flex items-center gap-3">
              <span className="w-8 text-[10px] font-bold text-slate-500 uppercase">{day}</span>
              <div className="flex gap-1.5">
                {Array.from({ length: 45 }).map((_, i) => {
                  const opacity = Math.random();
                  return (
                    <div 
                      key={i} 
                      className="size-3.5 rounded-sm transition-all hover:ring-2 hover:ring-white/50 cursor-pointer"
                      style={{ 
                        backgroundColor: opacity > 0.8 ? '#135bec' : 
                                        opacity > 0.5 ? 'rgba(19, 91, 236, 0.6)' :
                                        opacity > 0.2 ? 'rgba(19, 91, 236, 0.3)' :
                                        '#1e232e'
                      }}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;
