import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "@/lib/theme";
import { formatTime } from "@/lib/utils";
import type { TimerState } from "@shared/schema";

interface TimerDisplayProps {
  state: TimerState;
  totalTime: number;
}

export function TimerDisplay({ state, totalTime }: TimerDisplayProps) {
  const { timeLeft } = state;
  const { currentTheme } = useTheme();
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const progress = (totalTime - timeLeft) / totalTime;
  const circumference = 2 * Math.PI * 110; // Circle radius is 110
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative flex flex-col items-center justify-center"
    >
      {/* Circular Timer Background */}
      <div className="relative h-64 w-64 flex items-center justify-center rounded-full border border-primary/20 shadow-lg">
        {/* Progress Circle */}
        <svg className="absolute -rotate-90 h-64 w-64">
          <circle
            cx="128"
            cy="128"
            r="110"
            fill="none"
            strokeWidth="4"
            className="stroke-primary/10"
          />
          <circle
            cx="128"
            cy="128"
            r="110"
            fill="none"
            strokeWidth="4"
            className="stroke-primary/50"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>

        {/* Timer Text */}
        <div className="z-10 flex items-center gap-1">
          <AnimatePresence mode="wait">
            <motion.span
              key={`minutes-${minutes}`}
              className="text-6xl font-medium tabular-nums"
              {...currentTheme.animation.minutes}
            >
              {formatTime(minutes)}
            </motion.span>
          </AnimatePresence>

          <motion.span
            className="text-6xl font-medium text-primary"
            {...currentTheme.animation.separator}
          >
            :
          </motion.span>

          <AnimatePresence mode="wait">
            <motion.span
              key={`seconds-${seconds}`}
              className="text-6xl font-medium tabular-nums"
              {...currentTheme.animation.seconds}
            >
              {formatTime(seconds)}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}