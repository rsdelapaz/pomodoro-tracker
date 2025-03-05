import { useEffect, useState } from "react";
import { settingsSchema, timerStateSchema, type Settings, type TimerState } from "@shared/schema";
import { TimerDisplay } from "@/components/timer-display";
import { TimerControls } from "@/components/timer-controls";
import { SettingsDialog } from "@/components/settings-dialog";
import { StatsDisplay } from "@/components/stats-display";
import { audioPlayer } from "@/lib/audio";
import { Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const defaultSettings: Settings = {
  workMinutes: 25,
  breakMinutes: 5,
  volume: 0.5
};

const defaultState: TimerState = {
  isWorking: true,
  isPaused: true,
  timeLeft: 25 * 60,
  totalWorkSessions: 0,
  totalWorkMinutes: 0,
  totalBreakMinutes: 0
};

export default function Home() {
  const [settings, setSettings] = useState<Settings>(() => {
    const saved = localStorage.getItem('pomodoro-settings');
    if (saved) {
      const parsed = settingsSchema.safeParse(JSON.parse(saved));
      if (parsed.success) return parsed.data;
    }
    return defaultSettings;
  });

  const [state, setState] = useState<TimerState>(() => {
    const saved = localStorage.getItem('pomodoro-state');
    if (saved) {
      const parsed = timerStateSchema.safeParse(JSON.parse(saved));
      if (parsed.success) return parsed.data;
    }
    return {
      ...defaultState,
      timeLeft: settings.workMinutes * 60
    };
  });

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [zenMode, setZenMode] = useState(false);

  // Save state and settings to localStorage
  useEffect(() => {
    localStorage.setItem('pomodoro-settings', JSON.stringify(settings));
    localStorage.setItem('pomodoro-state', JSON.stringify(state));
  }, [settings, state]);

  // Timer logic
  useEffect(() => {
    if (state.isPaused) return;

    const interval = setInterval(() => {
      setState(prev => {
        if (prev.timeLeft <= 0) {
          audioPlayer.playNotification();
          const newIsWorking = !prev.isWorking;
          const timeLeft = (newIsWorking ? settings.workMinutes : settings.breakMinutes) * 60;

          return {
            ...prev,
            isWorking: newIsWorking,
            timeLeft,
            totalWorkSessions: newIsWorking ? prev.totalWorkSessions : prev.totalWorkSessions + 1,
            totalWorkMinutes: prev.totalWorkMinutes + (prev.isWorking ? 1/60 : 0),
            totalBreakMinutes: prev.totalBreakMinutes + (!prev.isWorking ? 1/60 : 0)
          };
        }

        return {
          ...prev,
          timeLeft: prev.timeLeft - 1,
          totalWorkMinutes: prev.totalWorkMinutes + (prev.isWorking ? 1/60 : 0),
          totalBreakMinutes: prev.totalBreakMinutes + (!prev.isWorking ? 1/60 : 0)
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [state.isPaused, settings]);

  // Update audio volume when settings change
  useEffect(() => {
    audioPlayer.setVolume(settings.volume);
  }, [settings.volume]);

  const handlePlayPause = () => {
    setState(prev => ({ ...prev, isPaused: !prev.isPaused }));
  };

  const handleReset = () => {
    setState(prev => ({
      ...prev,
      isPaused: true,
      timeLeft: (prev.isWorking ? settings.workMinutes : settings.breakMinutes) * 60
    }));
  };

  const handleSaveSettings = (newSettings: Settings) => {
    setSettings(newSettings);
    setState(prev => ({
      ...prev,
      timeLeft: (prev.isWorking ? newSettings.workMinutes : newSettings.breakMinutes) * 60
    }));
  };

  return (
    <div className="relative min-h-screen w-full bg-background overflow-hidden">
      {/* Animated gradient background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/10 animate-gradient-slow pointer-events-none"
        style={{
          maskImage: 'radial-gradient(circle at center, transparent 0%, black 100%)',
          WebkitMaskImage: 'radial-gradient(circle at center, transparent 0%, black 100%)'
        }}
      />

      <div className="relative min-h-screen w-full flex flex-col items-center justify-center gap-8 p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key="timer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center gap-8"
          >
            <TimerDisplay 
              state={state}
              totalTime={(state.isWorking ? settings.workMinutes : settings.breakMinutes) * 60}
            />
            <TimerControls
              isPaused={state.isPaused}
              onPlayPause={handlePlayPause}
              onReset={handleReset}
              onOpenSettings={() => setSettingsOpen(true)}
            />
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {!zenMode && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <StatsDisplay
                totalWorkSessions={state.totalWorkSessions}
                totalWorkMinutes={Math.floor(state.totalWorkMinutes)}
                totalBreakMinutes={Math.floor(state.totalBreakMinutes)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          variant="ghost"
          size="icon"
          className="fixed bottom-4 right-4"
          onClick={() => setZenMode(!zenMode)}
        >
          {zenMode ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
        </Button>

        <SettingsDialog
          open={settingsOpen}
          onOpenChange={setSettingsOpen}
          settings={settings}
          onSave={handleSaveSettings}
        />
      </div>
    </div>
  );
}