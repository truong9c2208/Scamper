import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/Card';
import { Button } from '../../components/Button';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogHeader } from '../../components/Dialog';
import { useStore } from '../../store/useStore';
import { format } from 'date-fns';
import { Maximize2 } from 'lucide-react';

export function Focus() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const addStudyTime = useStore(state => state.addStudyTime);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (!isBreak) {
        // Record study time
        addStudyTime(format(new Date(), 'yyyy-MM-dd'), 25 / 60);
      }
      setIsBreak(!isBreak);
      setTimeLeft(isBreak ? 25 * 60 : 5 * 60);
      setIsActive(false);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, isBreak, addStudyTime]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(isBreak ? 5 * 60 : 25 * 60);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  const TimerDisplay = () => (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-6xl font-bold tracking-tighter mb-4">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </h2>
      <p className="text-muted-foreground mb-8">
        {isBreak ? 'Rest Time' : 'Focus Time'}
      </p>
      <div className="flex gap-4">
        <Button onClick={toggleTimer} size="lg">
          {isActive ? 'Pause' : 'Start'}
        </Button>
        <Button variant="outline" size="lg" onClick={resetTimer}>
          Reset
        </Button>
      </div>
    </div>
  );

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center pb-2">
        <CardTitle>🎯 Focus Mode</CardTitle>
        <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon"><Maximize2 className="h-4 w-4" /></Button>
          </DialogTrigger>
          <DialogContent className="max-w-[100vw] h-[100vh] border-0 rounded-none flex items-center justify-center m-0">
             <DialogHeader className="hidden">
                 <DialogTitle>Fullscreen Timer</DialogTitle>
             </DialogHeader>
             <TimerDisplay />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="pt-6">
        <TimerDisplay />
      </CardContent>
    </Card>
  );
}
