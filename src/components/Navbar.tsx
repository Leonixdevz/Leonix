import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";
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
  const [showGreeting, setShowGreeting] = useState(true);
  
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef<HTMLDivElement>(null);
  
  const { timeOfDay, autoTheme, setAutoTheme, setManualTheme } = useTheme();
  const CurrentIcon = themeIcons[timeOfDay];

  // Greeting auto-hide
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGreeting(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  // Initial animation
  useEffect(() => {
    if (!headerRef.current) return;
    
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );
  }, []);

  // Scroll-based animations
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      
      if (navRef.current) {
        gsap.to(navRef.current, {
          justifyContent: scrolled ? "flex-end" : "center",
          duration: 0.4,
          ease: "power2.out",
        });
      }
      
      if (logoRef.current) {
        gsap.to(logoRef.current, {
          opacity: scrolled ? 0 : 1,
          width: scrolled ? 0 : "auto",
          marginRight: scrolled ? 0 : "1.5rem",
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Click outside to close theme dropdown
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
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      style={{ opacity: 0 }}
    >
      <nav
        ref={navRef}
        className="max-w-7xl mx-auto flex items-center"
        style={{ justifyContent: "center" }}
      >
        {/* Logo with text - visible at top */}
        <div
          ref={logoRef}
          className="flex items-center gap-3 overflow-hidden"
        >
          <div className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center flex-shrink-0">
            <span className="text-background font-bold text-sm">TA</span>
          </div>
          <div className="hidden sm:block whitespace-nowrap">
            <p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
              Full-Stack Developer
            </p>
            <p className="text-xs font-medium text-accent">Software Engineer</p>
          </div>
        </div>

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

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-full hover:bg-secondary transition-colors ml-auto"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

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
    </header>
  );
};

export default Navbar;
