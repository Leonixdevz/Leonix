import { motion } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Blogs", href: "https://parthh.in/blogs" },
];

const moreItems = [
  { label: "Links", href: "https://parthh.in/links" },
  { label: "Uses", href: "https://parthh.in/uses" },
  { label: "Guestbook", href: "https://parthh.in/guestbook" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center">
            <span className="text-background font-bold text-sm">PS</span>
          </div>
          <div className="hidden sm:block">
            <p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
              Creative Engineer
            </p>
            <p className="text-xs font-medium text-accent">Building the Future</p>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1 glass rounded-full px-2 py-2">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="px-4 py-2 rounded-full text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              {item.label}
            </a>
          ))}
          <div className="relative group">
            <button className="px-4 py-2 rounded-full text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors flex items-center gap-1">
              More
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute top-full right-0 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 glass rounded-2xl p-2 min-w-[150px]">
              {moreItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* CTA + Theme */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://parthh.in/book-call"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full border border-border text-sm font-medium hover:bg-secondary transition-colors"
          >
            Book a Call
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-full hover:bg-secondary transition-colors"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden mt-4 glass rounded-2xl p-4"
        >
          {[...navItems, ...moreItems].map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href="https://parthh.in/book-call"
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-4 px-4 py-3 rounded-full bg-accent text-accent-foreground text-center font-medium"
          >
            Book a Call
          </a>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;
