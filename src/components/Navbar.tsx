import { useState, useRef, useEffect, useCallback } from "react";
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
  const navContainerRef = useRef<HTMLDivElement>(null);
  const logoTextRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef<HTMLDivElement>(null);
  const scrolledRef = useRef(false);
  
  const { timeOfDay, autoTheme, setAutoTheme, setManualTheme } = useTheme();
  const CurrentIcon = themeIcons[timeOfDay];

  // Greeting auto-hide
  useEffect(() => {
    const timer = setTimeout(() => setShowGreeting(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  // Initial entrance animation
  useEffect(() => {
    if (!headerRef.current) return;
    
    const tl = gsap.timeline();
    tl.fromTo(headerRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
    );
  }, []);

  // Optimized scroll handler with RAF
  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY > 50;
    
    if (scrolled === scrolledRef.current) return;
    scrolledRef.current = scrolled;

    // Batch GSAP animations
    gsap.to(navContainerRef.current, {
      x: scrolled ? "-50%" : "0%",
      left: scrolled ? "50%" : "auto",
      right: scrolled ? "auto" : "1.5rem",
      duration: 0.4,
      ease: "power2.out",
    });

    gsap.to(logoTextRef.current, {
      opacity: scrolled ? 0 : 1,
      x: scrolled ? -10 : 0,
      width: scrolled ? 0 : "auto",
      duration: 0.3,
      ease: "power2.out",
    });
  }, []);

  useEffect(() => {
    let ticking = false;
    
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [handleScroll]);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (themeRef.current && !themeRef.current.contains(e.target as Node)) {
        setThemeOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Hover animation for nav items
  const handleNavHover = (e: React.MouseEvent<HTMLAnchorElement>, isEnter: boolean) => {
    gsap.to(e.currentTarget, {
      scale: isEnter ? 1.05 : 1,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      style={{ opacity: 0 }}
    >
      <div className="max-w-7xl mx-auto relative">
        {/* Logo - Fixed Left */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-200"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <span className="text-background font-bold text-sm">TA</span>
          </div>
          <div
            ref={logoTextRef}
            className="hidden sm:block overflow-hidden"
          >
            <p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase whitespace-nowrap">
              Full-Stack Developer
            </p>
            <p className="text-xs font-medium text-accent whitespace-nowrap">Software Engineer</p>
          </div>
        </div>

        {/* Desktop Nav - Right by default, Center on scroll */}
        <div
          ref={navContainerRef}
          className="hidden md:flex items-center gap-1 glass rounded-full px-2 py-2 absolute top-1/2 -translate-y-1/2"
          style={{ right: "1.5rem" }}
        >
          {/* Greeting */}
          <div className="px-3">
            <TypingGreeting show={showGreeting} />
          </div>
          
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onMouseEnter={(e) => handleNavHover(e, true)}
              onMouseLeave={(e) => handleNavHover(e, false)}
              className="px-4 py-2 rounded-full text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
            >
              {item.label}
            </a>
          ))}

          {/* Theme Toggle */}
          <div ref={themeRef} className="relative ml-1">
            <button
              onClick={() => setThemeOpen(!themeOpen)}
              className="p-2 rounded-full hover:bg-secondary transition-all duration-200 hover:rotate-12"
              aria-label="Change theme"
            >
              <CurrentIcon className="w-4 h-4 text-accent" />
            </button>

            <AnimatePresence>
              {themeOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute right-0 top-full mt-2 glass rounded-xl p-2 min-w-[140px]"
                >
                  <button
                    onClick={() => {
                      setAutoTheme(true);
                      setThemeOpen(false);
                    }}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-150 ${
                      autoTheme ? "bg-accent/20 text-accent" : "text-muted-foreground hover:text-foreground hover:bg-secondary hover:translate-x-1"
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
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-150 ${
                        !autoTheme && timeOfDay === value
                          ? "bg-accent/20 text-accent"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary hover:translate-x-1"
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
          className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-secondary transition-colors"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-4 glass rounded-2xl p-4 overflow-hidden"
          >
            <div className="px-4 py-2 mb-2">
              <TypingGreeting show={showGreeting} />
            </div>
            
            {navItems.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              >
                {item.label}
              </motion.a>
            ))}

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
