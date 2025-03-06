import { useEffect, useState } from "react";
import { settingsSchema, timerStateSchema, type Settings, type TimerState } from "@shared/schema";
import { TimerDisplay } from "@/components/timer-display";
import { TimerControls } from "@/components/timer-controls";
import { SettingsDialog } from "@/components/settings-dialog";
import { StatsDisplay } from "@/components/stats-display";
import { audioPlayer } from "@/lib/audio";
import { Maximize2, Minimize2, HelpCircle } from "lucide-react";
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
  const [activeTab, setActiveTab] = useState<ActiveTab>('pomodoro'); // Added state for active tab
  const { currentTheme } = useTheme();

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
          let timeLeft;
          if (newIsWorking) {
            timeLeft = settings.workMinutes * 60;
          } else {
            timeLeft = (activeTab === "shortBreak" ? settings.breakMinutes : settings.longBreakMinutes) * 60;
          }

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
  }, [state.isPaused, settings, activeTab]); // Added activeTab to dependencies

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

  const handlePlayPause = () => {
    setState(prev => ({ ...prev, isPaused: !prev.isPaused }));
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
    setActiveTab(tab);

    // Only automatically start timer if user changes tab while timer is paused
    if (state.isPaused) {
      let newTimeLeft = settings.workMinutes * 60;
      let isWorkingNew = true;

      if (tab === 'shortBreak') {
        newTimeLeft = settings.breakMinutes * 60;
        isWorkingNew = false;
      } else if (tab === 'longBreak') {
        newTimeLeft = settings.longBreakMinutes * 60;
        isWorkingNew = false;
      }

      setState({
        ...state,
        timeLeft: newTimeLeft,
        isWorking: isWorkingNew,
        isPaused: true // Keep timer paused when switching tabs
      });
    }
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
        <div className="flex w-full justify-center"> {/*Added Tab Container*/}
          <div className="flex gap-4">
            <span onClick={() => handleTabChange('pomodoro')} className={`${activeTab === 'pomodoro' ? 'text-blue-500 font-bold underline' : 'text-gray-300 hover:text-gray-400'}`}>Pomodoro</span>
            <span onClick={() => handleTabChange('shortBreak')} className={`${activeTab === 'shortBreak' ? 'text-blue-500 font-bold underline' : 'text-gray-300 hover:text-gray-400'}`}>Short Break</span>
            <span onClick={() => handleTabChange('longBreak')} className={`${activeTab === 'longBreak' ? 'text-blue-500 font-bold underline' : 'text-gray-300 hover:text-gray-400'}`}>Long Break</span>
          </div>
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
            <div className="flex gap-4"> {/*Simplified Controls*/}
              <Button onClick={handlePlayPause} className={`${state.isPaused ? 'bg-blue-500 text-white' : 'bg-gray-500 text-white'}`}> {state.isPaused ? 'Start' : 'Pause'}</Button>
              <Button onClick={handleReset} className="bg-gray-600 hover:bg-gray-700 text-white">Reset</Button> {/* Reverted reset button design */}
            </div>
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
        {!zenMode && (
          <div className="fixed top-4 right-4 flex gap-2">
            <button
              onClick={() => setHelpOpen(true)}
              className="p-2 rounded-full bg-background/40 hover:bg-background/60 text-foreground/70 hover:text-foreground transition-all"
              aria-label="Help"
            >
              <HelpCircle className="h-4 w-4" />
            </button>
            <button
              onClick={() => setZenMode(true)}
              className="p-2 rounded-full bg-muted/80 hover:bg-muted text-foreground"
            >
              <Minimize2 className="h-5 w-5" />
            </button>
          </div>
        )}
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