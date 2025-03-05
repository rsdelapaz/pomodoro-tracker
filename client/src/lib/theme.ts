import { createContext, useContext } from "react";

export type AnimationStyle = {
  minutes: any;
  seconds: any;
  separator: any;
};

export type ThemeColor = {
  name: string;
  primary: string;
  secondary: string;
  gradientStyle: string;
  animation: AnimationStyle;
  cssProperties: {
    '--primary': string;
    '--ring': string;
    '--secondary': string;
  };
};

export const themeColors: ThemeColor[] = [
  {
    name: "Neon Green",
    primary: "hsl(148, 100%, 63%)",
    secondary: "hsl(180, 100%, 60%)",
    gradientStyle: "from-background via-background to-[hsl(148,100%,63%)]/10",
    animation: {
      minutes: {
        initial: { scale: 0.9, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        transition: { duration: 0.3 }
      },
      seconds: {
        initial: { y: 20, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { duration: 0.2 }
      },
      separator: {
        animate: { opacity: [1, 0.5, 1] },
        transition: { duration: 1, repeat: Infinity }
      }
    },
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
    animation: {
      minutes: {
        initial: { rotateX: 90, opacity: 0 },
        animate: { rotateX: 0, opacity: 1 },
        transition: { duration: 0.4 }
      },
      seconds: {
        initial: { rotateX: -90, opacity: 0 },
        animate: { rotateX: 0, opacity: 1 },
        transition: { duration: 0.4 }
      },
      separator: {
        animate: { scale: [1, 1.2, 1] },
        transition: { duration: 0.5, repeat: Infinity }
      }
    },
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
    animation: {
      minutes: {
        initial: { scale: 1.2, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        transition: { type: "spring", stiffness: 200 }
      },
      seconds: {
        initial: { scale: 0.8, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        transition: { type: "spring", stiffness: 200 }
      },
      separator: {
        animate: { rotate: [0, 360] },
        transition: { duration: 2, repeat: Infinity }
      }
    },
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
    animation: {
      minutes: {
        initial: { x: -50, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        transition: { type: "spring", damping: 12 }
      },
      seconds: {
        initial: { x: 50, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        transition: { type: "spring", damping: 12 }
      },
      separator: {
        animate: { y: [0, -5, 0] },
        transition: { duration: 1.5, repeat: Infinity }
      }
    },
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
    animation: {
      minutes: {
        initial: { opacity: 0, filter: "blur(10px)" },
        animate: { opacity: 1, filter: "blur(0px)" },
        transition: { duration: 0.5 }
      },
      seconds: {
        initial: { opacity: 0, filter: "blur(10px)" },
        animate: { opacity: 1, filter: "blur(0px)" },
        transition: { duration: 0.5 }
      },
      separator: {
        animate: { opacity: [1, 0, 1] },
        transition: { duration: 2, repeat: Infinity }
      }
    },
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