
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Settings, 
  HelpCircle, 
  PlayCircle, 
  PauseCircle, 
  RotateCcw 
} from "lucide-react";

interface TimerControlsProps {
  isPaused: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onSettingsClick: () => void;
  onHelpClick: () => void;
}

export function TimerControls({
  isPaused,
  onStart,
  onPause,
  onReset,
  onSettingsClick,
  onHelpClick
}: TimerControlsProps) {
  const [startAnimation, setStartAnimation] = useState(false);

  // Reset animation state when isPaused changes
  useEffect(() => {
    setStartAnimation(false);
  }, [isPaused]);

  const handlePrimaryAction = () => {
    if (isPaused) {
      setStartAnimation(true);
      onStart();
    } else {
      onPause();
    }
  };

  return (
    <div className="flex items-center gap-4">
      {/* Primary Button (Start/Pause) */}
      <motion.div whileTap={{ scale: 0.95 }}>
        <Button
          onClick={handlePrimaryAction}
          size="lg"
          className="h-12 px-6 gap-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
          aria-label={isPaused ? "Start timer" : "Pause timer"}
        >
          <AnimatePresence mode="wait">
            {isPaused ? (
              <motion.div
                key="play"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2"
              >
                <PlayCircle className="h-5 w-5" />
                <span>Start</span>
              </motion.div>
            ) : (
              <motion.div
                key="pause"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2"
              >
                <PauseCircle className="h-5 w-5" />
                <span>Pause</span>
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>

      {/* Reset Button */}
      <motion.div whileTap={{ scale: 0.95 }}>
        <Button
          onClick={onReset}
          size="icon"
          variant="ghost"
          className="rounded-full h-10 w-10 bg-background hover:bg-muted/50"
          aria-label="Reset timer"
        >
          <RotateCcw className="h-5 w-5 text-foreground/80" />
        </Button>
      </motion.div>

      {/* Settings Button */}
      <motion.div whileTap={{ scale: 0.95 }}>
        <Button
          onClick={onSettingsClick}
          size="icon"
          variant="ghost"
          className="rounded-full h-10 w-10 bg-background hover:bg-muted/50"
          aria-label="Open settings"
        >
          <Settings className="h-5 w-5 text-foreground/80" />
        </Button>
      </motion.div>

      {/* Help Button */}
      <motion.div whileTap={{ scale: 0.95 }}>
        <Button
          onClick={onHelpClick}
          size="icon"
          variant="ghost"
          className="rounded-full h-10 w-10 bg-background hover:bg-muted/50"
          aria-label="View help"
        >
          <HelpCircle className="h-5 w-5 text-foreground/80" />
        </Button>
      </motion.div>
    </div>
  );
}
