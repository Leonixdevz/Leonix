import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Music } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-16 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* GitHub Activity */}
          <motion.a
            href="https://github.com/ksparth12"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="card-gradient rounded-3xl p-6 border border-border hover:border-accent/30 transition-colors group"
          >
            <div className="flex items-center gap-3 mb-4">
              <Github className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              <span className="text-sm text-muted-foreground">Parth's Github</span>
            </div>
            <p className="text-xs text-muted-foreground mb-1">Latest Push</p>
            <p className="text-sm text-foreground font-mono">
              "Building the future, one commit at a time"
            </p>
          </motion.a>

          {/* Community Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="card-gradient rounded-3xl p-6 border border-border"
          >
            <p className="text-xs text-muted-foreground mb-2">Community</p>
            <h3 className="text-xl font-bold text-foreground mb-2">
              Join the{" "}
              <span className="font-serif italic font-normal">journey</span>
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Building the future together.
            </p>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {["LX", "AI", "DEV"].map((initials, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-secondary border-2 border-background flex items-center justify-center text-xs font-bold"
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <span className="text-xs text-muted-foreground">Growing community</span>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Music className="w-4 h-4 text-accent animate-pulse" />
            <span className="text-sm text-muted-foreground">Last Played</span>
            <span className="text-sm text-foreground">Rakhlo Tum Chupaake</span>
            <span className="text-sm text-muted-foreground">by Arpit Bala</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://linkedin.com/in/ksparth128"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-secondary transition-colors"
            >
              <Linkedin className="w-5 h-5 text-muted-foreground hover:text-foreground" />
            </a>
            <a
              href="https://github.com/ksparth12"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-secondary transition-colors"
            >
              <Github className="w-5 h-5 text-muted-foreground hover:text-foreground" />
            </a>
            <a
              href="https://x.com/ksparth12"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-secondary transition-colors"
            >
              <Twitter className="w-5 h-5 text-muted-foreground hover:text-foreground" />
            </a>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Parth Sharma. Built with passion & precision.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
