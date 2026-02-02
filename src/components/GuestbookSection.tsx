import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Send, User, Calendar } from "lucide-react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  timestamp: number;
  hearts: number;
}

const GuestbookSection = () => {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [totalHearts, setTotalHearts] = useState(0);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userLikedEntries, setUserLikedEntries] = useState<Set<string>>(new Set());
  const heartRef = useRef<HTMLButtonElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  // Load from localStorage
  useEffect(() => {
    const savedEntries = localStorage.getItem("guestbook-entries");
    const savedHearts = localStorage.getItem("guestbook-total-hearts");
    const savedLiked = localStorage.getItem("guestbook-user-liked");
    
    if (savedEntries) setEntries(JSON.parse(savedEntries));
    if (savedHearts) setTotalHearts(parseInt(savedHearts));
    if (savedLiked) setUserLikedEntries(new Set(JSON.parse(savedLiked)));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("guestbook-entries", JSON.stringify(entries));
    localStorage.setItem("guestbook-total-hearts", totalHearts.toString());
    localStorage.setItem("guestbook-user-liked", JSON.stringify([...userLikedEntries]));
  }, [entries, totalHearts, userLikedEntries]);

  const createHeartParticles = () => {
    if (!particlesRef.current || !heartRef.current) return;

    const rect = heartRef.current.getBoundingClientRect();
    const containerRect = particlesRef.current.getBoundingClientRect();
    
    for (let i = 0; i < 8; i++) {
      const particle = document.createElement("div");
      particle.innerHTML = "❤️";
      particle.className = "absolute text-lg pointer-events-none";
      particle.style.left = `${rect.left - containerRect.left + rect.width / 2}px`;
      particle.style.top = `${rect.top - containerRect.top + rect.height / 2}px`;
      particlesRef.current.appendChild(particle);

      gsap.to(particle, {
        x: (Math.random() - 0.5) * 150,
        y: -80 - Math.random() * 80,
        opacity: 0,
        scale: 0.5 + Math.random() * 0.5,
        duration: 0.8 + Math.random() * 0.4,
        ease: "power2.out",
        onComplete: () => particle.remove(),
      });
    }
  };

  const handleMainHeartClick = () => {
    setTotalHearts(prev => prev + 1);
    createHeartParticles();
    
    // Animate heart
    if (heartRef.current) {
      gsap.fromTo(heartRef.current, 
        { scale: 1 },
        { scale: 1.3, duration: 0.15, yoyo: true, repeat: 1, ease: "power2.out" }
      );
    }
  };

  const handleEntryHeart = (entryId: string) => {
    if (userLikedEntries.has(entryId)) return;

    setEntries(prev => prev.map(entry => 
      entry.id === entryId ? { ...entry, hearts: entry.hearts + 1 } : entry
    ));
    setTotalHearts(prev => prev + 1);
    setUserLikedEntries(prev => new Set([...prev, entryId]));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);
    
    const newEntry: GuestbookEntry = {
      id: Date.now().toString(),
      name: name.trim(),
      message: message.trim(),
      timestamp: Date.now(),
      hearts: 0,
    };

    setTimeout(() => {
      setEntries(prev => [newEntry, ...prev]);
      setName("");
      setMessage("");
      setIsSubmitting(false);
    }, 500);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <section id="guestbook" className="py-32 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-card via-background to-card pointer-events-none" />
      
      {/* Particles container */}
      <div ref={particlesRef} className="fixed inset-0 pointer-events-none z-50 overflow-hidden" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header with Heart Counter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Guestbook</h2>
          <p className="text-muted-foreground text-lg mb-8">
            Leave a message and spread some love
          </p>

          {/* Main Heart Counter */}
          <motion.div 
            className="inline-flex flex-col items-center gap-3"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <button
              ref={heartRef}
              onClick={handleMainHeartClick}
              className="group relative p-6 rounded-full glass hover:bg-accent/10 transition-all duration-300"
              aria-label="Add heart"
            >
              <Heart 
                className="w-16 h-16 text-red-500 fill-red-500 transition-transform group-hover:scale-110" 
              />
              <div className="absolute inset-0 rounded-full bg-red-500/20 blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
            </button>
            <motion.span 
              key={totalHearts}
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-3xl font-bold text-foreground"
            >
              {totalHearts.toLocaleString()}
            </motion.span>
            <span className="text-muted-foreground text-sm">hearts received</span>
          </motion.div>
        </motion.div>

        {/* Submission Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="glass border-border/50 mb-12">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10 bg-background/50 border-border/50 focus:border-accent"
                      maxLength={50}
                    />
                  </div>
                </div>
                <Textarea
                  placeholder="Leave a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="bg-background/50 border-border/50 focus:border-accent min-h-[100px] resize-none"
                  maxLength={500}
                />
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">
                    {message.length}/500
                  </span>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting || !name.trim() || !message.trim()}
                    className="bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Send className="w-4 h-4" />
                      </motion.div>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Sign Guestbook
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Entries List */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {entries.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="glass border-border/30 hover:border-accent/30 transition-colors">
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold text-foreground">{entry.name}</span>
                          <span className="text-muted-foreground text-xs flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(entry.timestamp)}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {entry.message}
                        </p>
                      </div>
                      <button
                        onClick={() => handleEntryHeart(entry.id)}
                        disabled={userLikedEntries.has(entry.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
                          userLikedEntries.has(entry.id)
                            ? "bg-red-500/20 text-red-400"
                            : "bg-secondary/50 text-muted-foreground hover:bg-red-500/20 hover:text-red-400"
                        }`}
                      >
                        <Heart 
                          className={`w-4 h-4 ${userLikedEntries.has(entry.id) ? "fill-red-400" : ""}`} 
                        />
                        <span className="text-sm font-medium">{entry.hearts}</span>
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>

          {entries.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 text-muted-foreground"
            >
              <Heart className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p>Be the first to sign the guestbook!</p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default GuestbookSection;
