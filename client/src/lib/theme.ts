import { createContext, useContext } from "react";

export type ThemeColor = {
  name: string;
  primary: string;
  gradientStyle: string;
  cssProperties: {
    '--primary': string;
    '--ring': string;
  };
};

export const themeColors: ThemeColor[] = [
  {
    name: "Neon Green",
    primary: "hsl(148, 100%, 63%)",
    gradientStyle: "from-background via-background to-[hsl(148,100%,63%)]/10",
    cssProperties: {
      '--primary': "148 100% 63%",
      '--ring': "148 100% 63%",
    }
  },
  {
    name: "Neon Cyan",
    primary: "hsl(180, 100%, 60%)",
    gradientStyle: "from-background via-background to-[hsl(180,100%,60%)]/10",
    cssProperties: {
      '--primary': "180 100% 60%",
      '--ring': "180 100% 60%",
    }
  },
  {
    name: "Neon Pink",
    primary: "hsl(330, 100%, 65%)",
    gradientStyle: "from-background via-background to-[hsl(330,100%,65%)]/10",
    cssProperties: {
      '--primary': "330 100% 65%",
      '--ring': "330 100% 65%",
    }
  },
  {
    name: "Neon Purple",
    primary: "hsl(265, 100%, 65%)",
    gradientStyle: "from-background via-background to-[hsl(265,100%,65%)]/10",
    cssProperties: {
      '--primary': "265 100% 65%",
      '--ring': "265 100% 65%",
    }
  },
  {
    name: "Neon Gold",
    primary: "hsl(45, 100%, 65%)",
    gradientStyle: "from-background via-background to-[hsl(45,100%,65%)]/10",
    cssProperties: {
      '--primary': "45 100% 65%",
      '--ring': "45 100% 65%",
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