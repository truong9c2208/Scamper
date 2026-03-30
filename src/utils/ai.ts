import { format } from 'date-fns';
import type { Deadline } from './types';

export const generateStudySuggestions = (deadlines: Deadline[]): string[] => {
  if (deadlines.length === 0) return ["You have no upcoming deadlines. Consider reviewing past notes."];
  
  const sorted = [...deadlines].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  const suggestions: string[] = [];
  
  const nearest = sorted[0];
  suggestions.push(`Focus on "${nearest.title}" first, as it's due on ${format(new Date(nearest.dueDate), 'MMM do')}.`);
  
  if (sorted.length > 1) {
    suggestions.push(`Schedule brief study sessions for "${sorted[1].title}" to stay ahead.`);
  }
  
  suggestions.push("Tip: Use the Pomodoro focus mode (25 mins study, 5 mins rest) to maximize retention.");
  return suggestions;
};
