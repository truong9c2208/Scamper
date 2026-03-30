import { useStore } from '../store/useStore';
import { Moon, Sun } from 'lucide-react';
import { Schedule } from '../features/schedule/Schedule';
import { Deadlines } from '../features/deadlines/Deadlines';
import { Focus } from '../features/focus/Focus';
import { Statistics } from '../features/statistics/Statistics';
import { Button } from '../components/Button';
import { generateStudySuggestions } from '../utils/ai';

export default function Dashboard() {
  const { isDarkMode, toggleDarkMode, deadlines } = useStore();
  const suggestions = generateStudySuggestions(deadlines);

  return (
    <div className="container mx-auto p-4 max-w-6xl space-y-6">
      <header className="flex justify-between items-center py-4 border-b border-border">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Samper</h1>
          <p className="text-muted-foreground text-sm">Boost your productivity and stay on track.</p>
        </div>
        <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </header>

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
