import { useState } from 'react';
import { useStore } from '../store/useStore';
import { Moon, Sun, Flame } from 'lucide-react';
import { Schedule } from '../features/schedule/Schedule';
import { Deadlines } from '../features/deadlines/Deadlines';
import { Focus } from '../features/focus/Focus';
import { Statistics } from '../features/statistics/Statistics';
import { StreakContent, useStreakCount } from '../features/streak/Streak';
import { Button } from '../components/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/Dialog';
import { generateStudySuggestions } from '../utils/ai';

export default function Dashboard() {
  const { isDarkMode, toggleDarkMode, deadlines } = useStore();
  const suggestions = generateStudySuggestions(deadlines);
  const currentStreak = useStreakCount();
  const [streakOpen, setStreakOpen] = useState(false);

  return (
    <div className="container mx-auto p-4 max-w-6xl space-y-6">
      <header className="flex justify-between items-center py-4 border-b border-border">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Scamper</h1>
          <p className="text-muted-foreground text-sm">Boost your productivity and stay on track.</p>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="relative" onClick={() => setStreakOpen(true)}>
            <Flame className="h-5 w-5 text-orange-500" />
            {currentStreak > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-orange-500 text-white text-[10px] leading-none rounded-full min-w-[16px] h-4 px-0.5 flex items-center justify-center font-bold">
                {currentStreak}
              </span>
            )}
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      <Dialog open={streakOpen} onOpenChange={setStreakOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-orange-500" />
              Streak học tập
            </DialogTitle>
          </DialogHeader>
          <StreakContent />
        </DialogContent>
      </Dialog>

      {suggestions.length > 0 && (
        <div className="bg-primary/10 border-l-4 border-primary p-4 rounded text-sm mb-6">
          <p className="font-semibold mb-1">🤖 AI Study Suggestion</p>
          <ul className="list-disc pl-5">
            {suggestions.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Focus />
        <Deadlines />
        <Schedule />
        <Statistics />
      </div>
    </div>
  );
}
