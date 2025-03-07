import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Coffee, Battery } from "lucide-react";
import { cn } from "@/lib/utils";

type TabType = 'pomodoro' | 'shortBreak' | 'longBreak';

interface TimerTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function TimerTabs({ activeTab, onTabChange }: TimerTabsProps) {
  const tabs = [
    { id: 'pomodoro', label: 'Pomodoro', icon: <Clock className="w-4 h-4" /> },
    { id: 'shortBreak', label: 'Short Break', icon: <Coffee className="w-4 h-4" /> },
    { id: 'longBreak', label: 'Long Break', icon: <Battery className="w-4 h-4" /> },
  ];

  return (
    <div className="bg-background/30 backdrop-blur-sm rounded-lg p-1 shadow-md border border-border/40 flex mb-8">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id as TabType)}
          className={cn(
            "relative px-5 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2",
            activeTab === tab.id 
              ? "text-foreground bg-muted shadow-sm" 
              : "text-muted-foreground hover:text-foreground hover:bg-background/50"
          )}
        >
          {tab.icon}
          {tab.label}
          {activeTab === tab.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-background/90 rounded-md -z-10"
              initial={false}
              transition={{ type: "spring", duration: 0.5 }}
            />
          )}
        </button>
      ))}
    </div>
  );
}