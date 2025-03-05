import { type TimerState } from "@shared/schema";
import { Progress } from "@/components/ui/progress";

interface TimerDisplayProps {
  state: TimerState;
  totalTime: number;
}

export function TimerDisplay({ state, totalTime }: TimerDisplayProps) {
  const minutes = Math.floor(state.timeLeft / 60);
  const seconds = state.timeLeft % 60;
  const progress = ((totalTime - state.timeLeft) / totalTime) * 100;

  return (
    <div className="flex flex-col items-center gap-6">
      <h1 
        className={`text-7xl font-bold font-mono tracking-tight ${
          state.isWorking ? 'text-primary' : 'text-accent-foreground'
        }`}
      >
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </h1>
      <div className="w-full max-w-md">
        <Progress value={progress} className="h-2" />
      </div>
      <p className="text-lg font-medium text-muted-foreground">
        {state.isWorking ? 'Work Time' : 'Break Time'}
      </p>
    </div>
  );
}
