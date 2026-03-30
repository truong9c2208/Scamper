export interface StudySession {
  id: string;
  subject: string;
  time: string; // ISO string or specific format
  note?: string;
}

export interface Deadline {
  id: string;
  title: string;
  dueDate: string; // ISO string
  isUrgent: boolean;
}

export interface StudyStats {
  date: string; // YYYY-MM-DD
  hours: number;
}
