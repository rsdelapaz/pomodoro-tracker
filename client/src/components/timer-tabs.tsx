import { motion } from "framer-motion";
import { useTheme } from "@/lib/theme";

type ActiveTab = 'pomodoro' | 'shortBreak' | 'longBreak';

interface TimerTabsProps {
  activeTab: ActiveTab;
  onChangeTab: (tab: ActiveTab) => void;
}

export function TimerTabs({ activeTab, onChangeTab }: TimerTabsProps) {
  const { currentTheme } = useTheme();

  return (
    <div className="flex justify-center items-center gap-8 mb-6">
      <TabButton 
        active={activeTab === 'pomodoro'} 
        onClick={() => onChangeTab('pomodoro')}
        label="Pomodoro"
        indicatorId="tab-indicator"
      />

      <TabButton 
        active={activeTab === 'shortBreak'} 
        onClick={() => onChangeTab('shortBreak')}
        label="Short Break"
        indicatorId="tab-indicator"
      />

      <TabButton 
        active={activeTab === 'longBreak'} 
        onClick={() => onChangeTab('longBreak')}
        label="Long Break"
        indicatorId="tab-indicator"
      />
    </div>
  );
}

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  label: string;
  indicatorId: string;
}

function TabButton({ active, onClick, label, indicatorId }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`relative text-sm px-1 py-1 transition-all ${
        active 
          ? 'text-foreground font-medium' 
          : 'text-muted-foreground hover:text-foreground/70'
      }`}
    >
      <span>{label}</span>
      {active && (
        <motion.div 
          layoutId={indicatorId}
          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </button>
  );
}