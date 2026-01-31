import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type TimeOfDay = "morning" | "afternoon" | "evening" | "night";

interface ThemeContextType {
  timeOfDay: TimeOfDay;
  autoTheme: boolean;
  setAutoTheme: (auto: boolean) => void;
  setManualTheme: (theme: TimeOfDay) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const getSystemTimeOfDay = (): TimeOfDay => {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 21) return "evening";
  return "night";
};

export const getGreeting = (timeOfDay: TimeOfDay): string => {
  switch (timeOfDay) {
    case "morning": return "Good morning";
    case "afternoon": return "Good afternoon";
    case "evening": return "Good evening";
    case "night": return "Good night";
  }
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [autoTheme, setAutoTheme] = useState(true);
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>(getSystemTimeOfDay());

  useEffect(() => {
    if (!autoTheme) return;

    const updateTimeOfDay = () => {
      setTimeOfDay(getSystemTimeOfDay());
    };

    updateTimeOfDay();
    const interval = setInterval(updateTimeOfDay, 60000);
    return () => clearInterval(interval);
  }, [autoTheme]);

  const setManualTheme = (theme: TimeOfDay) => {
    setAutoTheme(false);
    setTimeOfDay(theme);
  };

  return (
    <ThemeContext.Provider value={{ timeOfDay, autoTheme, setAutoTheme, setManualTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
