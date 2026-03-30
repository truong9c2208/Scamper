import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { StudySession, Deadline, StudyStats } from '../utils/types';

interface AppState {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  sessions: StudySession[];
  addSession: (session: StudySession) => void;
  removeSession: (id: string) => void;
  deadlines: Deadline[];
  addDeadline: (deadline: Deadline) => void;
  removeDeadline: (id: string) => void;
  stats: StudyStats[];
  addStudyTime: (date: string, hours: number) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      isDarkMode: false,
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      sessions: [],
      addSession: (session) => set((state) => ({ sessions: [...state.sessions, session] })),
      removeSession: (id) => set((state) => ({ sessions: state.sessions.filter(s => s.id !== id) })),
      deadlines: [],
      addDeadline: (deadline) => set((state) => ({ deadlines: [...state.deadlines, deadline] })),
      removeDeadline: (id) => set((state) => ({ deadlines: state.deadlines.filter(d => d.id !== id) })),
      stats: [],
      addStudyTime: (date, hours) => set((state) => {
        const existing = state.stats.find(s => s.date === date);
        if (existing) {
          return { stats: state.stats.map(s => s.date === date ? { ...s, hours: s.hours + hours } : s) };
        }
        return { stats: [...state.stats, { date, hours }] };
      }),
    }),
    { name: 'smarttime-storage' }
  )
);
