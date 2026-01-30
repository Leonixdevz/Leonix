import { motion } from "framer-motion";

const skills = [
  { name: "React", icon: "⚛️" },
  { name: "Next.js", icon: "▲" },
  { name: "TypeScript", icon: "TS" },
  { name: "Tailwind CSS", icon: "🎨" },
  { name: "Node.js", icon: "🟢" },
  { name: "Python", icon: "🐍" },
  { name: "Flutter", icon: "💙" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "MongoDB", icon: "🍃" },
  { name: "Express", icon: "⚡" },
  { name: "Flask", icon: "🌶️" },
  { name: "Figma", icon: "🎯" },
  { name: "Git", icon: "⎇" },
  { name: "GitHub", icon: "🐙" },
  { name: "Godot", icon: "🎮" },
  { name: "YOLO/ML", icon: "🤖" },
];

const attributes = [
  "Responsive",
  "Scalable",
  "User-Friendly",
  "Modern",
  "Performant",
  "Clean Code",
  "AI-Powered",
  "Cross-Platform",
  "Secure",
];

const SkillsSection = () => {
  return (
    <section className="py-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">
            MY SKILLSET{" "}
            <span className="font-serif italic font-normal text-muted-foreground">
              The Tech Stack
            </span>
          </h2>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              viewport={{ once: true }}
              className="skill-card card-gradient rounded-2xl p-4 border border-border flex flex-col items-center justify-center gap-2 hover:border-accent/50 cursor-default"
            >
              <span className="text-2xl">{skill.icon}</span>
              <span className="text-sm font-medium text-foreground">{skill.name}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Attributes Marquee */}
        <div className="mt-16 relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
          
          <div className="marquee py-4">
            <div className="marquee-content">
              {[...attributes, ...attributes].map((attr, i) => (
                <span
                  key={i}
                  className="flex items-center gap-4 px-6 text-xl font-medium text-foreground whitespace-nowrap"
                >
                  {attr}
                  <span className="text-accent">✦</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
