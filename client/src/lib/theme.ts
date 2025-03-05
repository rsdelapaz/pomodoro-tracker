import { createContext, useContext, useState } from "react";

export type ThemeColor = {
  name: string;
  primary: string;
  gradientStyle: string;
};

export const themeColors: ThemeColor[] = [
  {
    name: "Neon Green",
    primary: "hsl(148, 100%, 63%)",
    gradientStyle: "from-background via-background to-primary/10"
  },
  {
    name: "Neon Cyan",
    primary: "hsl(180, 100%, 60%)",
    gradientStyle: "from-background via-background to-cyan-500/10"
  },
  {
    name: "Neon Pink",
    primary: "hsl(330, 100%, 65%)",
    gradientStyle: "from-background via-background to-pink-500/10"
  },
  {
    name: "Neon Purple",
    primary: "hsl(265, 100%, 65%)",
    gradientStyle: "from-background via-background to-purple-500/10"
  },
  {
    name: "Neon Gold",
    primary: "hsl(45, 100%, 65%)",
    gradientStyle: "from-background via-background to-yellow-500/10"
  }
];

type ThemeContextType = {
  currentTheme: ThemeColor;
  setTheme: (theme: ThemeColor) => void;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
