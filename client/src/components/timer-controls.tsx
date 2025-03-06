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
  onOpenHelp?: () => void; // Added for help button
}

export function TimerControls({ 
  isPaused, 
  onPlayPause, 
  onReset, 
  onOpenSettings, 
  onStartWork,
  onStartShortBreak,
  onStartLongBreak,
  onOpenHelp, // Added for help button
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
        <Button onClick={onOpenHelp} size="icon" variant="outline" className="h-12 w-12">
          {/* Add a help icon here */}
          Help
        </Button> {/* Added Help button */}
      </div>

      {isPaused && (
        <div className="flex items-center gap-2 mt-2">
          {onStartWork && (
            <Button onClick={onStartWork} variant="secondary" size="sm">
              Start Work
            </Button>
          )}
          {onStartShortBreak && (
            <Button onClick={onStartShortBreak} variant="secondary" size="sm" className="bg-primary/70 hover:bg-primary/90 text-primary-foreground">
              Short Break
            </Button>
          )}
          {onStartLongBreak && (
            <Button onClick={onStartLongBreak} variant="secondary" size="sm" className="bg-secondary hover:bg-secondary/80 text-secondary-foreground">
              Long Break
            </Button>
          )}
        </div>
      )}
    </div>
  );
}