
import { useState } from "react";
import { Play, Pause, RotateCcw, Settings, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useTheme } from "@/lib/theme";

interface TimerControlsProps {
  isWorking: boolean;
  isPaused: boolean;
  breakType: string;
  onStartWork: () => void;
  onStartBreak: (type: string) => void;
  onPause: () => void;
  onReset: () => void;
  onSettings: () => void;
  onHelp: () => void;
}

export default function TimerControls({
  isWorking,
  isPaused,
  breakType,
  onStartWork,
  onStartBreak,
  onPause,
  onReset,
  onSettings,
  onHelp,
}: TimerControlsProps) {
  const { currentTheme } = useTheme();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  return (
    <motion.div
      className="flex flex-col items-center justify-center space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-center space-x-4">
        <Button
          variant={isWorking ? "default" : "outline"}
          size="lg"
          className={cn(
            "text-md font-semibold min-w-[120px] transition-all",
            isWorking && "ring-2 ring-primary",
            !isWorking && "hover:bg-primary/20 hover:text-primary"
          )}
          onClick={onStartWork}
        >
          Work
        </Button>
        <Button
          variant={!isWorking && breakType === "short" ? "secondary" : "outline"}
          size="lg"
          className={cn(
            "text-md font-semibold min-w-[120px] transition-all text-foreground", 
            !isWorking && breakType === "short" && "ring-2 ring-secondary bg-secondary/80 text-secondary-foreground",
            isWorking && "hover:bg-secondary/20 hover:text-secondary"
          )}
          onClick={() => onStartBreak("short")}
        >
          Short Break
        </Button>
        <Button
          variant={!isWorking && breakType === "long" ? "secondary" : "outline"}
          size="lg"
          className={cn(
            "text-md font-semibold min-w-[120px] transition-all text-foreground", 
            !isWorking && breakType === "long" && "ring-2 ring-secondary bg-secondary/80 text-secondary-foreground",
            isWorking && "hover:bg-secondary/20 hover:text-secondary"
          )}
          onClick={() => onStartBreak("long")}
        >
          Long Break
        </Button>
      </div>

      <div className="flex items-center justify-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          className="h-12 w-12 rounded-full hover:bg-primary/20"
          onClick={isPaused ? () => {} : onPause}
          disabled={isPaused}
        >
          <Pause className="h-6 w-6" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-12 w-12 rounded-full hover:bg-primary/20"
          onClick={!isPaused ? () => {} : () => {
            if (isWorking) {
              onStartWork();
            } else {
              onStartBreak(breakType);
            }
          }}
          disabled={!isPaused}
        >
          <Play className="h-6 w-6" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-12 w-12 rounded-full hover:bg-primary/20"
          onClick={onReset}
        >
          <RotateCcw className="h-6 w-6" />
        </Button>
      </div>

      <div className="flex items-center justify-center space-x-4 mt-4">
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full hover:bg-primary/10"
          onClick={onSettings}
        >
          <Settings className="h-5 w-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full hover:bg-primary/10"
          onClick={onHelp}
        >
          <HelpCircle className="h-5 w-5" />
        </Button>
      </div>
    </motion.div>
  );
}
