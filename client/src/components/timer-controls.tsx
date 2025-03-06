import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Settings } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { motion } from "framer-motion";

interface TimerControlsProps {
  isPaused: boolean;
  onPlayPause: () => void;
  onReset: () => void;
  onOpenSettings: () => void;
}

export function TimerControls({
  isPaused,
  onPlayPause,
  onReset,
  onOpenSettings,
}: TimerControlsProps) {
  const { currentTheme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center gap-3"
    >
      <Button
        onClick={onPlayPause}
        size="lg"
        variant={isPaused ? "default" : "secondary"}
        className="h-12 px-6 text-lg font-medium transition-all duration-300"
      >
        {isPaused ? (
          <>
            <Play className="mr-2 h-5 w-5" /> Start
          </>
        ) : (
          <>
            <Pause className="mr-2 h-5 w-5" /> Pause
          </>
        )}
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={onReset}
        className="rounded-full h-10 w-10 transition-all hover:bg-muted"
        aria-label="Reset timer"
      >
        <RotateCcw className="h-5 w-5" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={onOpenSettings}
        className="rounded-full h-10 w-10 transition-all hover:bg-muted"
        aria-label="Open settings"
      >
        <Settings className="h-5 w-5" />
      </Button>
    </motion.div>
  );
}