import { motion } from "framer-motion";
import { Mail, Copy, Check, Twitter, Instagram, Dribbble } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ContactSection = () => {
  const [copied, setCopied] = useState(false);
  const email = "hello@leonix.dev";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    toast.success("Email copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-20 px-6">
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
            {/* Profile Card */}
            <div className="mb-8">
              {/* Profile Image */}
              <div className="w-40 h-40 mx-auto mb-6 rounded-2xl overflow-hidden bg-gradient-to-br from-accent/30 via-accent/20 to-accent/10 p-1">
                <div className="w-full h-full rounded-xl bg-secondary flex items-center justify-center">
                  <span className="text-4xl font-bold text-accent">LX</span>
                </div>
              </div>
              
              {/* Name & Role */}
              <h3 className="text-2xl md:text-3xl font-bold text-foreground font-serif italic">
                Leonix
              </h3>
              <p className="text-muted-foreground mt-1">
                Product Designer & Developer
              </p>
              <p className="text-sm text-muted-foreground">
                Available Worldwide
              </p>
              
              {/* Social Icons */}
              <div className="flex items-center justify-center gap-4 mt-4">
                <a href="#" className="p-2 rounded-full hover:bg-secondary transition-colors">
                  <Dribbble className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                </a>
                <a href="#" className="p-2 rounded-full hover:bg-secondary transition-colors">
                  <Twitter className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                </a>
                <a href="#" className="p-2 rounded-full hover:bg-secondary transition-colors">
                  <Instagram className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                </a>
                <a href="#" className="p-2 rounded-full hover:bg-secondary transition-colors">
                  <Mail className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                </a>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-border mb-8" />

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
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopy}
              className="mt-8 inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full bg-accent text-accent-foreground font-semibold hover:opacity-90 transition-opacity glow-accent min-w-[200px]"
            >
              Let's Talk
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
