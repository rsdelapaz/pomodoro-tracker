import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Settings, RotateCcw, HelpCircle, PlayCircle, PauseCircle } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { motion } from "framer-motion";

interface TimerControlsProps {
  isPaused: boolean;
  onPlayPause: () => void;
  onReset: () => void;
  onOpenSettings: () => void;
  onOpenHelp: () => void;
}

export function TimerControls({
  isPaused,
  onPlayPause,
  onReset,
  onOpenSettings,
  onOpenHelp,
}: TimerControlsProps) {
  const { currentTheme } = useTheme();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  return (
    <motion.div 
      className="flex flex-wrap justify-center items-center gap-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      {/* Primary action button (Start/Pause) */}
      <Button
        size="lg" 
        className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
        onClick={onPlayPause}
        onMouseEnter={() => setHoverIndex(0)}
        onMouseLeave={() => setHoverIndex(null)}
        style={{ 
          transform: hoverIndex === 0 ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform 0.2s ease'
        }}
      >
        {isPaused ? (
          <PlayCircle className="mr-2 h-5 w-5" />
        ) : (
          <PauseCircle className="mr-2 h-5 w-5" />
        )}
        {isPaused ? "Start" : "Pause"}
      </Button>

      {/* Reset button */}
      <Button 
        size="icon" 
        variant="outline"
        onClick={onReset}
        onMouseEnter={() => setHoverIndex(1)}
        onMouseLeave={() => setHoverIndex(null)}
        style={{ 
          transform: hoverIndex === 1 ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform 0.2s ease'
        }}
      >
        <RotateCcw className="h-5 w-5" />
      </Button>

      {/* Settings button */}
      <Button 
        size="icon" 
        variant="outline"
        onClick={onOpenSettings}
        onMouseEnter={() => setHoverIndex(2)}
        onMouseLeave={() => setHoverIndex(null)}
        style={{ 
          transform: hoverIndex === 2 ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform 0.2s ease'
        }}
      >
        <Settings className="h-5 w-5" />
      </Button>

      {/* Help button */}
      <Button 
        size="icon" 
        variant="outline"
        onClick={onOpenHelp}
        onMouseEnter={() => setHoverIndex(3)}
        onMouseLeave={() => setHoverIndex(null)}
        style={{ 
          transform: hoverIndex === 3 ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform 0.2s ease'
        }}
      >
        <HelpCircle className="h-5 w-5" />
      </Button>
    </motion.div>
  );
}