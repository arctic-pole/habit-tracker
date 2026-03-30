import React from 'react';
import { 
  LayoutDashboard, 
  CheckSquare, 
  BarChart3, 
  Settings, 
  HelpCircle, 
  LogOut,
  BookOpen
} from 'lucide-react';
import { motion } from 'motion/react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'habits', label: 'Habits', icon: CheckSquare },
    { id: 'journal', label: 'Journal', icon: BookOpen },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="hidden md:flex w-64 flex-col justify-between border-r border-white/10 bg-background-dark p-6 h-screen sticky top-0">
      <div className="flex flex-col gap-8">
        {/* Logo */}
        <div className="flex items-center gap-3 px-2">
          <div className="size-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <LayoutDashboard size={24} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold tracking-tight">HabitLab</h1>
            <p className="text-xs text-slate-400 font-medium">Pro Plan</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                activeTab === item.id 
                  ? 'bg-white/10 text-white' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon 
                size={20} 
                className={activeTab === item.id ? 'text-primary' : 'group-hover:text-primary transition-colors'} 
              />
              <span className="text-sm font-semibold">{item.label}</span>
              {activeTab === item.id && (
                <motion.div 
                  layoutId="activeTab"
                  className="ml-auto size-1.5 rounded-full bg-primary"
                />
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="flex flex-col gap-4">
        <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition-all group">
          <HelpCircle size={20} className="group-hover:text-primary transition-colors" />
          <span className="text-sm font-semibold">Help Center</span>
        </button>
        <button className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-primary/10 text-primary font-bold text-sm hover:bg-primary/20 transition-all">
          <LogOut size={18} />
          Log Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
