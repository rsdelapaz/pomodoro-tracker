import { type TimerState } from "@shared/schema";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

interface TimerDisplayProps {
  state: TimerState;
  totalTime: number;
}

export function TimerDisplay({ state, totalTime }: TimerDisplayProps) {
  const minutes = Math.floor(state.timeLeft / 60);
  const seconds = state.timeLeft % 60;
  const progress = ((totalTime - state.timeLeft) / totalTime) * 100;

  return (
    <motion.div 
      className="flex flex-col items-center gap-6"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 
        className={`text-8xl md:text-9xl font-bold font-mono tracking-tighter ${
          state.isWorking ? 'text-primary' : 'text-accent-foreground'
        }`}
        key={state.timeLeft}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {String(minutes).padStart(2, '0')}
        <span className="animate-pulse">:</span>
        {String(seconds).padStart(2, '0')}
      </motion.h1>
      <div className="w-full max-w-md">
        <Progress 
          value={progress} 
          className="h-2 bg-muted"
        />
      </div>
      <motion.p 
        className="text-lg font-medium text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {state.isWorking ? 'Focus Time' : 'Break Time'}
      </motion.p>
    </motion.div>
  );
}