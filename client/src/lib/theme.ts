import { createContext, useContext } from "react";

export type ThemeColor = {
  name: string;
  primary: string;
  secondary: string; // Added for minute/second color transitions
  gradientStyle: string;
  cssProperties: {
    '--primary': string;
    '--ring': string;
    '--secondary': string; // For second color
  };
};

export const themeColors: ThemeColor[] = [
  {
    name: "Neon Green",
    primary: "hsl(148, 100%, 63%)",
    secondary: "hsl(180, 100%, 60%)",
    gradientStyle: "from-background via-background to-[hsl(148,100%,63%)]/10",
    cssProperties: {
      '--primary': "148 100% 63%",
      '--ring': "148 100% 63%",
      '--secondary': "180 100% 60%"
    }
  },
  {
    name: "Neon Cyan",
    primary: "hsl(180, 100%, 60%)",
    secondary: "hsl(205, 100%, 65%)",
    gradientStyle: "from-background via-background to-[hsl(180,100%,60%)]/10",
    cssProperties: {
      '--primary': "180 100% 60%",
      '--ring': "180 100% 60%",
      '--secondary': "205 100% 65%"
    }
  },
  {
    name: "Neon Pink",
    primary: "hsl(330, 100%, 65%)",
    secondary: "hsl(280, 100%, 70%)",
    gradientStyle: "from-background via-background to-[hsl(330,100%,65%)]/10",
    cssProperties: {
      '--primary': "330 100% 65%",
      '--ring': "330 100% 65%",
      '--secondary': "280 100% 70%"
    }
  },
  {
    name: "Neon Purple",
    primary: "hsl(265, 100%, 65%)",
    secondary: "hsl(290, 100%, 70%)",
    gradientStyle: "from-background via-background to-[hsl(265,100%,65%)]/10",
    cssProperties: {
      '--primary': "265 100% 65%",
      '--ring': "265 100% 65%",
      '--secondary': "290 100% 70%"
    }
  },
  {
    name: "Neon Gold",
    primary: "hsl(45, 100%, 65%)",
    secondary: "hsl(30, 100%, 70%)",
    gradientStyle: "from-background via-background to-[hsl(45,100%,65%)]/10",
    cssProperties: {
      '--primary': "45 100% 65%",
      '--ring': "45 100% 65%",
      '--secondary': "30 100% 70%"
    }
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