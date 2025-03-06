
import React from "react";
import { Clock, PlayCircle, PauseCircle, RefreshCw, RotateCcw, Settings, Moon, Volume2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface HelpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HelpDialog({ open, onOpenChange }: HelpDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto bg-card text-card-foreground">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Clock className="h-5 w-5" /> Pomodoro Timer - Help Guide
          </DialogTitle>
          <DialogDescription>
            Learn how to use this application effectively
          </DialogDescription>
        </DialogHeader>

        <div className="prose prose-sm dark:prose-invert mt-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <PlayCircle className="h-5 w-5 text-primary" /> What is the Pomodoro Technique?
          </h3>
          <p>
            The Pomodoro Technique is a time management method that uses a timer to break work into intervals, 
            traditionally 25 minutes in length, separated by short breaks. These intervals are known as "pomodoros".
          </p>

          <h3 className="text-lg font-semibold mt-6 flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" /> Basic Timer Controls
          </h3>
          <div className="pl-4 border-l-2 border-muted">
            <p className="flex items-center gap-2">
              <Button size="sm" variant="default" className="pointer-events-none">Start Work</Button>
              <span>— Begin a work session (default: 25 minutes)</span>
            </p>
            <p className="flex items-center gap-2">
              <Button size="sm" variant="secondary" className="pointer-events-none">Short Break</Button>
              <span>— Take a short break (default: 5 minutes)</span>
            </p>
            <p className="flex items-center gap-2">
              <Button size="sm" variant="secondary" className="pointer-events-none">Long Break</Button>
              <span>— Take a longer break (default: 15 minutes)</span>
            </p>
            <p className="flex items-center gap-2">
              <PauseCircle className="h-5 w-5 text-muted-foreground" />
              <span>— Pause the current timer</span>
            </p>
            <p className="flex items-center gap-2">
              <PlayCircle className="h-5 w-5 text-muted-foreground" />
              <span>— Resume the current timer</span>
            </p>
            <p className="flex items-center gap-2">
              <RotateCcw className="h-5 w-5 text-muted-foreground" />
              <span>— Reset the current timer</span>
            </p>
          </div>

          <h3 className="text-lg font-semibold mt-6 flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" /> Customizing Your Experience
          </h3>
          <div className="pl-4 border-l-2 border-muted">
            <p className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-muted-foreground" />
              <span>— Open settings to customize durations and volume</span>
            </p>
            <p className="flex items-center gap-2">
              <Volume2 className="h-5 w-5 text-muted-foreground" />
              <span>— Adjust notification volume in settings</span>
            </p>
            <p className="flex items-center gap-2">
              <Moon className="h-5 w-5 text-muted-foreground" />
              <span>— Toggle between different theme colors</span>
            </p>
          </div>

          <h3 className="text-lg font-semibold mt-6">Best Practices</h3>
          <ol className="list-decimal pl-5">
            <li>Complete one Pomodoro (work session) without interruption</li>
            <li>Take short breaks between Pomodoros to rest your mind</li>
            <li>After 4 Pomodoros, take a longer break (15-30 minutes)</li>
            <li>Use the timer to track your productivity throughout the day</li>
            <li>Adjust the work/break durations to find what works best for you</li>
          </ol>

          <h3 className="text-lg font-semibold mt-6">Tips for Success</h3>
          <ul className="list-disc pl-5">
            <li>Find a quiet place to work with minimal distractions</li>
            <li>Define clear tasks before starting each Pomodoro</li>
            <li>If you finish early, use the remaining time for review or planning</li>
            <li>During breaks, step away from your screen to rest your eyes</li>
            <li>Use Zen Mode <span className="inline-block">(minimize icon)</span> for focused work sessions</li>
          </ul>
        </div>

        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
