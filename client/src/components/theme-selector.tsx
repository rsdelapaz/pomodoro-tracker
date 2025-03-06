import { Button } from "@/components/ui/button";
import { Palette } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { themeColors, useTheme } from "@/lib/theme";
import { motion } from "framer-motion";

export function ThemeSelector() {
  const { currentTheme, setTheme, themeVariants } = useTheme();

  const handleThemeChange = (themeName: string) => {
    console.log('Changing theme to:', themeName);
    setTheme(themeName);
  };

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {themeVariants.map((theme) => (
        <div
          key={theme.name}
          className={`w-8 h-8 rounded-full cursor-pointer border-2 ${
            currentTheme.name === theme.name ? 'border-accent' : 'border-transparent'
          }`}
          style={{ backgroundColor: theme.colors.primary }}
          onClick={() => handleThemeChange(theme.name)}
          title={theme.name}
        />
      ))}
    </div>
  );
}