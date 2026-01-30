import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useTimeTheme, getGreeting } from "@/hooks/useTimeTheme";

interface TypingGreetingProps {
  show: boolean;
}

const TypingGreeting = ({ show }: TypingGreetingProps) => {
  const timeOfDay = useTimeTheme();
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-accent text-sm md:text-base tracking-[0.2em] uppercase mb-1"
        >
          <span>{displayText}</span>
          <motion.span
            animate={{ opacity: isTypingComplete ? 0 : [1, 0] }}
            transition={{ duration: 0.5, repeat: isTypingComplete ? 0 : Infinity }}
            className="inline-block w-0.5 h-4 md:h-5 bg-accent ml-1 align-middle"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TypingGreeting;
