import { motion } from "framer-motion";
import { Mail, Copy, Check, Github, Instagram, Linkedin, Facebook } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ContactSection = () => {
  const [copied, setCopied] = useState(false);
  const email = "olusojleo@gmail.com";
  const phone = "+234 9074155361";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    toast.success("Email copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sticky Profile Card */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="lg:sticky lg:top-24"
            >
              <div className="card-gradient rounded-3xl p-6 border border-border text-center">
                {/* Profile Image */}
                <div className="w-32 h-32 mx-auto mb-5 rounded-2xl overflow-hidden bg-gradient-to-br from-accent/40 to-accent/10 p-0.5">
                  <div className="w-full h-full rounded-2xl bg-secondary flex items-center justify-center">
                    <span className="text-3xl font-bold text-accent">TA</span>
                  </div>
                </div>
                
                {/* Name & Role */}
                <h3 className="text-xl font-bold text-foreground font-serif italic">
                  Toheeb Adeleke
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Full-Stack Developer
                </p>
                <p className="text-xs text-muted-foreground">
                  Ogun, Nigeria
                </p>
                
                {/* Social Icons */}
                <div className="flex items-center justify-center gap-3 mt-4">
                  <a 
                    href="https://github.com/Adeleonix" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full hover:bg-secondary transition-colors"
                  >
                    <Github className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/leonixadeleke" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full hover:bg-secondary transition-colors"
                  >
                    <Linkedin className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                  </a>
                  <a 
                    href="https://instagram.com/leonixdevz" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full hover:bg-secondary transition-colors"
                  >
                    <Instagram className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                  </a>
                  <a 
                    href="https://web.facebook.com/people/Toheeb-Adeleke/61580642197907/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full hover:bg-secondary transition-colors"
                  >
                    <Facebook className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                  </a>
                </div>

                {/* WhatsApp CTA */}
                <motion.a
                  href="https://wa.me/2349074155361"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-6 w-full py-3 rounded-full bg-accent text-accent-foreground font-semibold hover:opacity-90 transition-opacity block text-center"
                >
                  Let's Talk
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="card-gradient rounded-3xl p-8 md:p-12 border border-border relative overflow-hidden"
            >
              {/* Subtle accent */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
              
              <div className="relative z-10">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm mb-6">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  Available for work
                </span>

                <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                  Have a project in mind?{" "}
                  <span className="font-serif italic font-normal">
                    I'd love to hear from you.
                  </span>
                </h2>

                <p className="text-muted-foreground mb-8 max-w-lg">
                  Let's collaborate and create something extraordinary together. 
                  From websites to mobile apps, AI integration to database optimization.
                </p>

                {/* Email button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCopy}
                  className="inline-flex items-center gap-3 px-6 py-4 rounded-full bg-secondary hover:bg-secondary/80 transition-colors group"
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

                {/* Phone */}
                <p className="text-sm text-muted-foreground mt-4">
                  Or call: <a href="tel:+2349074155361" className="text-foreground hover:text-accent transition-colors">{phone}</a>
                </p>

                {/* Services */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-12 pt-8 border-t border-border">
                  {[
                    "Web Development",
                    "Mobile Apps",
                    "AI Integration",
                    "API Development",
                    "UI/UX Design",
                    "Database Design"
                  ].map((service) => (
                    <span 
                      key={service}
                      className="text-sm text-muted-foreground px-3 py-2 rounded-lg bg-secondary/50"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
