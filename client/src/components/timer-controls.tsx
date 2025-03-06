import { Button } from "@/components/ui/button";
import { Play, Pause, RefreshCw, Settings2 } from "lucide-react";

interface TimerControlsProps {
  isPaused: boolean;
  onPlayPause: () => void;
  onReset: () => void;
  onOpenSettings: () => void;
  onStartWork?: () => void;
  onStartShortBreak?: () => void;
  onStartLongBreak?: () => void;
}

export function TimerControls({ 
  isPaused, 
  onPlayPause, 
  onReset, 
  onOpenSettings, 
  onStartWork,
  onStartShortBreak,
  onStartLongBreak
}: TimerControlsProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-2">
        <Button onClick={onPlayPause} size="lg" className="w-24 h-12">
          {isPaused ? (
            <>
              <Play className="mr-2 h-5 w-5" />
              Start
            </>
          ) : (
            <>
              <Pause className="mr-2 h-5 w-5" />
              Pause
            </>
          )}
        </Button>
        <Button onClick={onReset} size="icon" variant="outline" className="h-12 w-12">
          <RefreshCw className="h-5 w-5" />
        </Button>
        <Button onClick={onOpenSettings} size="icon" variant="outline" className="h-12 w-12">
          <Settings2 className="h-5 w-5" />
        </Button>
      </div>

      {isPaused && (
        <div className="flex items-center gap-2 mt-2">
          {onStartWork && (
            <Button onClick={onStartWork} variant="secondary" size="sm">
              Start Work
            </Button>
          )}
          {onStartShortBreak && (
            <Button onClick={onStartShortBreak} variant="secondary" size="sm">
              Short Break
            </Button>
          )}
          {onStartLongBreak && (
            <Button onClick={onStartLongBreak} variant="secondary" size="sm">
              Long Break
            </Button>
          )}
        </div>
      )}
    </div>
  );
}