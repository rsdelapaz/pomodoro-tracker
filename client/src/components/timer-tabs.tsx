
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
      <Tabs 
        value={activeTab} 
        onValueChange={(value) => onChangeTab(value as 'pomodoro' | 'shortBreak' | 'longBreak')}
        className="w-full max-w-md"
      >
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="pomodoro" className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>Pomodoro</span>
          </TabsTrigger>
          <TabsTrigger value="shortBreak" className="flex items-center gap-1">
            <Coffee className="h-4 w-4" />
            <span>Short Break</span>
          </TabsTrigger>
          <TabsTrigger value="longBreak" className="flex items-center gap-1">
            <Battery className="h-4 w-4" />
            <span>Long Break</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </motion.div>
  );
}
