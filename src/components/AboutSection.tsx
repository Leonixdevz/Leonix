import { motion } from "framer-motion";
import { Linkedin, Github, Facebook, Instagram } from "lucide-react";

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
                Hi, I'm Toheeb Adeleke—a Full-Stack Developer and Software Engineer 
                with a passion for creating modern, user-friendly, and scalable 
                digital solutions. My journey into tech began with curiosity for 
                problem-solving and design.
              </p>
              <p>
                From building responsive web applications to developing mobile apps 
                and implementing AI solutions, I thrive on turning ideas into reality. 
                I believe in writing clean, maintainable code and creating intuitive 
                user experiences that make a difference.
              </p>
              <p>
                I have expertise in React, Next.js, TypeScript, Node.js, Flutter, 
                and various backend technologies. I'm constantly exploring emerging 
                technologies and contributing to open-source projects.
              </p>
              <p className="text-foreground font-medium">
                Let's connect and discuss your project!
              </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-8">
              <a
                href="https://www.linkedin.com/in/leonixadeleke"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-secondary hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/Adeleonix"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-secondary hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://web.facebook.com/people/Toheeb-Adeleke/61580642197907/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-secondary hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/leonixdevz"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-secondary hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Instagram className="w-5 h-5" />
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
            {["BUILD", "CREATE", "CODE"].map((label, i) => (
              <div
                key={label}
                className="aspect-[3/4] rounded-2xl overflow-hidden relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent z-10" />
                <div 
                  className={`absolute inset-0 ${
                    i === 0 ? 'bg-gradient-to-br from-accent/30 to-accent/10' :
                    i === 1 ? 'bg-gradient-to-br from-accent/20 to-accent/5' :
                    'bg-gradient-to-br from-accent/25 to-accent/10'
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
