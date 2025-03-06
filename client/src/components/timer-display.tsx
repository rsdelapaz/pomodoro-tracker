import { type TimerState } from "@shared/schema";
import { motion } from "framer-motion";
import { useTheme } from "@/lib/theme";

interface TimerDisplayProps {
  state: TimerState;
  totalTime: number;
}

export function TimerDisplay({ state, totalTime }: TimerDisplayProps) {
  const { currentTheme } = useTheme();

  // Format time as mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate progress percentage
  const progress = Math.max(0, Math.min(100, ((totalTime - state.timeLeft) / totalTime) * 100));

  // Calculate the circumference of the progress circle
  const radius = 110;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        key={state.timeLeft}
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="relative w-64 h-64 flex items-center justify-center"
      >
        {/* Circular background */}
        <div className="absolute w-full h-full rounded-full bg-card border border-border/30 shadow-inner" />

        {/* Circular progress */}
        <svg 
          className="absolute w-full h-full -rotate-90" 
          viewBox="0 0 240 240"
        >
          {/* Background circle */}
          <circle
            cx="120"
            cy="120"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            className="text-muted/10"
          />

          {/* Progress circle */}
          <circle
            cx="120"
            cy="120"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="text-primary transition-all duration-1000 ease-linear"
          />
        </svg>

        {/* Minutes and seconds markers */}
        <div className="absolute w-full h-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-2 bg-muted-foreground/30"
              style={{
                top: '50%',
                left: '50%',
                transformOrigin: '0 0',
                transform: `rotate(${i * 30}deg) translate(124px, 0px)`
              }}
            />
          ))}
        </div>

        {/* Timer display */}
        <div className="z-10 flex flex-col items-center">
          <span className="text-6xl font-semibold tabular-nums tracking-tight">
            {formatTime(state.timeLeft)}
          </span>
          <span className="text-xs uppercase tracking-wider text-muted-foreground mt-2">
            {state.isWorking ? 'Focus Time' : 'Break Time'}
          </span>
        </div>
      </motion.div>
    </div>
  );
}