import React, { useState } from 'react';
import { User, Bell, Shield, Palette, Globe, HelpCircle, LogOut, ChevronRight, Check, Moon, Sun } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';

interface SettingSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
}

const SECTIONS: SettingSection[] = [
  { id: 'profile', title: 'Profile', icon: <User size={20} />, description: 'Manage your personal information and account details.' },
  { id: 'notifications', title: 'Notifications', icon: <Bell size={20} />, description: 'Configure alerts, reminders, and push notifications.' },
  { id: 'privacy', title: 'Privacy & Security', icon: <Shield size={20} />, description: 'Control your data visibility and account security.' },
  { id: 'appearance', title: 'Appearance', icon: <Palette size={20} />, description: 'Customize the app theme, colors, and layout.' },
  { id: 'language', title: 'Language & Region', icon: <Globe size={20} />, description: 'Set your preferred language and regional formats.' },
];

export default function SettingsView() {
  const { user, signOut } = useAuth();
  const [activeSection, setActiveSection] = useState('profile');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const userEmail = user?.email || 'user@example.com';
  const userName = userEmail.split('@')[0];
  const userInitials = userName.slice(0, 2).toUpperCase();

  return (
    <div className="flex h-full gap-8">
      {/* Sidebar: Settings Navigation */}
      <div className="w-80 flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-white mb-6">Settings</h2>
        {SECTIONS.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all group ${
              activeSection === section.id 
                ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                : 'text-white/50 hover:bg-white/5 hover:text-white'
            }`}
          >
            <div className={`p-2 rounded-xl transition-colors ${
              activeSection === section.id ? 'bg-white/20' : 'bg-white/5 group-hover:bg-white/10'
            }`}>
              {section.icon}
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold">{section.title}</div>
              <div className={`text-xs mt-0.5 transition-colors ${
                activeSection === section.id ? 'text-white/70' : 'text-white/30'
              }`}>
                {section.description}
              </div>
            </div>
            <ChevronRight size={16} className={`ml-auto transition-transform ${
              activeSection === section.id ? 'translate-x-1' : 'opacity-0 group-hover:opacity-100'
            }`} />
          </button>
        ))}

        <div className="mt-auto pt-8 border-t border-white/10 space-y-2">
          <button className="w-full flex items-center gap-4 p-4 text-white/50 hover:bg-white/5 hover:text-white rounded-2xl transition-all">
            <div className="p-2 bg-white/5 rounded-xl"><HelpCircle size={20} /></div>
            <span className="text-sm font-semibold">Help Center</span>
          </button>
          <button
            onClick={signOut}
            className="w-full flex items-center gap-4 p-4 text-red-400 hover:bg-red-400/10 rounded-2xl transition-all"
          >
            <div className="p-2 bg-red-400/10 rounded-xl"><LogOut size={20} /></div>
            <span className="text-sm font-semibold">Log Out</span>
          </button>
        </div>
      </div>

      {/* Main Content: Section Details */}
      <div className="flex-1 glass-panel rounded-3xl p-10 overflow-y-auto scrollbar-hide">
        <div className="max-w-2xl">
          {activeSection === 'profile' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-3xl bg-primary/20 flex items-center justify-center text-3xl font-bold text-primary border-2 border-primary/30">
                  {userInitials}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{userName}</h3>
                  <p className="text-white/40">{userEmail}</p>
                  <button className="mt-3 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                    Change Profile Photo
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/10">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-white/40 uppercase tracking-wider">Full Name</label>
                  <input type="text" defaultValue={userName} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-white/40 uppercase tracking-wider">Email Address</label>
                  <input type="email" defaultValue={userEmail} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-white/40 uppercase tracking-wider">Timezone</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors appearance-none">
                    <option>UTC +05:30 (India Standard Time)</option>
                    <option>UTC +00:00 (Greenwich Mean Time)</option>
                    <option>UTC -05:00 (Eastern Standard Time)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-white/40 uppercase tracking-wider">Language</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors appearance-none">
                    <option>English (United States)</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </select>
                </div>
              </div>

              <div className="pt-8 flex justify-end">
                <button className="px-8 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                  Save Changes
                </button>
              </div>
            </motion.div>
          )}

          {activeSection === 'appearance' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <h3 className="text-2xl font-bold text-white">Appearance</h3>
              
              <div className="space-y-4">
                <label className="text-sm font-semibold text-white/60">Theme Mode</label>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => setIsDarkMode(false)}
                    className={`flex items-center justify-center gap-3 p-6 rounded-2xl border-2 transition-all ${
                      !isDarkMode ? 'bg-white text-black border-primary' : 'bg-white/5 text-white border-transparent hover:bg-white/10'
                    }`}
                  >
                    <Sun size={24} />
                    <span className="font-bold">Light Mode</span>
                  </button>
                  <button 
                    onClick={() => setIsDarkMode(true)}
                    className={`flex items-center justify-center gap-3 p-6 rounded-2xl border-2 transition-all ${
                      isDarkMode ? 'bg-primary text-white border-primary' : 'bg-white/5 text-white border-transparent hover:bg-white/10'
                    }`}
                  >
                    <Moon size={24} />
                    <span className="font-bold">Dark Mode</span>
                  </button>
                </div>
              </div>

              <div className="space-y-4 pt-8 border-t border-white/10">
                <label className="text-sm font-semibold text-white/60">Accent Color</label>
                <div className="flex gap-4">
                  {['#135bec', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'].map((color) => (
                    <button 
                      key={color}
                      className="w-12 h-12 rounded-full border-4 border-transparent hover:scale-110 transition-transform flex items-center justify-center"
                      style={{ backgroundColor: color }}
                    >
                      {color === '#135bec' && <Check size={20} className="text-white" />}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'notifications' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <h3 className="text-2xl font-bold text-white">Notifications</h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/10">
                  <div>
                    <h4 className="font-bold text-white">Push Notifications</h4>
                    <p className="text-sm text-white/40">Receive alerts on your device for habit reminders.</p>
                  </div>
                  <button 
                    onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                    className={`w-14 h-8 rounded-full transition-colors relative ${notificationsEnabled ? 'bg-primary' : 'bg-white/10'}`}
                  >
                    <div className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-all ${notificationsEnabled ? 'left-7' : 'left-1'}`} />
                  </button>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-white/60 uppercase tracking-wider">Email Digests</h4>
                  <div className="space-y-3">
                    {['Daily Summary', 'Weekly Insights', 'Monthly Achievement Report'].map((item) => (
                      <label key={item} className="flex items-center gap-4 cursor-pointer group">
                        <div className="w-6 h-6 rounded-lg border-2 border-white/20 flex items-center justify-center group-hover:border-primary/50 transition-colors">
                          <Check size={14} className="text-primary opacity-0 group-hover:opacity-100" />
                        </div>
                        <span className="text-white/80">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
