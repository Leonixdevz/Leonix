import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MapPin, Code2 } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgLayer1Ref = useRef<HTMLDivElement>(null);
  const bgLayer2Ref = useRef<HTMLDivElement>(null);
  const bgLayer3Ref = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax layers - different speeds create depth
      gsap.to(bgLayer1Ref.current, {
        y: "30%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });

      gsap.to(bgLayer2Ref.current, {
        y: "50%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      gsap.to(bgLayer3Ref.current, {
        y: "20%",
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Grid parallax
      gsap.to(gridRef.current, {
        y: "40%",
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      // Content parallax - moves slower for depth effect
      gsap.to(contentRef.current, {
        y: "15%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.3,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center items-center px-6 overflow-hidden"
    >
      {/* Parallax Background Layer 1 - Gradient orbs */}
      <div 
        ref={bgLayer1Ref}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        <div className="absolute -top-1/4 -left-1/4 w-[60vw] h-[60vw] rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute -bottom-1/4 -right-1/4 w-[50vw] h-[50vw] rounded-full bg-primary/5 blur-[100px]" />
      </div>

      {/* Parallax Background Layer 2 - Secondary orbs */}
      <div 
        ref={bgLayer2Ref}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        <div className="absolute top-1/4 right-1/3 w-[30vw] h-[30vw] rounded-full bg-accent/3 blur-[80px]" />
        <div className="absolute bottom-1/3 left-1/4 w-[25vw] h-[25vw] rounded-full bg-secondary/10 blur-[60px]" />
      </div>

      {/* Parallax Background Layer 3 - Noise texture overlay */}
      <div 
        ref={bgLayer3Ref}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-card" />
      </div>
      
      {/* Parallax Grid pattern */}
      <div 
        ref={gridRef}
        className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }} 
      />

      {/* Main content with parallax */}
      <div ref={contentRef} className="relative z-10 text-center max-w-7xl mx-auto">
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
