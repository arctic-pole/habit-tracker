import { supabase } from '../lib/supabase';

export interface JournalEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  mood: 'happy' | 'neutral' | 'sad' | 'productive' | 'tired';
  tags: string[];
}

interface JournalRow {
  id: string;
  user_id: string;
  date: string;
  title: string;
  content: string | null;
  mood: string;
  tags: string[];
  created_at: string;
}

function rowToEntry(row: JournalRow): JournalEntry {
  return {
    id: row.id,
    date: row.date,
    title: row.title,
    content: row.content || '',
    mood: row.mood as JournalEntry['mood'],
    tags: row.tags || [],
  };
}

export async function getEntries(): Promise<JournalEntry[]> {
  const { data, error } = await supabase
    .from('journal_entries')
    .select('*')
    .order('date', { ascending: false });

  if (error) throw error;
  return (data as JournalRow[]).map(rowToEntry);
}

export async function addEntry(entry: Omit<JournalEntry, 'id'>): Promise<JournalEntry> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('journal_entries')
    .insert({
      user_id: user.id,
      date: entry.date,
      title: entry.title,
      content: entry.content,
      mood: entry.mood,
      tags: entry.tags,
    })
    .select()
    .single();

  if (error) throw error;
  return rowToEntry(data as JournalRow);
}

export async function updateEntry(id: string, updates: Partial<Omit<JournalEntry, 'id'>>): Promise<JournalEntry> {
  const { data, error } = await supabase
    .from('journal_entries')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return rowToEntry(data as JournalRow);
}

export async function deleteEntry(id: string): Promise<void> {
  const { error } = await supabase
    .from('journal_entries')
    .delete()
    .eq('id', id);

  if (error) throw error;
}
