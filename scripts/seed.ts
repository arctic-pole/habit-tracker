import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lqsbenjhkuqqdrnjgxqt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxxc2Jlbmpoa3VxcWRybmpneHF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4ODQ2MzIsImV4cCI6MjA5MDQ2MDYzMn0.7A0JfIcguL9o6i-zKpTgZvA4gEBjMVmq1xAGb2FsNtY';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const DEMO_EMAIL = 'sarah.wellness@demo.com';
const DEMO_PASSWORD = 'Demo123456';

async function seed() {
  console.log('🌱 Seeding demo user...');

  // 1. Sign up the demo user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: DEMO_EMAIL,
    password: DEMO_PASSWORD,
  });

  if (authError) {
    // If user already exists, try signing in
    if (authError.message.includes('already registered')) {
      console.log('User already exists, signing in...');
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: DEMO_EMAIL,
        password: DEMO_PASSWORD,
      });
      if (signInError) { console.error('Sign in failed:', signInError.message); return; }
      var userId = signInData.user!.id;
    } else {
      console.error('Auth error:', authError.message);
      return;
    }
  } else {
    var userId = authData.user!.id;
  }

  console.log(`✅ User ready: ${userId}`);

  // 2. Insert habits — realistic for someone using the app ~30 days
  const habits = [
    {
      user_id: userId,
      name: 'Morning Meditation',
      category: 'Mind',
      priority: 'High',
      frequency: 'Daily',
      target: '15 min',
      streak: 18,
      is_done_today: true,
      color: '#8b5cf6',
      history: [1, 1, 1, 0, 1, 1, 1],
    },
    {
      user_id: userId,
      name: 'Drink 2.5L Water',
      category: 'Health',
      priority: 'High',
      frequency: 'Daily',
      target: '2.5L',
      streak: 26,
      is_done_today: true,
      color: '#06b6d4',
      history: [1, 1, 1, 1, 1, 0, 1],
    },
    {
      user_id: userId,
      name: 'Gym Workout',
      category: 'Fitness',
      priority: 'High',
      frequency: 'Daily',
      target: '45 min',
      streak: 5,
      is_done_today: false,
      color: '#f59e0b',
      history: [0, 1, 1, 0, 1, 0, 1],
    },
    {
      user_id: userId,
      name: 'Read 30 Pages',
      category: 'Study',
      priority: 'Medium',
      frequency: 'Daily',
      target: '30 pages',
      streak: 31,
      is_done_today: true,
      color: '#a855f7',
      history: [1, 1, 1, 1, 1, 1, 1],
    },
    {
      user_id: userId,
      name: 'No Social Media Before Noon',
      category: 'Mind',
      priority: 'Medium',
      frequency: 'Daily',
      target: 'Until 12pm',
      streak: 9,
      is_done_today: true,
      color: '#ec4899',
      history: [1, 0, 1, 1, 0, 1, 1],
    },
    {
      user_id: userId,
      name: 'Evening Journaling',
      category: 'Reflect',
      priority: 'Low',
      frequency: 'Daily',
      target: '10 min',
      streak: 14,
      is_done_today: false,
      color: '#10b981',
      history: [1, 1, 0, 1, 1, 1, 0],
    },
    {
      user_id: userId,
      name: 'Code Side Project',
      category: 'Work',
      priority: 'Medium',
      frequency: 'Weekly',
      target: '2 hours',
      streak: 3,
      is_done_today: false,
      color: '#3b82f6',
      history: [0, 0, 1, 0, 0, 1, 0],
    },
    {
      user_id: userId,
      name: 'Cold Shower',
      category: 'Health',
      priority: 'Low',
      frequency: 'Daily',
      target: '3 min',
      streak: 0,
      is_done_today: false,
      color: '#ef4444',
      history: [0, 0, 1, 0, 0, 0, 1],
    },
  ];

  const { error: habitsError } = await supabase.from('habits').insert(habits);
  if (habitsError) {
    console.error('Habits insert error:', habitsError.message);
  } else {
    console.log(`✅ Inserted ${habits.length} habits`);
  }

  // 3. Insert journal entries — spread over past ~30 days
  function daysAgo(n: number): string {
    const d = new Date();
    d.setDate(d.getDate() - n);
    return d.toISOString().split('T')[0];
  }

  const journalEntries = [
    {
      user_id: userId,
      date: daysAgo(28),
      title: 'Starting Fresh',
      content: 'Downloaded this habit tracker today. Setting up my first few habits — meditation, water, and reading. Feeling motivated to build a consistent routine. Let\'s see how this goes over the next month. I\'ve tried apps like this before but never stuck with them. This time feels different though.',
      mood: 'productive',
      tags: ['new-start', 'habits', 'motivation'],
    },
    {
      user_id: userId,
      date: daysAgo(25),
      title: 'Finding My Rhythm',
      content: 'Three days in and I\'ve managed to hit most of my habits. Morning meditation is the hardest — I keep snoozing my alarm. But once I actually sit down and breathe, it feels incredible. Water intake is going well since I bought a big bottle to keep on my desk.',
      mood: 'happy',
      tags: ['meditation', 'water', 'progress'],
    },
    {
      user_id: userId,
      date: daysAgo(22),
      title: 'Weekend Slump',
      content: 'Weekends are definitely harder. Woke up late, skipped meditation, barely drank any water. I need to figure out a weekend-friendly version of my routine. Maybe I should set different targets for Saturday and Sunday. Not going to beat myself up about it.',
      mood: 'neutral',
      tags: ['weekend', 'reflection', 'adjustment'],
    },
    {
      user_id: userId,
      date: daysAgo(19),
      title: 'Added Gym to the Mix',
      content: 'Decided to add a gym habit. Started with 3x/week and managed to go today for 45 minutes. Did upper body and some cardio. Felt amazing after. The reading habit is going strong — finished "Atomic Habits" (ironic, I know). Starting "Deep Work" next.',
      mood: 'productive',
      tags: ['gym', 'reading', 'new-habit'],
    },
    {
      user_id: userId,
      date: daysAgo(16),
      title: 'Two Week Mark 🎉',
      content: 'Two weeks of consistent tracking! My reading streak is at 14 days — the longest I\'ve ever maintained. Water habit feels automatic now. Meditation is getting easier, averaging 12 minutes per session. The compound effect is real. I\'m sleeping better, feeling more focused at work.',
      mood: 'happy',
      tags: ['milestone', 'streak', 'progress'],
    },
    {
      user_id: userId,
      date: daysAgo(13),
      title: 'Struggling Today',
      content: 'Bad day at work. Came home exhausted and didn\'t feel like doing anything. Skipped gym, barely read 5 pages. But I did meditate for 10 minutes and that helped calm me down. Reminding myself that one bad day doesn\'t erase two weeks of progress.',
      mood: 'tired',
      tags: ['tough-day', 'resilience', 'self-care'],
    },
    {
      user_id: userId,
      date: daysAgo(10),
      title: 'Cold Shower Challenge',
      content: 'Started the cold shower habit today. It was BRUTAL. Lasted maybe 90 seconds. But the rush afterward was unreal — felt so alert and alive. Going to try to build up to 3 minutes. Added it to my tracker. Also tried the "no social media before noon" rule. Made it to 11:30am before caving. Close enough.',
      mood: 'productive',
      tags: ['cold-shower', 'challenge', 'digital-detox'],
    },
    {
      user_id: userId,
      date: daysAgo(7),
      title: 'Three Weeks In — Patterns Emerging',
      content: 'Looking at my data, clear patterns are visible. I\'m most consistent Mon-Thu, drop off on weekends. Morning habits (meditation, cold shower) have the highest completion rate when I wake up by 6:30am. When I sleep past 7:30, everything cascades. Planning to set a consistent wake-up time.',
      mood: 'productive',
      tags: ['patterns', 'data', 'optimization'],
    },
    {
      user_id: userId,
      date: daysAgo(5),
      title: 'The Reading Streak Lives',
      content: 'Day 26 reading streak! Currently halfway through "Deep Work" and it\'s changed how I think about focus. Applied some of the ideas to my work today — blocked off 2 hours of uninterrupted coding time. Got more done in those 2 hours than the rest of the day combined.',
      mood: 'happy',
      tags: ['reading', 'deep-work', 'focus'],
    },
    {
      user_id: userId,
      date: daysAgo(3),
      title: 'Evening Reflection',
      content: 'Started an evening journaling habit — 10 minutes before bed to write about the day. It\'s helping me process things and plan for tomorrow. Today I\'m grateful for: consistent morning routine, a good gym session, and a productive afternoon. Tomorrow\'s focus: nail the cold shower.',
      mood: 'neutral',
      tags: ['journaling', 'gratitude', 'evening'],
    },
    {
      user_id: userId,
      date: daysAgo(1),
      title: 'Almost One Month!',
      content: 'Tomorrow marks one month since I started this journey. Stats: 26-day water streak, 31-day reading streak (started before the app!), 18-day meditation streak. The gym is my weakest habit at ~4x/week but I\'m okay with that. Cold showers are still painful but I\'m up to 2.5 minutes now. Most importantly, I feel genuinely different. More disciplined, more focused, more intentional with my time.',
      mood: 'happy',
      tags: ['milestone', 'one-month', 'reflection', 'growth'],
    },
    {
      user_id: userId,
      date: daysAgo(0),
      title: 'Day 30 — Celebrating Progress',
      content: 'One month of consistent habit tracking! Not perfect — I\'ve had bad days, missed sessions, broken streaks. But I showed up most days and that\'s what matters. Planning to add a new habit next week: learning Spanish for 15 min/day. Also want to start tracking sleep quality. This journey is just getting started.',
      mood: 'productive',
      tags: ['celebration', 'month-one', 'planning', 'next-steps'],
    },
  ];

  const { error: entriesError } = await supabase.from('journal_entries').insert(journalEntries);
  if (entriesError) {
    console.error('Journal entries insert error:', entriesError.message);
  } else {
    console.log(`✅ Inserted ${journalEntries.length} journal entries`);
  }

  console.log('\n🎉 Seed complete!');
  console.log(`\n📧 Login with:\n   Email: ${DEMO_EMAIL}\n   Password: ${DEMO_PASSWORD}`);
}

seed().catch(console.error);
