import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useTheme, getGreeting } from "@/contexts/ThemeContext";

interface TypingGreetingProps {
  show: boolean;
}

const TypingGreeting = ({ show }: TypingGreetingProps) => {
  const { timeOfDay } = useTheme();
  const greeting = getGreeting(timeOfDay);
  const [displayText, setDisplayText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    if (!show) {
      setDisplayText("");
      setIsTypingComplete(false);
      return;
    }

    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= greeting.length) {
        setDisplayText(greeting.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTypingComplete(true);
      }
    }, 80);

    return () => clearInterval(typingInterval);
  }, [show, greeting]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "auto" }}
          exit={{ opacity: 0, width: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden whitespace-nowrap"
        >
          <span className="text-accent text-xs tracking-[0.15em] uppercase">
            {displayText}
          </span>
          <motion.span
            animate={{ opacity: isTypingComplete ? 0 : [1, 0] }}
            transition={{ duration: 0.5, repeat: isTypingComplete ? 0 : Infinity }}
            className="inline-block w-0.5 h-3 bg-accent ml-0.5 align-middle"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TypingGreeting;
