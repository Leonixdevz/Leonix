import { useState, memo } from "react";
import { Menu, X } from "lucide-react";

// ============================================
// CONFIGURATION - Edit these for your project
// ============================================

interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

interface NavConfig {
  logo: {
    initials: string;
    title: string;
    subtitle: string;
  };
  navItems: NavItem[];
  moreItems?: NavItem[];
  ctaButton?: {
    label: string;
    href: string;
  };
}

const config: NavConfig = {
  logo: {
    initials: "PS",
    title: "Creative Engineer",
    subtitle: "Building the Future",
  },
  navItems: [
    { label: "Home", href: "#" },
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Blogs", href: "https://parthh.in/blogs", external: true },
  ],
  moreItems: [
    { label: "Links", href: "https://parthh.in/links", external: true },
    { label: "Uses", href: "https://parthh.in/uses", external: true },
    { label: "Guestbook", href: "https://parthh.in/guestbook", external: true },
  ],
  ctaButton: {
    label: "Book a Call",
    href: "https://parthh.in/book-call",
  },
};

// ============================================
// COMPONENTS
// ============================================

const NavLink = memo(({ item }: { item: NavItem }) => (
  <a
    href={item.href}
    target={item.external ? "_blank" : undefined}
    rel={item.external ? "noopener noreferrer" : undefined}
    className="px-4 py-2 rounded-full text-sm text-muted-foreground"
  >
    {item.label}
  </a>
));
NavLink.displayName = "NavLink";

const Navbar = memo(() => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center">
            <span className="text-background font-bold text-sm">{config.logo.initials}</span>
          </div>
          <div className="hidden sm:block">
            <p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
              {config.logo.title}
            </p>
            <p className="text-xs font-medium text-accent">{config.logo.subtitle}</p>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1 glass rounded-full px-2 py-2">
          {config.navItems.map((item) => (
            <NavLink key={item.label} item={item} />
          ))}
          {config.moreItems && config.moreItems.length > 0 && (
            <div className="relative group">
              <button className="px-4 py-2 rounded-full text-sm text-muted-foreground flex items-center gap-1">
                More
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full right-0 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200 glass rounded-2xl p-2 min-w-[150px]">
                {config.moreItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="block px-4 py-2 rounded-lg text-sm text-muted-foreground"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* CTA */}
        {config.ctaButton && (
          <div className="hidden md:flex items-center gap-3">
            <a
              href={config.ctaButton.href}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full border border-border text-sm font-medium"
            >
              {config.ctaButton.label}
            </a>
          </div>
        )}

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-full"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden mt-4 glass rounded-2xl p-4">
          {[...config.navItems, ...(config.moreItems || [])].map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 rounded-lg text-muted-foreground"
            >
              {item.label}
            </a>
          ))}
          {config.ctaButton && (
            <a
              href={config.ctaButton.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-4 px-4 py-3 rounded-full bg-accent text-accent-foreground text-center font-medium"
            >
              {config.ctaButton.label}
            </a>
          )}
        </div>
      )}
    </header>
  );
});
Navbar.displayName = "Navbar";

export default Navbar;
