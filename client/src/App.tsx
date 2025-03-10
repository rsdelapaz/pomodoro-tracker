import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import { useState, useEffect } from "react";
import { ThemeContext, themeColors } from "./lib/theme";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [currentTheme, setCurrentTheme] = useState(themeColors[0]);

  // Update CSS custom properties when theme changes
  useEffect(() => {
    const root = document.documentElement;
    Object.entries(currentTheme.cssProperties).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme: setCurrentTheme }}>
      <QueryClientProvider client={queryClient}>
        <Router />
        <Toaster />
      </QueryClientProvider>
    </ThemeContext.Provider>
  );
}

export default App;