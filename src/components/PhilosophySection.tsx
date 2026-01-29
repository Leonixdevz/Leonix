import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const philosophyItems = [
  { label: "Philosophy", active: true },
  { label: "Motion", active: false },
  { label: "Type", active: false },
  { label: "Feedback", active: false },
  { label: "Craft", active: false },
];

const ClockWidget = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours() % 12;

  return (
    <div className="relative w-32 h-32">
      <div className="absolute inset-0 rounded-full border-2 border-muted" />
      {/* Hour hand */}
      <div
        className="absolute w-1 h-8 bg-foreground rounded-full origin-bottom left-1/2 top-1/2 -translate-x-1/2"
        style={{
          transform: `translateX(-50%) rotate(${hours * 30 + minutes * 0.5}deg)`,
          transformOrigin: "bottom center",
          top: "calc(50% - 32px)"
        }}
      />
      {/* Minute hand */}
      <div
        className="absolute w-0.5 h-10 bg-foreground/80 rounded-full origin-bottom left-1/2"
        style={{
          transform: `translateX(-50%) rotate(${minutes * 6}deg)`,
          transformOrigin: "bottom center",
          top: "calc(50% - 40px)"
        }}
      />
      {/* Second hand */}
      <div
        className="absolute w-0.5 h-12 bg-accent rounded-full origin-bottom left-1/2"
        style={{
          transform: `translateX(-50%) rotate(${seconds * 6}deg)`,
          transformOrigin: "bottom center",
          top: "calc(50% - 48px)"
        }}
      />
      {/* Center dot */}
      <div className="absolute w-3 h-3 bg-accent rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
};

const PhilosophySection = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Philosophy Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2 card-gradient rounded-3xl p-8 md:p-12 border border-border relative overflow-hidden"
          >
            <div className="absolute top-6 left-6">
              <span className="text-xs text-muted-foreground tracking-wider uppercase">
                Detail-driven UI
              </span>
              <span className="ml-2 text-xs text-accent">UI Philosophy</span>
            </div>

            <div className="mt-12 md:mt-16">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-tight">
                Interfaces <br />
                <span className="font-serif italic font-normal">you can feel.</span>
              </h2>
              <p className="mt-4 text-muted-foreground max-w-md">
                I sweat spacing, timing, and feedback — the tiny stuff.
              </p>
            </div>

            {/* Philosophy tags */}
            <div className="flex flex-wrap gap-2 mt-8">
              {philosophyItems.map((item, i) => (
                <span
                  key={i}
                  className={`px-4 py-2 rounded-full text-sm ${
                    item.active
                      ? "bg-accent text-accent-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {item.label}
                </span>
              ))}
            </div>

            {/* Micro-interactions description */}
            <div className="mt-8 p-4 rounded-2xl bg-secondary/50">
              <p className="text-sm font-medium text-foreground">Micro-interactions</p>
              <p className="text-sm text-muted-foreground mt-1">
                Subtle movement that confirms intent — never distracting.
              </p>
            </div>
          </motion.div>

          {/* Right Column Cards */}
          <div className="flex flex-col gap-6">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="card-gradient rounded-3xl p-6 border border-border flex-1"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center text-2xl font-bold text-accent">
                  PS
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Parth Sharma</h3>
                  <p className="text-sm text-muted-foreground">Noida, IN • {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
              </div>
            </motion.div>

            {/* Clock Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="card-gradient rounded-3xl p-6 border border-border flex-1 flex flex-col items-center justify-center"
            >
              <span className="text-xs text-muted-foreground tracking-wider uppercase mb-4">
                Available Globally
              </span>
              <ClockWidget />
              <div className="flex gap-3 mt-4">
                <span className="px-3 py-1 rounded-full bg-secondary text-xs">🇬🇧 UK</span>
                <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs">🇮🇳 India</span>
                <span className="px-3 py-1 rounded-full bg-secondary text-xs">🇺🇸 USA</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
