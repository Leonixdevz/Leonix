import { useState, useEffect } from "react";

type TimeOfDay = "morning" | "afternoon" | "evening" | "night";

export const useTimeTheme = () => {
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>("night");

  useEffect(() => {
    const updateTimeOfDay = () => {
      const hour = new Date().getHours();
      
      if (hour >= 6 && hour < 12) {
        setTimeOfDay("morning");
      } else if (hour >= 12 && hour < 17) {
        setTimeOfDay("afternoon");
      } else if (hour >= 17 && hour < 21) {
        setTimeOfDay("evening");
      } else {
        setTimeOfDay("night");
      }
    };

    updateTimeOfDay();
    const interval = setInterval(updateTimeOfDay, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  return timeOfDay;
};

export const getGreeting = (timeOfDay: TimeOfDay): string => {
  switch (timeOfDay) {
    case "morning":
      return "Good morning";
    case "afternoon":
      return "Good afternoon";
    case "evening":
      return "Good evening";
    case "night":
      return "Good night";
  }
};
