import { Habit, Insight } from './types';

export const MOCK_HABITS: Habit[] = [
  {
    id: '1',
    name: 'Drink Water',
    category: 'Health',
    priority: 'High',
    frequency: 'Daily',
    target: '2.5L',
    streak: 12,
    isDoneToday: true,
    color: '#10b981', // emerald-500
    history: [1, 0, 1, 1, 0, 1, 1]
  },
  {
    id: '2',
    name: 'Morning Jog',
    category: 'Fitness',
    priority: 'Medium',
    frequency: 'Weekly',
    target: '5km',
    streak: 4,
    isDoneToday: false,
    color: '#f59e0b', // amber-500
    history: [0, 1, 0, 1, 1, 0, 0]
  },
  {
    id: '3',
    name: 'Read 30 mins',
    category: 'Study',
    priority: 'Low',
    frequency: 'Daily',
    target: '30m',
    streak: 24,
    isDoneToday: true,
    color: '#a855f7', // purple-500
    history: [1, 1, 1, 1, 1, 1, 1]
  },
  {
    id: '4',
    name: 'Code Review',
    category: 'Work',
    priority: 'High',
    frequency: 'Daily',
    target: '2 PRs',
    streak: 0,
    isDoneToday: false,
    color: '#3b82f6', // blue-500
    history: [0, 1, 1, 0, 0, 1, 0]
  },
  {
    id: '5',
    name: 'Meditation',
    category: 'Health',
    priority: 'Medium',
    frequency: 'Daily',
    target: '15m',
    streak: 8,
    isDoneToday: true,
    color: '#ec4899', // pink-500
    history: [1, 1, 0, 1, 1, 0, 1]
  }
];

export const MOCK_INSIGHTS: Insight[] = [
  {
    id: '1',
    type: 'drop-off',
    title: 'Weekend Drop-off',
    description: 'Your consistency drops by 40% on Saturdays. Consider scheduling lighter habits for weekends.',
    impact: 'High'
  },
  {
    id: '2',
    type: 'streak',
    title: 'Morning Streak',
    description: 'You are 15% more effective before 10 AM. Try moving "Deep Work" to this slot.',
    impact: 'Medium'
  },
  {
    id: '3',
    type: 'pattern',
    title: 'Pattern Detected',
    description: 'Missing "Meditation" usually leads to a missed "Journaling" session the same day.',
    impact: 'Medium'
  },
  {
    id: '4',
    type: 'suggestion',
    title: 'Suggestion',
    description: 'Your Reading habit has been skipped 3 times this week. Try reducing the goal to 10 mins.',
    impact: 'Low'
  }
];
