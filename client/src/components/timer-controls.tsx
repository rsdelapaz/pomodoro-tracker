import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Settings } from "lucide-react";

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
  onOpenSettings 
}: TimerControlsProps) {
  return (
    <div className="flex gap-4 items-center">
      <Button
        size="lg"
        variant="outline"
        onClick={onReset}
      >
        <RotateCcw className="h-4 w-4" />
      </Button>
      <Button
        size="lg"
        onClick={onPlayPause}
        variant="default"
        className="w-32"
      >
        {isPaused ? (
          <Play className="h-4 w-4 mr-2" />
        ) : (
          <Pause className="h-4 w-4 mr-2" />
        )}
        {isPaused ? 'Start' : 'Pause'}
      </Button>
      <Button
        size="lg"
        variant="outline"
        onClick={onOpenSettings}
      >
        <Settings className="h-4 w-4" />
      </Button>
    </div>
  );
}
