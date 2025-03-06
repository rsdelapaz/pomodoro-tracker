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
    <div className="flex justify-center items-center gap-2 mb-6 p-1 bg-background/40 backdrop-blur-sm rounded-lg border border-border/20 shadow-sm">
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
  const { currentTheme } = useTheme();

  return (
    <button
      className={`
        px-4 py-2 
        text-sm 
        rounded-md
        transition-all duration-200
        ${active 
          ? 'bg-primary/10 text-foreground font-medium shadow-inner' 
          : 'bg-background/80 text-muted-foreground hover:bg-background/90 shadow-sm'}
        border border-border/30
      `}
      onClick={onClick}
      aria-pressed={active}
    >
      <span>
        {label}
      </span>
    </button>
  );
}