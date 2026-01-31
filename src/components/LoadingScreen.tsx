import { useRef, useEffect } from "react";
import { gsap } from "gsap";

interface LoadingScreenProps {
  isLoading: boolean;
  onComplete: () => void;
}

const LoadingScreen = ({ isLoading, onComplete }: LoadingScreenProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);
  const letters = "LEONIX".split("");

  useEffect(() => {
    if (!isLoading || !textRef.current || !underlineRef.current || !containerRef.current) return;

    const letterElements = textRef.current.querySelectorAll(".letter");
    const tl = gsap.timeline();

    // Set initial state - letters invisible
    gsap.set(letterElements, { opacity: 0, y: 50 });
    gsap.set(underlineRef.current, { scaleX: 0, transformOrigin: "left" });

    // Progressive letter reveal
    tl.to(letterElements, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      stagger: 0.1,
      ease: "power3.out",
    })
    // Underline animation
    .to(underlineRef.current, {
      scaleX: 1,
      duration: 0.6,
      ease: "power2.out",
    }, "-=0.2")
    // Hold for a moment
    .to({}, { duration: 0.6 })
    // Exit animation - scale up and fade out the container
    .to(containerRef.current, {
      opacity: 0,
      scale: 1.05,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => {
        onComplete();
      },
    });

    return () => {
      tl.kill();
    };
  }, [isLoading, onComplete]);

  if (!isLoading) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-background flex items-center justify-center overflow-hidden"
    >
      {/* Main text */}
      <div className="relative">
        <div
          ref={textRef}
          className="flex text-foreground font-black tracking-tighter"
          style={{
            fontSize: "clamp(4rem, 18vw, 14rem)",
            lineHeight: 0.9,
            letterSpacing: "-0.02em",
          }}
        >
          {letters.map((letter, index) => (
            <span key={index} className="letter inline-block">
              {letter}
            </span>
          ))}
        </div>

        {/* Underline accent */}
        <div
          ref={underlineRef}
          className="h-1 bg-accent mt-4 rounded-full"
        />
      </div>

      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />
    </div>
  );
};

export default LoadingScreen;
