
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { PauseIcon, PlayIcon, RotateCcw, Settings2, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/lib/theme";

interface TimerControlsProps {
  isPaused: boolean;
  onPlayPause: () => void;
  onReset: () => void;
  onOpenSettings: () => void;
  onStartWork: () => void;
  onStartShortBreak: () => void;
  onStartLongBreak: () => void;
  onOpenHelp: () => void;
}

export function TimerControls({
  isPaused,
  onPlayPause,
  onReset,
  onOpenSettings,
  onStartWork,
  onStartShortBreak,
  onStartLongBreak,
  onOpenHelp,
}: TimerControlsProps) {
  const { currentTheme } = useTheme();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  // Define colors that work well with all themes while maintaining distinction between buttons
  const getButtonStyles = (index: number) => {
    const isHovered = hoverIndex === index;
    
    if (index === 0) { // Work button
      return {
        className: "bg-primary text-primary-foreground hover:bg-primary/90",
        style: { transform: isHovered ? 'scale(1.05)' : 'scale(1)' }
      };
    } else if (index === 1) { // Short break button
      return {
        className: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
        style: { transform: isHovered ? 'scale(1.05)' : 'scale(1)' }
      };
    } else { // Long break button
      return {
        className: "bg-accent text-accent-foreground hover:bg-accent/90",
        style: { transform: isHovered ? 'scale(1.05)' : 'scale(1)' }
      };
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-wrap justify-center gap-2">
        <Button 
          onClick={onStartWork}
          {...getButtonStyles(0)}
          onMouseEnter={() => setHoverIndex(0)}
          onMouseLeave={() => setHoverIndex(null)}
        >
          Start Work
        </Button>
        <Button 
          onClick={onStartShortBreak}
          {...getButtonStyles(1)}
          onMouseEnter={() => setHoverIndex(1)}
          onMouseLeave={() => setHoverIndex(null)}
        >
          Short Break
        </Button>
        <Button 
          onClick={onStartLongBreak}
          {...getButtonStyles(2)}
          onMouseEnter={() => setHoverIndex(2)}
          onMouseLeave={() => setHoverIndex(null)}
        >
          Long Break
        </Button>
      </div>
      
      <div className="flex justify-center items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={onPlayPause}
          className="rounded-full h-12 w-12"
        >
          {isPaused ? (
            <PlayIcon className="h-6 w-6" />
          ) : (
            <PauseIcon className="h-6 w-6" />
          )}
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          onClick={onReset}
          className="rounded-full"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          onClick={onOpenSettings}
          className="rounded-full"
        >
          <Settings2 className="h-4 w-4" />
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          onClick={onOpenHelp}
          className="rounded-full"
        >
          <HelpCircle className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
