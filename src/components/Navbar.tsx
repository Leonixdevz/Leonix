import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Sunrise, Sunset, Menu, X } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import TypingGreeting from "./TypingGreeting";

const navItems = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

const themeIcons = {
  morning: Sunrise,
  afternoon: Sun,
  evening: Sunset,
  night: Moon,
};

const themeOptions = [
  { value: "morning", label: "Morning", icon: Sunrise },
  { value: "afternoon", label: "Afternoon", icon: Sun },
  { value: "evening", label: "Evening", icon: Sunset },
  { value: "night", label: "Night", icon: Moon },
] as const;

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showGreeting, setShowGreeting] = useState(true);
  const themeRef = useRef<HTMLDivElement>(null);
  const { timeOfDay, autoTheme, setAutoTheme, setManualTheme } = useTheme();

  const CurrentIcon = themeIcons[timeOfDay];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGreeting(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (themeRef.current && !themeRef.current.contains(e.target as Node)) {
        setThemeOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <motion.nav
        animate={{
          justifyContent: scrolled ? "flex-start" : "center",
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto flex items-center gap-4"
      >
        {/* Logo - only visible when scrolled */}
        <motion.div
          initial={false}
          animate={{
            opacity: scrolled ? 1 : 0,
            width: scrolled ? "auto" : 0,
            marginRight: scrolled ? "1rem" : 0,
          }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-3 overflow-hidden"
        >
          <div className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center flex-shrink-0">
            <span className="text-background font-bold text-xs">TA</span>
          </div>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1 glass rounded-full px-2 py-2">
          {/* Greeting */}
          <div className="px-3">
            <TypingGreeting show={showGreeting} />
          </div>
          
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="px-4 py-2 rounded-full text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              {item.label}
            </a>
          ))}

          {/* Theme Toggle */}
          <div ref={themeRef} className="relative ml-1">
            <button
              onClick={() => setThemeOpen(!themeOpen)}
              className="p-2 rounded-full hover:bg-secondary transition-colors"
              aria-label="Change theme"
            >
              <CurrentIcon className="w-4 h-4 text-accent" />
            </button>

            <AnimatePresence>
              {themeOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full mt-2 glass rounded-xl p-2 min-w-[140px]"
                >
                  <button
                    onClick={() => {
                      setAutoTheme(true);
                      setThemeOpen(false);
                    }}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                      autoTheme ? "bg-accent/20 text-accent" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    <span className="w-4 h-4 flex items-center justify-center text-xs">⏰</span>
                    Auto
                  </button>
                  
                  <div className="h-px bg-border my-1" />
                  
                  {themeOptions.map(({ value, label, icon: Icon }) => (
                    <button
                      key={value}
                      onClick={() => {
                        setManualTheme(value);
                        setThemeOpen(false);
                      }}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                        !autoTheme && timeOfDay === value
                          ? "bg-accent/20 text-accent"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Spacer for centered layout */}
        <motion.div
          animate={{ flex: scrolled ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-full hover:bg-secondary transition-colors ml-auto"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mt-4 glass rounded-2xl p-4"
          >
            {/* Mobile Greeting */}
            <div className="px-4 py-2 mb-2">
              <TypingGreeting show={showGreeting} />
            </div>
            
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              >
                {item.label}
              </a>
            ))}

            {/* Mobile Theme Selector */}
            <div className="mt-2 pt-2 border-t border-border">
              <p className="px-4 py-2 text-xs text-muted-foreground uppercase tracking-wider">Theme</p>
              <div className="grid grid-cols-2 gap-1">
                <button
                  onClick={() => setAutoTheme(true)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                    autoTheme ? "bg-accent/20 text-accent" : "text-muted-foreground"
                  }`}
                >
                  <span>⏰</span> Auto
                </button>
                {themeOptions.map(({ value, label, icon: Icon }) => (
                  <button
                    key={value}
                    onClick={() => setManualTheme(value)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                      !autoTheme && timeOfDay === value ? "bg-accent/20 text-accent" : "text-muted-foreground"
                    }`}
                  >
                    <Icon className="w-4 h-4" /> {label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
