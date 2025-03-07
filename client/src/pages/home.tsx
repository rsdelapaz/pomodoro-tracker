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
import { ThemeSelector } from "@/components/theme-selector";
import { useTheme } from "@/lib/theme";

const defaultSettings: Settings = {
  workMinutes: 25,
  breakMinutes: 5,
  longBreakMinutes: 15,
  volume: 0.8,
  useNotifications: true
};

const defaultState: TimerState = {
  isWorking: true,
  isPaused: true,
  timeLeft: 25 * 60,
  totalWorkSessions: 0,
  totalWorkMinutes: 0,
  totalBreakMinutes: 0
};

import { HelpDialog } from "@/components/help-dialog";
import { TimerTabs } from "@/components/timer-tabs";

type ActiveTab = 'pomodoro' | 'shortBreak' | 'longBreak';

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
  const [helpOpen, setHelpOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>('pomodoro');
  const { currentTheme } = useTheme();

  // Save state and settings to localStorage
  useEffect(() => {
    localStorage.setItem('pomodoro-settings', JSON.stringify(settings));
    localStorage.setItem('pomodoro-state', JSON.stringify(state));
  }, [settings, state]);

  // Retrieve zen mode state from localStorage
  useEffect(() => {
    const savedZenMode = localStorage.getItem('pomodoro-zen-mode');
    if (savedZenMode !== null) {
      setZenMode(JSON.parse(savedZenMode));
    }
  }, []);

  // This function is defined again later with more functionality, so removing this duplicate

  useEffect(() => {
    // Save zen mode state to localStorage whenever it changes
    localStorage.setItem('pomodoro-zen-mode', JSON.stringify(zenMode));
  }, [zenMode]);

  // Timer logic
  useEffect(() => {
    if (state.isPaused) return;

    const timer = setInterval(() => {
      setState(prev => {
        if (prev.timeLeft <= 1) {
          // Timer completed
          clearInterval(timer);

          // Play sound when timer completes
          audioPlayer.playNotification();

          // Show browser notification if enabled
          if (settings.useNotifications) {
            // Request notification permission if not already granted
            if (Notification.permission !== "granted") {
              Notification.requestPermission();
            }

            if (Notification.permission === "granted") {
              new Notification('Pomodoro Timer', {
                body: prev.isWorking ? 'Work session completed! Time for a break.' : 'Break completed! Ready to focus again?',
                icon: '/favicon.ico'
              });
            }
          }

          // Update stats
          const newState = { ...prev, isPaused: true };
          if (prev.isWorking) {
            newState.totalWorkSessions = prev.totalWorkSessions + 1;
            newState.totalWorkMinutes = prev.totalWorkMinutes + settings.workMinutes;

            // Automatically transition to Short Break after work session
            setTimeout(() => {
              setActiveTab('shortBreak');
              setState(current => ({
                ...current,
                isWorking: false,
                timeLeft: settings.breakMinutes * 60
              }));
            }, 500);
          } else {
            newState.totalBreakMinutes = prev.totalBreakMinutes + 
              (activeTab === 'shortBreak' ? settings.breakMinutes : settings.longBreakMinutes);

            // Automatically transition back to Pomodoro after break
            setTimeout(() => {
              setActiveTab('pomodoro');
              setState(current => ({
                ...current,
                isWorking: true,
                timeLeft: settings.workMinutes * 60
              }));
            }, 500);
          }

          return newState;
        } else {
          return { ...prev, timeLeft: prev.timeLeft - 1 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [state.isPaused, settings, activeTab]);

  // Request notification permission on first render
  useEffect(() => {
    if (settings.useNotifications && Notification.permission !== "granted" && Notification.permission !== "denied") {
      Notification.requestPermission();
    }
  }, []);

  // Update audio volume when settings change
  useEffect(() => {
    audioPlayer.setVolume(settings.volume);
  }, [settings.volume]);

  const handleTimerStart = () => {
    setState(prev => ({ ...prev, isPaused: false }));
  };

  const handleTimerPause = () => {
    setState(prev => ({ ...prev, isPaused: true }));
  };

  const handleReset = () => {
    setState(prev => ({
      ...prev,
      isPaused: true,
      timeLeft: (prev.isWorking ? settings.workMinutes : 
        (activeTab === "shortBreak" ? settings.breakMinutes : settings.longBreakMinutes)) * 60
    }));
  };

  const handleSaveSettings = (newSettings: Settings) => {
    setSettings(newSettings);
    localStorage.setItem('pomodoroSettings', JSON.stringify(newSettings));
  };

  const handleTabChange = (tab: ActiveTab) => {
    // Reset the timer state when changing tabs
    let newTimeLeft = 0;
    let isWorkingNew = false;

    if (tab === 'pomodoro') {
      newTimeLeft = settings.workMinutes * 60;
      isWorkingNew = true;
    } else if (tab === 'shortBreak') {
      newTimeLeft = settings.breakMinutes * 60;
      isWorkingNew = false;
    } else if (tab === 'longBreak') {
      newTimeLeft = settings.longBreakMinutes * 60;
      isWorkingNew = false;
    }

    // Always reset timer when changing tabs
    setState(prev => ({
      ...prev,
      isPaused: true, // Always pause when switching tabs
      isWorking: isWorkingNew,
      timeLeft: newTimeLeft
    }));

    // Play a subtle sound effect to indicate tab change
    if (audioPlayer && audioPlayer.play) {
      audioPlayer.play('switch');
    }

    // Update the active tab
    setActiveTab(tab);
  };

  const handleStart = () => {
    setState(prev => ({ ...prev, isPaused: false }));
  };


  return (
    <div className="relative min-h-screen w-full bg-background overflow-hidden">
      {/* Animated gradient background */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${currentTheme.gradientStyle} animate-gradient-slow pointer-events-none`}
        style={{
          maskImage: 'radial-gradient(circle at center, transparent 0%, black 100%)',
          WebkitMaskImage: 'radial-gradient(circle at center, transparent 0%, black 100%)'
        }}
      />

      <div className="relative min-h-screen w-full flex flex-col items-center justify-center gap-8 p-4">
        <div className="flex w-full justify-center">
          <TimerTabs activeTab={activeTab} onTabChange={handleTabChange} />
        </div>
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
              totalTime={(activeTab === 'pomodoro' ? settings.workMinutes : (activeTab === 'shortBreak' ? settings.breakMinutes : settings.longBreakMinutes)) * 60}
            />
            <TimerControls 
              isPaused={state.isPaused}
              onStart={handleTimerStart}
              onPause={handleTimerPause}
              onReset={handleReset}
              onSettingsClick={() => setSettingsOpen(true)}
              
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
        <ThemeSelector />
        <div className={`fixed bottom-4 right-4 transition-opacity duration-200 ${zenMode ? 'opacity-100' : 'opacity-0'}`}>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setZenMode(false)}
            className="rounded-full hover:bg-primary/10 shadow-md"
            aria-label="Show controls"
          >
            <Maximize2 className="h-5 w-5" />
          </Button>
        </div>
        <div className={`absolute top-4 right-4 flex gap-2 transition-opacity duration-200 ${zenMode ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>

          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setZenMode(true)}
            className="rounded-full"
            aria-label="Hide controls"
          >
            <Minimize2 className="h-5 w-5" />
          </Button>
        </div>
        <SettingsDialog
          open={settingsOpen}
          onOpenChange={setSettingsOpen}
          settings={settings}
          onSave={handleSaveSettings}
        />
        <HelpDialog open={helpOpen} onOpenChange={setHelpOpen} />
      </div>
    </div>
  );
}