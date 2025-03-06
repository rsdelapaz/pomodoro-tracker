import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "@/lib/theme";
import { formatTime } from "@/lib/utils";
import type { TimerState } from "@shared/schema";

interface TimerDisplayProps {
  state: TimerState;
  totalTime: number;
}

import { formatTime } from "@/lib/utils";

export function TimerDisplay({ state, totalTime }: TimerDisplayProps) {
  const minutes = Math.floor(state.timeLeft / 60);
  const seconds = state.timeLeft % 60;
  const progress = 1 - state.timeLeft / totalTime;
  const { currentTheme } = useTheme();

  // Define the pulse animation classes only when timer is active
  const pulseAnimation = !state.isPaused ? "animate-pulse-subtle" : "";

  return (
    <div className="relative flex items-center justify-center">
      <svg 
        className={`w-64 h-64 transform -rotate-90 ${!state.isPaused ? "filter drop-shadow-sm" : ""}`} 
        viewBox="0 0 100 100"
      >
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          className="text-muted-foreground/10"
        />

        {/* Progress circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          strokeDasharray={`${Math.PI * 2 * 45}`}
          strokeDashoffset={`${Math.PI * 2 * 45 * (1 - progress)}`}
          className={`text-primary transition-all ${pulseAnimation}`}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-6xl font-semibold tracking-tighter">
          {formatTime(minutes)}:{formatTime(seconds)}
        </span>
        <span className={`text-xs mt-2 transition-opacity ${!state.isPaused ? "text-primary-foreground/70" : "text-foreground/30"}`}>
          {!state.isPaused ? "in progress" : "paused"}
        </span>
      </div>
    </div>
  );
}