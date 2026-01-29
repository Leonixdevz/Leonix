import { motion } from "framer-motion";
import { Mail, Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ContactSection = () => {
  const [copied, setCopied] = useState(false);
  const email = "hello@parthh.in";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    toast.success("Email copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="card-gradient rounded-3xl p-8 md:p-12 border border-border text-center relative overflow-hidden"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
          
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Available for work
            </span>

            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Let's build something{" "}
              <span className="font-serif italic font-normal">
                that actually works.
              </span>
            </h2>

            {/* Email button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCopy}
              className="mt-8 inline-flex items-center gap-3 px-6 py-4 rounded-full bg-secondary hover:bg-secondary/80 transition-colors group"
            >
              <Mail className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              <span className="text-foreground font-medium">{email}</span>
              {copied ? (
                <Check className="w-5 h-5 text-accent" />
              ) : (
                <Copy className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              )}
            </motion.button>
            <p className="text-sm text-muted-foreground mt-2">Tap to copy email</p>

            {/* CTA Button */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-accent-foreground font-semibold hover:opacity-90 transition-opacity glow-accent"
            >
              Get in Touch
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
