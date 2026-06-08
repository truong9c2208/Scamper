import type { StudyStats } from './types';

function shiftDay(dateStr: string, days: number): string {
  const d = new Date(dateStr + 'T00:00:00');
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export function calculateStreak(stats: StudyStats[], today: string) {
  const studyDays = new Set(stats.filter(s => s.hours > 0).map(s => s.date));

  let current = 0;
  let checkDate = today;
  while (studyDays.has(checkDate)) {
    current++;
    checkDate = shiftDay(checkDate, -1);
  }

  const sorted = Array.from(studyDays).sort();
  let longest = 0;
  let run = 0;
  for (let i = 0; i < sorted.length; i++) {
    if (i === 0 || shiftDay(sorted[i - 1], 1) === sorted[i]) {
      run++;
    } else {
      run = 1;
    }
    if (run > longest) longest = run;
  }

  return { current, longest };
}

export function getLast7Days(today: string): string[] {
  return Array.from({ length: 7 }, (_, i) => shiftDay(today, -(6 - i)));
}

export function getStreakMessage(streak: number): string {
  if (streak === 0) return 'Hãy bắt đầu học hôm nay!';
  if (streak === 1) return 'Bước đầu tiên! Giữ vững nhé!';
  if (streak < 5) return 'Đang tăng tốc! Tiếp tục nào!';
  if (streak < 10) return 'Tuyệt vời! Đừng dừng lại!';
  if (streak < 30) return 'Bạn đang cháy! 🔥';
  return 'Huyền thoại! Không thể ngăn cản bạn!';
}
