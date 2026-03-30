import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/Card';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Trash2 } from 'lucide-react';

export function Schedule() {
  const { sessions, addSession, removeSession } = useStore();
  const [subject, setSubject] = useState('');
  const [time, setTime] = useState('');
  const [note, setNote] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !time) return;
    addSession({
      id: crypto.randomUUID(),
      subject,
      time,
      note
    });
    setSubject('');
    setTime('');
    setNote('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>📅 Schedule</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleAdd} className="flex flex-col gap-2">
          <Input placeholder="Subject" value={subject} onChange={e => setSubject(e.target.value)} required />
          <Input type="time" value={time} onChange={e => setTime(e.target.value)} required />
          <Input placeholder="Note (optional)" value={note} onChange={e => setNote(e.target.value)} />
          <Button type="submit">Add Session</Button>
        </form>

        <div className="space-y-2 mt-4">
          {sessions.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">No sessions scheduled.</p>
          ) : (
            sessions.map(s => (
              <div key={s.id} className="flex justify-between items-center p-3 border rounded-md">
                <div>
                  <p className="font-medium text-sm">{s.subject}</p>
                  <p className="text-xs text-muted-foreground">{s.time} {s.note && `• ${s.note}`}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeSession(s.id)}>
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
