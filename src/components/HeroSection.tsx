import { motion } from "framer-motion";
import { MapPin, Code2 } from "lucide-react";

const HeroSection = () => {

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-6 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card pointer-events-none" />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                          linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
        backgroundSize: '100px 100px'
      }} />

      {/* Main content */}
      <div className="relative z-10 text-center max-w-7xl mx-auto">
        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="hero-name text-foreground tracking-tighter"
        >
          LEONIX
        </motion.h1>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 md:mt-8"
        >
          <p className="text-muted-foreground text-sm md:text-base tracking-[0.3em] uppercase mb-2">
            I design and build products that
          </p>
          <p className="font-serif italic text-3xl md:text-5xl lg:text-6xl text-foreground">
            deliver real impact.
          </p>
        </motion.div>
      </div>

      {/* Bottom badges */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute bottom-12 left-0 right-0 flex justify-between items-end px-8 md:px-16"
      >
        {/* Location badge */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
            <MapPin className="w-4 h-4 text-accent" />
          </div>
          <div>
            <p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">Based in</p>
            <p className="text-sm font-semibold text-foreground">Ogun, Nigeria</p>
          </div>
        </div>

        {/* Role badge */}
        <div className="flex items-center gap-3">
          <div>
            <p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase text-right">Full Stack Dev,</p>
            <p className="text-sm font-semibold text-foreground text-right">& <span className="text-muted-foreground">Software Engineer</span></p>
          </div>
          <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
            <Code2 className="w-4 h-4 text-accent" />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
