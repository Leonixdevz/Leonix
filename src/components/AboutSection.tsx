import { motion } from "framer-motion";
import { Linkedin, Github, Twitter } from "lucide-react";

const AboutSection = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              A QUICK GLANCE{" "}
              <span className="font-serif italic font-normal text-muted-foreground block mt-2">
                Building the bridge between ideas and experiences
              </span>
            </h2>

            <div className="space-y-4 text-muted-foreground">
              <p>
                I'm Parth Sharma, an engineering-driven developer who turns complex
                technical challenges into high-speed web products. I manage the
                entire stack with a focus on clean, reusable code and seamless
                performance.
              </p>
              <p>
                I excel in Next.js and full-stack architecture, always delivering
                modern solutions that actually solve problems for every user.
              </p>
              <p>
                As the founder of Rune, I manage platforms like Rune AI and Rune
                Hub. Building a startup ecosystem has taught me how to ship
                products that scale.
              </p>
              <p className="text-foreground font-medium">
                My code is built to last, helping your startup reach the next
                level!
              </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-8">
              <a
                href="https://linkedin.com/in/ksparth128"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-secondary hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/ksparth12"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-secondary hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/ksparth12"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-secondary hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>

          </motion.div>

          {/* Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-3 gap-4"
          >
            {["EAT", "TRAVEL", "CODE"].map((label, i) => (
              <div
                key={label}
                className="aspect-[3/4] rounded-2xl overflow-hidden relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent z-10" />
                <div 
                  className={`absolute inset-0 ${
                    i === 0 ? 'bg-gradient-to-br from-orange-500/30 to-red-500/20' :
                    i === 1 ? 'bg-gradient-to-br from-blue-500/30 to-cyan-500/20' :
                    'bg-gradient-to-br from-accent/30 to-emerald-500/20'
                  }`}
                />
                <span className="absolute bottom-4 left-4 z-20 text-2xl font-bold text-foreground">
                  {label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
