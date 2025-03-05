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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="fixed bottom-4 left-4 bg-background/20 backdrop-blur-sm"
        >
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Palette className="h-4 w-4" />
          </motion.div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        {themeColors.map((theme) => (
          <DropdownMenuItem
            key={theme.name}
            onClick={() => setTheme(theme)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <motion.div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: theme.primary }}
              animate={{
                scale: currentTheme.name === theme.name ? [1, 1.1, 1] : 1,
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            {theme.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}