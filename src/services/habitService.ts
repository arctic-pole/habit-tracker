import { supabase } from '../lib/supabase';
import { Habit } from '../types';

export interface HabitRow {
  id: string;
  user_id: string;
  name: string;
  category: string;
  priority: string;
  frequency: string;
  target: string | null;
  streak: number;
  is_done_today: boolean;
  color: string | null;
  history: number[];
  created_at: string;
}

function rowToHabit(row: HabitRow): Habit {
  return {
    id: row.id,
    name: row.name,
    category: row.category as Habit['category'],
    priority: row.priority as Habit['priority'],
    frequency: row.frequency as Habit['frequency'],
    target: row.target || '',
    streak: row.streak,
    isDoneToday: row.is_done_today,
    color: row.color || '#3b82f6',
    history: row.history || [0, 0, 0, 0, 0, 0, 0],
  };
}

export async function getHabits(): Promise<Habit[]> {
  const { data, error } = await supabase
    .from('habits')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) throw error;
  return (data as HabitRow[]).map(rowToHabit);
}

export async function addHabit(habit: Omit<Habit, 'id' | 'streak' | 'isDoneToday' | 'history'>): Promise<Habit> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('habits')
    .insert({
      user_id: user.id,
      name: habit.name,
      category: habit.category,
      priority: habit.priority,
      frequency: habit.frequency,
      target: habit.target,
      color: habit.color,
      streak: 0,
      is_done_today: false,
      history: [0, 0, 0, 0, 0, 0, 0],
    })
    .select()
    .single();

  if (error) throw error;
  return rowToHabit(data as HabitRow);
}

export async function updateHabit(id: string, updates: Partial<{
  name: string;
  category: string;
  priority: string;
  frequency: string;
  target: string;
  streak: number;
  is_done_today: boolean;
  color: string;
  history: number[];
}>): Promise<Habit> {
  const { data, error } = await supabase
    .from('habits')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return rowToHabit(data as HabitRow);
}

export async function toggleHabit(id: string, currentlyDone: boolean, currentStreak: number): Promise<Habit> {
  const newDone = !currentlyDone;
  const newStreak = newDone ? currentStreak + 1 : Math.max(0, currentStreak - 1);

  return updateHabit(id, {
    is_done_today: newDone,
    streak: newStreak,
  });
}

export async function deleteHabit(id: string): Promise<void> {
  const { error } = await supabase
    .from('habits')
    .delete()
    .eq('id', id);

  if (error) throw error;
}
