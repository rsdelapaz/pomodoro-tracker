import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { useTheme } from "@/lib/theme";
import { formatTime } from "@/lib/utils";
import type { TimerState } from "@shared/schema";
import { useEffect } from "react";

interface TimerDisplayProps {
  state: TimerState;
  totalTime: number;
  zenMode?: boolean;
}

export function TimerDisplay({ state, totalTime, zenMode = false }: TimerDisplayProps) {
  const minutes = Math.floor(state.timeLeft / 60);
  const seconds = state.timeLeft % 60;

  const { currentTheme } = useTheme();
  const progressPercent = 100 - (state.timeLeft / totalTime) * 100;

  const breathingControls = useAnimationControls();
  const particleControls = useAnimationControls();

  // Initialize breathing animation
  useEffect(() => {
    const breathingCycle = async () => {
      await breathingControls.start({
        scale: 1.03,
        filter: "brightness(1.1)",
        transition: { duration: 4, ease: "easeInOut" }
      });
      await breathingControls.start({
        scale: 1,
        filter: "brightness(1)",
        transition: { duration: 4, ease: "easeInOut" }
      });
      breathingCycle();
    };

    breathingCycle();

    return () => {
      breathingControls.stop();
    };
  }, [breathingControls]);

  // Initialize particle animation
  useEffect(() => {
    particleControls.start({
      opacity: [0.3, 0.8, 0.3],
      scale: [1, 1.2, 1],
      transition: {
        duration: 8,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse"
      }
    });
  }, [particleControls]);

  // Calculate size based on zen mode
  const timerSize = zenMode ? "w-96 h-96" : "w-64 h-64";
  const fontSize = zenMode ? "text-8xl" : "text-6xl";
  const separatorSize = zenMode ? "text-7xl" : "text-5xl";

  return (
    <motion.div 
      className="relative flex flex-col items-center justify-center"
      animate={breathingControls}
      layout
      transition={{ 
        layout: { duration: 0.7, type: "spring" }
      }}
    >
      <motion.div 
        className={`relative ${timerSize} rounded-full flex items-center justify-center bg-background/20 backdrop-blur-xl shadow-xl border border-border/40 overflow-hidden`}
        initial={{ scale: 1 }}
        animate={{ 
          boxShadow: [
            "0 0 10px 0px rgba(var(--primary), 0.3)",
            "0 0 20px 2px rgba(var(--primary), 0.4)",
            "0 0 10px 0px rgba(var(--primary), 0.3)"
          ]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      >
        {/* Particle effects */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full bg-primary/10"
            style={{
              width: Math.random() * 40 + 10,
              height: Math.random() * 40 + 10,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={particleControls}
            custom={i}
            initial={{ opacity: 0 }}
          />
        ))}

        <div className="relative z-10">
          <div className="flex items-center justify-center gap-1">
            <motion.div
              key={`min-${minutes}`}
              {...currentTheme?.animation?.minutes}
              className={`${fontSize} font-bold tabular-nums tracking-tight text-foreground`}
              style={{
                textShadow: "0 0 15px rgba(var(--primary), 0.7)"
              }}
            >
              {minutes.toString().padStart(2, '0')}
            </motion.div>

            <motion.div
              {...currentTheme?.animation?.separator}
              className={`${separatorSize} font-light text-foreground/80`}
              style={{
                textShadow: "0 0 10px rgba(var(--primary), 0.5)"
              }}
            >
              :
            </motion.div>

            <motion.div
              key={`sec-${seconds}`}
              {...currentTheme?.animation?.seconds}
              className={`${fontSize} font-bold tabular-nums tracking-tight text-foreground`}
              style={{
                textShadow: "0 0 15px rgba(var(--primary), 0.7)"
              }}
            >
              {seconds.toString().padStart(2, '0')}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Progress ring */}
      <div className="absolute inset-0 -z-10">
        <motion.svg 
          className={timerSize} 
          viewBox="0 0 100 100"
          initial={{ rotate: -90 }}
        >
          <circle 
            cx="50" 
            cy="50" 
            r="46" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5"
            className="text-primary/10"
          />
          <motion.circle 
            cx="50" 
            cy="50"
            r="46"
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3"
            strokeLinecap="round"
            className="text-primary"
            strokeDasharray="289.02652413026095"
            initial={{ strokeDashoffset: 289.02652413026095 }}
            animate={{ 
              strokeDashoffset: 289.02652413026095 * (1 - progressPercent / 100) 
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </motion.svg>
      </div>
    </motion.div>
  );
}