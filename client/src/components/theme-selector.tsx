
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
  const { currentTheme, setTheme } = useTheme();

  const handleThemeChange = (themeName: string) => {
    console.log('Changing theme to:', themeName);
    setTheme(themeName);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="rounded-full" 
          aria-label="Change theme"
        >
          <Palette className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 p-2">
        <div className="grid grid-cols-5 gap-2 p-2">
          {themeColors.map((theme) => (
            <motion.div
              key={theme.name}
              className={`w-8 h-8 rounded-full cursor-pointer border-2 flex items-center justify-center ${
                currentTheme?.name === theme.name ? 'border-accent' : 'border-transparent'
              }`}
              style={{ backgroundColor: theme.primary || '#555' }}
              onClick={() => handleThemeChange(theme.name)}
              title={theme.name}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {currentTheme?.name === theme.name && (
                <motion.div 
                  className="w-3 h-3 rounded-full bg-background"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
