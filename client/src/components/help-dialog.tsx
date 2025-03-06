
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Settings,
  RotateCcw,
  PauseCircle,
  PlayCircle,
  Clock,
  Coffee,
  Battery,
  HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface HelpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HelpDialog({ open, onOpenChange }: HelpDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">
            How to Use the Pomodoro App
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm">
            A simple guide to help you get started with the Pomodoro technique.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="rounded-lg bg-card p-4 shadow-sm border">
            <h3 className="text-lg font-semibold mb-3 text-foreground flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" /> Introducing the Pomodoro Technique
            </h3>
            <p className="text-muted-foreground">
              The Pomodoro Technique is a time management method that uses alternating periods of 
              focused work and breaks to improve productivity and reduce mental fatigue.
            </p>
          </div>

          <div className="rounded-lg bg-background p-6 shadow-md border">
            <h3 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" /> Using the Pomodoro Timer
            </h3>
            <div className="space-y-4 pl-4 border-l-2 border-primary/30">
              <div>
                <h4 className="font-medium text-foreground mb-2">Timer Modes</h4>
                <div className="space-y-3 mb-4">
                  <p className="flex items-center gap-2 text-foreground">
                    <Clock className="h-5 w-5 text-primary" />
                    <span><strong>Pomodoro</strong> — Work session (default: 25 minutes)</span>
                  </p>
                  <p className="flex items-center gap-2 text-foreground">
                    <Coffee className="h-5 w-5 text-secondary" />
                    <span><strong>Short Break</strong> — Brief rest (default: 5 minutes)</span>
                  </p>
                  <p className="flex items-center gap-2 text-foreground">
                    <Battery className="h-5 w-5 text-accent" />
                    <span><strong>Long Break</strong> — Extended rest (default: 15 minutes)</span>
                  </p>
                </div>
                <p className="text-foreground/80 mt-2">
                  Switch between modes by clicking the subtle tab names at the top of the timer.
                  The active mode is indicated by a small highlight line beneath the selected option.
                </p>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium text-foreground mb-2">Controls</h4>
                <div className="space-y-3">
                  <p className="flex items-start gap-2 text-foreground">
                    <PlayCircle className="h-5 w-5 mt-0.5 text-primary" />
                    <span><strong>Start/Pause</strong> — Begin or pause the timer. The button changes appearance to indicate the current state.</span>
                  </p>
                  <p className="flex items-start gap-2 text-foreground">
                    <RotateCcw className="h-5 w-5 mt-0.5 text-primary" />
                    <span><strong>Reset</strong> — Reset the current timer to its starting duration.</span>
                  </p>
                  <p className="flex items-start gap-2 text-foreground">
                    <Settings className="h-5 w-5 mt-0.5 text-primary" />
                    <span><strong>Settings</strong> — Customize timer durations, notification sounds, and other preferences.</span>
                  </p>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium text-foreground mb-2">The Pomodoro Technique</h4>
                <ol className="list-decimal pl-5 space-y-2 text-foreground/90">
                  <li>Set your timer for 25 minutes (a "Pomodoro") and focus on a single task until the timer rings.</li>
                  <li>Take a short 5-minute break.</li>
                  <li>After completing four Pomodoros, take a longer 15-minute break.</li>
                  <li>Repeat this cycle to maintain focus and prevent mental fatigue.</li>
                </ol>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-card p-4 shadow-sm border">
            <h3 className="text-lg font-semibold mb-3 text-foreground flex items-center gap-2">
              <PlayCircle className="h-5 w-5 text-primary" /> Timer Controls
            </h3>
            <div className="space-y-3 pl-4 border-l-2 border-muted">
              <p className="flex items-center gap-2 text-foreground">
                <Button size="sm" variant="default" className="pointer-events-none">
                  <PlayCircle className="h-4 w-4 mr-1" /> Start
                </Button>
                <span>— Start the selected timer (changes to Pause when running)</span>
              </p>
              <p className="flex items-center gap-2 text-foreground">
                <Button size="sm" variant="outline" className="pointer-events-none">
                  <RotateCcw className="h-4 w-4" />
                </Button>
                <span>— Reset the current timer</span>
              </p>
              <p className="flex items-center gap-2 text-foreground">
                <Button size="sm" variant="outline" className="pointer-events-none">
                  <Settings className="h-4 w-4" />
                </Button>
                <span>— Customize timer durations and sound settings</span>
              </p>
              <p className="flex items-center gap-2 text-foreground">
                <Button size="sm" variant="outline" className="pointer-events-none">
                  <HelpCircle className="h-4 w-4" />
                </Button>
                <span>— Open this help guide</span>
              </p>
            </div>
          </div>

          <div className="rounded-lg bg-card p-4 shadow-sm border">
            <h3 className="text-lg font-semibold mb-3 text-foreground flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" /> Recommended Workflow
            </h3>
            <ol className="list-decimal pl-6 space-y-2 text-foreground">
              <li>Select <strong>Pomodoro</strong> tab for a work session</li>
              <li>Click the Start button and focus on your task</li>
              <li>When the timer ends, an alarm will sound</li>
              <li>Select <strong>Short Break</strong> tab and take a brief rest</li>
              <li>After 4 work sessions, take a <strong>Long Break</strong></li>
              <li>Repeat the cycle to maximize productivity</li>
            </ol>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
