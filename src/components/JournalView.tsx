import React, { useState } from 'react';
import { Calendar, BookOpen, Search, Plus, Trash2, Edit3, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface JournalEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  mood: 'happy' | 'neutral' | 'sad' | 'productive' | 'tired';
  tags: string[];
}

const MOCK_ENTRIES: JournalEntry[] = [
  {
    id: '1',
    date: '2026-03-24',
    title: 'A Productive Morning',
    content: 'Started the day with meditation and a long walk. Feeling very centered and ready to tackle the week. The new habit of drinking 2L of water is becoming easier.',
    mood: 'productive',
    tags: ['morning', 'meditation', 'water'],
  },
  {
    id: '2',
    date: '2026-03-23',
    title: 'Struggling with Consistency',
    content: 'Missed my workout today. Feeling a bit tired, but I managed to stick to my reading goal. Tomorrow is a new day.',
    mood: 'tired',
    tags: ['reflection', 'workout', 'reading'],
  },
];

const moodIcons = {
  happy: '😊',
  neutral: '😐',
  sad: '😔',
  productive: '🚀',
  tired: '😴',
};

export default function JournalView() {
  const [entries, setEntries] = useState<JournalEntry[]>(MOCK_ENTRIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [isWriting, setIsWriting] = useState(false);

  const filteredEntries = entries.filter(entry => 
    entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-full gap-6">
      {/* Sidebar: Entry List */}
      <div className="w-80 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-serif italic text-white">Journal</h2>
          <button 
            onClick={() => setIsWriting(true)}
            className="p-2 bg-primary/20 text-primary hover:bg-primary/30 rounded-full transition-colors"
          >
            <Plus size={20} />
          </button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
          <input
            type="text"
            placeholder="Search entries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 scrollbar-hide">
          {filteredEntries.map((entry) => (
            <motion.button
              key={entry.id}
              onClick={() => {
                setSelectedEntry(entry);
                setIsWriting(false);
              }}
              whileHover={{ x: 4 }}
              className={`w-full text-left p-4 rounded-2xl transition-all ${
                selectedEntry?.id === entry.id 
                  ? 'bg-primary/20 border border-primary/30' 
                  : 'bg-white/5 border border-white/10 hover:bg-white/10'
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className="text-xs text-white/40 font-mono">{entry.date}</span>
                <span>{moodIcons[entry.mood]}</span>
              </div>
              <h3 className="text-sm font-medium text-white mb-2 line-clamp-1">{entry.title}</h3>
              <p className="text-xs text-white/50 line-clamp-2 leading-relaxed">{entry.content}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Main Content: Entry Detail or Editor */}
      <div className="flex-1 glass-panel rounded-3xl p-8 flex flex-col">
        <AnimatePresence mode="wait">
          {isWriting ? (
            <motion.div
              key="editor"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col h-full gap-6"
            >
              <div className="flex items-center justify-between">
                <button 
                  onClick={() => setIsWriting(false)}
                  className="text-white/40 hover:text-white flex items-center gap-2 text-sm transition-colors"
                >
                  <ChevronLeft size={16} /> Cancel
                </button>
                <button className="px-6 py-2 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary/90 transition-colors">
                  Save Entry
                </button>
              </div>
              <input
                type="text"
                placeholder="Entry Title..."
                className="bg-transparent text-3xl font-serif italic text-white focus:outline-none placeholder:text-white/20"
              />
              <div className="flex gap-4">
                {Object.entries(moodIcons).map(([mood, icon]) => (
                  <button key={mood} className="text-2xl p-2 hover:bg-white/5 rounded-xl transition-colors grayscale hover:grayscale-0">
                    {icon}
                  </button>
                ))}
              </div>
              <textarea
                placeholder="Write your thoughts here..."
                className="flex-1 bg-transparent text-white/80 leading-relaxed resize-none focus:outline-none placeholder:text-white/20 text-lg"
              />
            </motion.div>
          ) : selectedEntry ? (
            <motion.div
              key="detail"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col h-full"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-2xl">
                    {moodIcons[selectedEntry.mood]}
                  </div>
                  <div>
                    <span className="text-xs text-white/40 font-mono uppercase tracking-widest">{selectedEntry.date}</span>
                    <h2 className="text-3xl font-serif italic text-white">{selectedEntry.title}</h2>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                    <Edit3 size={20} />
                  </button>
                  <button className="p-2 text-white/40 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto pr-4 scrollbar-hide">
                <p className="text-lg text-white/80 leading-relaxed whitespace-pre-wrap font-light">
                  {selectedEntry.content}
                </p>
              </div>

              <div className="mt-8 pt-8 border-t border-white/10 flex gap-2">
                {selectedEntry.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white/5 text-white/40 text-xs rounded-full border border-white/10">
                    #{tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                <BookOpen size={40} className="text-white/20" />
              </div>
              <h3 className="text-xl font-serif italic text-white mb-2">Your Personal Space</h3>
              <p className="text-white/40 max-w-xs">Select an entry from the list or start writing a new reflection for today.</p>
              <button 
                onClick={() => setIsWriting(true)}
                className="mt-8 px-8 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
              >
                Write New Entry
              </button>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
