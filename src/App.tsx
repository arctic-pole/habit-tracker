import React from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import HabitCard from './components/HabitCard';
import CreateHabitModal from './components/CreateHabitModal';
import AnalyticsView from './components/AnalyticsView';
import WeeklyTrackerView from './components/WeeklyTrackerView';
import JournalView from './components/JournalView';
import SettingsView from './components/SettingsView';
import AuthPage from './components/AuthPage';
import { useAuth } from './context/AuthContext';
import { getHabits, addHabit as addHabitService, toggleHabit } from './services/habitService';
import { Habit } from './types';
import { Plus, Filter, LayoutGrid, List, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const { user, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = React.useState('dashboard');
  const [habits, setHabits] = React.useState<Habit[]>([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const [loadingHabits, setLoadingHabits] = React.useState(true);

  // Load habits from Supabase when user is authenticated
  React.useEffect(() => {
    if (!user) {
      setHabits([]);
      setLoadingHabits(false);
      return;
    }

    setLoadingHabits(true);
    getHabits()
      .then(setHabits)
      .catch(console.error)
      .finally(() => setLoadingHabits(false));
  }, [user]);

  const handleToggleHabit = async (id: string) => {
    const habit = habits.find(h => h.id === id);
    if (!habit) return;

    // Optimistic update
    setHabits(prev => prev.map(h =>
      h.id === id ? { ...h, isDoneToday: !h.isDoneToday, streak: !h.isDoneToday ? h.streak + 1 : Math.max(0, h.streak - 1) } : h
    ));

    try {
      await toggleHabit(id, habit.isDoneToday, habit.streak);
    } catch (err) {
      console.error('Failed to toggle habit:', err);
      // Revert on error
      setHabits(prev => prev.map(h =>
        h.id === id ? { ...h, isDoneToday: habit.isDoneToday, streak: habit.streak } : h
      ));
    }
  };

  const handleAddHabit = async (newHabit: any) => {
    try {
      const habit = await addHabitService({
        name: newHabit.name,
        category: newHabit.category,
        priority: newHabit.priority,
        frequency: newHabit.frequency,
        target: 'Custom',
        color: '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'),
      });
      setHabits(prev => [...prev, habit]);
    } catch (err) {
      console.error('Failed to add habit:', err);
    }
  };

  // Show loading spinner during auth check
  if (authLoading) {
    return (
      <div className="min-h-screen bg-background-dark flex items-center justify-center">
        <Loader2 size={40} className="text-primary animate-spin" />
      </div>
    );
  }

  // Show auth page if not logged in
  if (!user) {
    return <AuthPage />;
  }

  return (
    <div className="flex min-h-screen bg-background-dark text-white">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />

        <main className="flex-1 p-6 md:p-10 max-w-[1440px] mx-auto w-full overflow-y-auto scrollbar-hide">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10"
              >
                {/* Dashboard Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div className="space-y-2">
                    <h1 className="text-4xl font-black tracking-tight">Habit Library</h1>
                    <p className="text-slate-400 font-medium max-w-xl">
                      Manage your daily routines and track your progress across health, fitness, and study goals. Consistency is key.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center justify-center gap-2 h-12 px-6 bg-primary hover:bg-blue-600 text-white rounded-xl shadow-xl shadow-primary/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <Plus size={20} />
                    <span className="font-bold">Create New Habit</span>
                  </button>
                </div>

                {/* Filters & Controls */}
                <div className="flex flex-col lg:flex-row justify-between gap-4 bg-white/5 p-2 rounded-2xl border border-white/5 shadow-sm">
                  <div className="flex flex-wrap items-center gap-2">
                    <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-slate-300 bg-white/5 rounded-xl hover:bg-white/10 transition-all border border-white/5">
                      <Filter size={18} />
                      All Categories
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-slate-300 bg-white/5 rounded-xl hover:bg-white/10 transition-all border border-white/5">
                      Priority
                    </button>
                    <div className="h-6 w-px bg-white/10 mx-2 hidden md:block" />
                    <div className="hidden md:flex gap-2">
                      {['Health', 'Fitness', 'Study'].map(tag => (
                        <button key={tag} className="px-4 py-2 text-xs font-bold text-slate-400 bg-white/5 rounded-full hover:bg-white/10 hover:text-white transition-all">
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center bg-black/20 p-1 rounded-xl self-start lg:self-auto">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white/10 text-primary shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                      <LayoutGrid size={20} />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white/10 text-primary shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                      <List size={20} />
                    </button>
                  </div>
                </div>

                {/* Grid */}
                {loadingHabits ? (
                  <div className="flex items-center justify-center py-20">
                    <Loader2 size={32} className="text-primary animate-spin" />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {habits.map(habit => (
                      <HabitCard
                        key={habit.id}
                        habit={habit}
                        onToggle={handleToggleHabit}
                      />
                    ))}
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="border-2 border-dashed border-white/10 hover:border-primary/50 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 group transition-all min-h-[240px] bg-white/[0.02] hover:bg-primary/5"
                    >
                      <div className="size-16 rounded-full bg-white/5 group-hover:bg-primary/10 flex items-center justify-center transition-all">
                        <Plus size={32} className="text-slate-500 group-hover:text-primary transition-all" />
                      </div>
                      <div className="text-center">
                        <h3 className="font-bold text-lg group-hover:text-primary transition-all">New Habit</h3>
                        <p className="text-xs text-slate-500 font-medium mt-1">Add a new routine to track</p>
                      </div>
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'analytics' && <AnalyticsView key="analytics" habits={habits} />}
            {activeTab === 'habits' && <WeeklyTrackerView key="habits" habits={habits} />}
            {activeTab === 'journal' && <JournalView key="journal" />}
            {activeTab === 'settings' && <SettingsView key="settings" />}
          </AnimatePresence>
        </main>
      </div>

      <CreateHabitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddHabit}
      />
    </div>
  );
}
