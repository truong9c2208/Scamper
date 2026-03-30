import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/Card';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Trash2, AlertCircle } from 'lucide-react';
import { format, isBefore, addDays } from 'date-fns';

export function Deadlines() {
  const { deadlines, addDeadline, removeDeadline } = useStore();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date) return;
    
    // Check if urgent (within 24h)
    const isUrgent = isBefore(new Date(date), addDays(new Date(), 1));

    addDeadline({
      id: crypto.randomUUID(),
      title,
      dueDate: date,
      isUrgent
    });
    setTitle('');
    setDate('');
  };

  const sortedDeadlines = [...deadlines].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  return (
    <Card>
      <CardHeader>
        <CardTitle>⏰ Deadlines</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleAdd} className="flex flex-col gap-2">
          <Input placeholder="Assignment Title" value={title} onChange={e => setTitle(e.target.value)} required />
          <Input type="date" value={date} onChange={e => setDate(e.target.value)} required />
          <Button type="submit">Add Deadline</Button>
        </form>

        <div className="space-y-2 mt-4">
          {sortedDeadlines.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">No upcoming deadlines.</p>
          ) : (
            sortedDeadlines.map(d => {
              const urgent = isBefore(new Date(d.dueDate), addDays(new Date(), 1));
              return (
                <div key={d.id} className={`flex justify-between items-center p-3 border rounded-md ${urgent ? 'border-red-500 bg-red-500/10' : ''}`}>
                  <div className="flex items-center gap-2">
                    {urgent && <AlertCircle className="h-4 w-4 text-red-500" />}
                    <div>
                      <p className="font-medium text-sm">{d.title}</p>
                      <p className="text-xs text-muted-foreground">{format(new Date(d.dueDate), 'MMM do, yyyy')}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeDeadline(d.id)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}
