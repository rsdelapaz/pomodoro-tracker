
import { Clock, Coffee, Battery } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { motion } from "framer-motion";

interface TimerTabsProps {
  activeTab: 'pomodoro' | 'shortBreak' | 'longBreak';
  onChangeTab: (tab: 'pomodoro' | 'shortBreak' | 'longBreak') => void;
}

export function TimerTabs({ activeTab, onChangeTab }: TimerTabsProps) {
  const { currentTheme } = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-center items-center gap-8 mb-6">
        <button
          onClick={() => onChangeTab('pomodoro')}
          className={`relative flex items-center gap-1 text-sm px-1 py-1 transition-all ${
            activeTab === 'pomodoro' 
              ? 'text-foreground font-medium' 
              : 'text-muted-foreground hover:text-foreground/70'
          }`}
        >
          <span>Pomodoro</span>
          {activeTab === 'pomodoro' && (
            <motion.div 
              layoutId="activeTabIndicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </button>
        
        <button
          onClick={() => onChangeTab('shortBreak')}
          className={`relative flex items-center gap-1 text-sm px-1 py-1 transition-all ${
            activeTab === 'shortBreak' 
              ? 'text-foreground font-medium' 
              : 'text-muted-foreground hover:text-foreground/70'
          }`}
        >
          <span>Short Break</span>
          {activeTab === 'shortBreak' && (
            <motion.div 
              layoutId="activeTabIndicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </button>
        
        <button
          onClick={() => onChangeTab('longBreak')}
          className={`relative flex items-center gap-1 text-sm px-1 py-1 transition-all ${
            activeTab === 'longBreak' 
              ? 'text-foreground font-medium' 
              : 'text-muted-foreground hover:text-foreground/70'
          }`}
        >
          <span>Long Break</span>
          {activeTab === 'longBreak' && (
            <motion.div 
              layoutId="activeTabIndicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </button>
      </div>
    </motion.div>
  );
}
