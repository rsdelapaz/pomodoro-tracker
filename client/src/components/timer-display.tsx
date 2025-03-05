import { type TimerState } from "@shared/schema";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { useTheme } from "@/lib/theme";

interface TimerDisplayProps {
  state: TimerState;
  totalTime: number;
}

export function TimerDisplay({ state, totalTime }: TimerDisplayProps) {
  const minutes = Math.floor(state.timeLeft / 60);
  const seconds = state.timeLeft % 60;
  const progress = ((totalTime - state.timeLeft) / totalTime) * 100;
  const { currentTheme } = useTheme();

  // Calculate color interpolation based on progress
  const progressColor = `hsl(${(1 - progress/100) * 148}, 100%, 63%)`;

  return (
    <motion.div 
      className="flex flex-col items-center gap-6"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-baseline">
        <motion.h1 
          className="text-8xl md:text-9xl font-bold font-mono tracking-tighter"
          style={{ 
            color: `hsl(var(--primary))`,
            textShadow: '0 0 20px hsla(var(--primary), 0.5)'
          }}
          key={`minutes-${minutes}`}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {String(minutes).padStart(2, '0')}
        </motion.h1>
        <motion.span 
          className="text-8xl md:text-9xl font-bold font-mono"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          :
        </motion.span>
        <motion.h1 
          className="text-8xl md:text-9xl font-bold font-mono tracking-tighter"
          style={{ 
            color: `hsl(var(--secondary))`,
            textShadow: '0 0 20px hsla(var(--secondary), 0.5)'
          }}
          key={`seconds-${seconds}`}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {String(seconds).padStart(2, '0')}
        </motion.h1>
      </div>

      <div className="w-full max-w-md">
        <Progress 
          value={progress} 
          className="h-2 bg-muted"
          style={{
            '--progress-background': progressColor
          } as React.CSSProperties}
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