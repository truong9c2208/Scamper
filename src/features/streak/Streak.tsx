import { useStore } from '../../store/useStore';
import { calculateStreak, getLast7Days, getStreakMessage } from '../../utils/streak';
import { format } from 'date-fns';
import { Trophy } from 'lucide-react';

const DAY_LABELS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

function getDayLabel(dateStr: string) {
  const dayIndex = new Date(dateStr + 'T00:00:00').getDay();
  const map = [6, 0, 1, 2, 3, 4, 5]; // Sun→CN, Mon→T2, ...
  return DAY_LABELS[map[dayIndex]];
}

export function StreakContent() {
  const stats = useStore(state => state.stats);
  const today = format(new Date(), 'yyyy-MM-dd');

  const { current, longest } = calculateStreak(stats, today);
  const last7 = getLast7Days(today);
  const studiedDays = new Set(stats.filter(s => s.hours > 0).map(s => s.date));

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-5xl font-bold leading-none">
            {/* {current */} 2
            <span className="text-2xl font-medium text-muted-foreground ml-1">ngày</span>
          </p>
          <p className="text-sm text-muted-foreground mt-1">{getStreakMessage(current)}</p>
        </div>
        <div className="flex flex-col items-center gap-1 text-muted-foreground">
          <Trophy className="h-5 w-5 text-yellow-500" />
          <span className="text-xs">Kỷ lục</span>
          <span className="text-xl font-bold text-foreground">2</span>
        </div>
      </div>

      <div>
        <p className="text-xs text-muted-foreground mb-2">7 ngày gần nhất</p>
        <div className="flex justify-between gap-1">
          {last7.map((date, index) => {
            const active = studiedDays.has(date);
            const isToday = date === today;
            return (
              <div key={date} className="flex flex-col items-center gap-1">
                <div
                  className={[
                    'w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors',
                    active ? 'bg-orange-500 text-white' : 'bg-muted text-muted-foreground',
                    isToday ? 'ring-2 ring-orange-400 ring-offset-1 ring-offset-background' : '',
                  ].join(' ')}
                >
                  {index < 2 ? '🔥' : ''}
                </div>
                <span className={`text-[10px] ${isToday ? 'font-bold text-orange-500' : 'text-muted-foreground'}`}>
                  {getDayLabel(date)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function useStreakCount() {
  const stats = useStore(state => state.stats);
  const today = format(new Date(), 'yyyy-MM-dd');
  return calculateStreak(stats, today).current;
}
