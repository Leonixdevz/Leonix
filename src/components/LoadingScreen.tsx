import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  isLoading: boolean;
  onComplete: () => void;
}

const LoadingScreen = ({ isLoading, onComplete }: LoadingScreenProps) => {
  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center overflow-hidden"
        >
          <motion.div
            initial={{ y: "100vh", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ 
              y: "-10vh",
              scale: 1.1,
              opacity: 0,
            }}
            transition={{ 
              y: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.8, delay: 0.2 },
            }}
            className="relative"
          >
            {/* Main text */}
            <motion.h1
              className="text-foreground font-black tracking-tighter"
              style={{
                fontSize: "clamp(4rem, 18vw, 14rem)",
                lineHeight: 0.9,
              }}
              initial={{ letterSpacing: "0.1em" }}
              animate={{ letterSpacing: "-0.02em" }}
              transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              LEONIX
            </motion.h1>

            {/* Subtle underline accent */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 1, ease: [0.22, 1, 0.36, 1] }}
              className="h-1 bg-accent mt-4 origin-left rounded-full"
            />
          </motion.div>

          {/* Background decorative elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.03 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                                linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
              backgroundSize: '80px 80px'
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
