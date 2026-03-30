export type Category = 'Health' | 'Fitness' | 'Study' | 'Work' | 'Mind' | 'Reflect';
export type Priority = 'Low' | 'Medium' | 'High';
export type Frequency = 'Daily' | 'Weekly' | 'Custom';

export interface Habit {
  id: string;
  name: string;
  category: Category;
  priority: Priority;
  frequency: Frequency;
  target: string;
  streak: number;
  isDoneToday: boolean;
  color: string;
  history: number[]; // Last 7 days completion (0 or 1)
}

export interface Insight {
  id: string;
  type: 'drop-off' | 'streak' | 'pattern' | 'suggestion';
  title: string;
  description: string;
  impact: string;
}
