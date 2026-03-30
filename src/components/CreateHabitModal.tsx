import React from 'react';
import { X, Rocket, Bell, Calendar, Settings2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Category, Priority, Frequency } from '../types';

interface CreateHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (habit: any) => void;
}

const CreateHabitModal: React.FC<CreateHabitModalProps> = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = React.useState('');
  const [category, setCategory] = React.useState<Category>('Health');
  const [priority, setPriority] = React.useState<Priority>('Medium');
  const [frequency, setFrequency] = React.useState<Frequency>('Daily');
  const [reminders, setReminders] = React.useState(true);
  const [goal, setGoal] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, category, priority, frequency, reminders, goal });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-md" 
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-xl bg-[#1a202c] rounded-3xl shadow-2xl overflow-hidden border border-white/10"
          >
            <div className="flex items-center justify-between px-8 py-6 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                  <Settings2 size={22} />
                </div>
                <div>
                  <h3 className="text-xl font-bold tracking-tight">Create New Habit</h3>
                  <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Design your new positive routine</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-all"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="px-8 py-8 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-300 ml-1">Habit Name</label>
                <input 
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-slate-600 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" 
                  placeholder="e.g. 5 AM Deep Work Session" 
                  type="text" 
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-300 ml-1">Category</label>
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Category)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option value="Health">Health</option>
                    <option value="Fitness">Fitness</option>
                    <option value="Study">Study</option>
                    <option value="Work">Work</option>
                    <option value="Mind">Mind</option>
                    <option value="Reflect">Reflect</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-300 ml-1">Priority Level</label>
                  <div className="flex p-1 bg-white/5 border border-white/10 rounded-xl">
                    {(['Low', 'Medium', 'High'] as Priority[]).map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setPriority(p)}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                          priority === p 
                            ? 'bg-primary text-white shadow-lg' 
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {p.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-300 ml-1">Frequency</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['Daily', 'Weekly', 'Custom'] as Frequency[]).map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setFrequency(f)}
                      className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border transition-all text-sm font-bold ${
                        frequency === f
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-white/10 bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <Calendar size={16} />
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center">
                    <Bell size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">Smart Reminders</h4>
                    <p className="text-[10px] text-slate-500 font-medium">Get notified at optimal times</p>
                  </div>
                </div>
                <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input 
                      type="checkbox" 
                      checked={reminders}
                      onChange={(e) => setReminders(e.target.checked)}
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-slate-700 rounded-full peer peer-checked:bg-primary transition-colors"></div>
                    <div className="absolute left-1 top-1 size-4 bg-white rounded-full transition-all peer-checked:left-6"></div>
                  </div>
                </label>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between ml-1">
                  <label className="text-sm font-semibold text-slate-300">Initial Reflections & Goals</label>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Optional</span>
                </div>
                <textarea 
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-slate-600 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none" 
                  placeholder="Why is this habit important to you? Define your 'why'..." 
                  rows={3}
                />
              </div>

              <div className="flex gap-4 pt-2">
                <button 
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-4 px-6 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-sm transition-all border border-white/10"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-[2] py-4 px-6 rounded-xl bg-primary hover:bg-blue-600 text-white font-black text-sm transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2"
                >
                  Create Habit
                  <Rocket size={18} />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CreateHabitModal;
