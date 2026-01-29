import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "Rune",
    description: "🚀 Rune is your all-in-one productivity toolkit featuring 100+ powerful tools for learning, creating, and working smarter.",
    features: [
      "100+ free tools including text editors, PDF converters, and image processors",
      "AI-powered tools for writing, summarizing, and content creation",
      "Developer utilities with JSON formatter, regex tester, and code tools",
    ],
    tech: ["React", "TypeScript", "Next.js", "Tailwind CSS", "OpenAI", "Framer Motion"],
    link: "https://rune.codes/",
    color: "from-emerald-500/20 to-teal-500/10",
  },
  {
    title: "RuneAI",
    description: "🚀 RuneAI is a revolutionary AI-powered educational platform that transforms learning through personalized experiences.",
    features: [
      "AI-powered personalized learning with 24/7 intelligent tutoring",
      "Adaptive practice tests and performance analytics dashboard",
      "Collaborative learning hub with cross-platform synchronization",
    ],
    tech: ["React", "TypeScript", "Next.js", "Tailwind CSS", "OpenAI"],
    link: "https://runeai.tech/",
    color: "from-blue-500/20 to-indigo-500/10",
  },
  {
    title: "RuneHub",
    description: "🚀 RuneHub is a comprehensive programming education platform featuring extensive tutorials and articles.",
    features: [
      "Comprehensive programming tutorials and articles across multiple languages",
      "Tech trends section with latest industry news and insights",
      "Sanity CMS integration for efficient content management",
    ],
    tech: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Sanity CMS"],
    link: "https://runehub.page/",
    color: "from-purple-500/20 to-pink-500/10",
  },
];

const ProjectsSection = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-sm text-muted-foreground tracking-wider uppercase">
            Crafting modern experiences
          </span>
          <h2 className="mt-4 text-4xl md:text-6xl font-bold text-foreground">
            VENTURE{" "}
            <span className="font-serif italic font-normal text-muted-foreground">
              SHOWCASE
            </span>
          </h2>
        </motion.div>

        {/* Founder Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-12 card-gradient rounded-3xl p-8 border border-border"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-foreground">
            Founder of <span className="text-accent">Rune</span>
          </h3>
          <p className="mt-2 font-mono text-muted-foreground">
            {"<Crafting Digital Experiences/>"}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative card-gradient rounded-3xl p-8 border border-border overflow-hidden hover:border-accent/30 transition-colors duration-300"
            >
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center">
                    <span className="text-xl font-bold text-accent">
                      {project.title.charAt(0)}
                    </span>
                  </div>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full hover:bg-secondary transition-colors"
                  >
                    <ExternalLink className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                  </a>
                </div>

                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>

                <ul className="space-y-2 mb-6">
                  {project.features.map((feature, j) => (
                    <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full bg-secondary text-xs text-secondary-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* See more link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/ksparth12"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors animated-underline"
          >
            <Github className="w-5 h-5" />
            See more projects
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
