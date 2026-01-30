import { motion } from "framer-motion";
import { Github, Linkedin, Facebook, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-16 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* GitHub Activity */}
          <motion.a
            href="https://github.com/Adeleonix"
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
              <span className="text-sm text-muted-foreground">Leonix's Github</span>
            </div>
            <p className="text-xs text-muted-foreground mb-1">Building</p>
            <p className="text-sm text-foreground font-mono">
              "Scalable, efficient applications across the full stack"
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
            <p className="text-xs text-muted-foreground mb-2">Let's Connect</p>
            <h3 className="text-xl font-bold text-foreground mb-2">
              Collaborate on your{" "}
              <span className="font-serif italic font-normal">next project</span>
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Open to freelance opportunities and collaborations.
            </p>
            <a
              href="https://wa.me/2349074155361"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Start a conversation
            </a>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Toheeb Adeleke</span>
            <span className="text-sm text-foreground font-medium">@leonixdevz</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/leonixadeleke"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-secondary transition-colors"
            >
              <Linkedin className="w-5 h-5 text-muted-foreground hover:text-foreground" />
            </a>
            <a
              href="https://github.com/Adeleonix"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-secondary transition-colors"
            >
              <Github className="w-5 h-5 text-muted-foreground hover:text-foreground" />
            </a>
            <a
              href="https://instagram.com/leonixdevz"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-secondary transition-colors"
            >
              <Instagram className="w-5 h-5 text-muted-foreground hover:text-foreground" />
            </a>
            <a
              href="https://web.facebook.com/people/Toheeb-Adeleke/61580642197907/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-secondary transition-colors"
            >
              <Facebook className="w-5 h-5 text-muted-foreground hover:text-foreground" />
            </a>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Leonix (Toheeb Adeleke). Built with passion & precision.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
