import React from 'react';
import { Search, Bell, Plus } from 'lucide-react';

const Topbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-white/10 bg-background-dark/80 backdrop-blur-md px-6 py-4">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-md group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search habits..." 
            className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="hidden sm:flex items-center gap-2 bg-primary hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0">
          <Plus size={18} />
          Quick Add
        </button>

        <div className="flex items-center gap-3">
          <button className="relative p-2.5 text-slate-400 hover:bg-white/5 hover:text-white rounded-full transition-all">
            <Bell size={20} />
            <span className="absolute top-2.5 right-2.5 size-2 bg-red-500 rounded-full border-2 border-background-dark"></span>
          </button>
          
          <div className="h-8 w-px bg-white/10 mx-1"></div>
          
          <div className="size-10 rounded-full border-2 border-white/10 overflow-hidden cursor-pointer hover:border-primary transition-all">
            <img 
              src="https://picsum.photos/seed/sarah/100/100" 
              alt="Profile" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
