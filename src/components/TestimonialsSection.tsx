import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Gulshan Sharma",
    role: "SDE II, Big4",
    quote: "Parth's attention to detail and focus on creating smooth interfaces helped refine our work significantly. His frontend skills stand out clearly.",
    initials: "GS",
  },
  {
    name: "Shashank Kumar",
    role: "Senior Software Engineer, Cognizant",
    quote: "Working with Parth has been genuinely positive. He brings strong frontend knowledge and fresh perspective to every problem, making collaboration smooth.",
    initials: "SK",
  },
  {
    name: "Armaan Singh",
    role: "Technical Lead, Infosys",
    quote: "Parth contributed solid improvements through structured approach and clear communication. He's someone you can rely on when building quality interfaces.",
    initials: "AS",
  },
  {
    name: "Akshit Malik",
    role: "Software Engineer III, Google",
    quote: "Parth stands out as a reliable frontend contributor. His clean code and user-friendly interfaces consistently add value with dependable initiative.",
    initials: "AM",
  },
  {
    name: "Yuvika Bhat",
    role: "Product Manager, Amazon",
    quote: "Parth is a great frontend developer who understood our needs and improved things effectively. His attention to detail made collaboration comfortable.",
    initials: "YB",
  },
  {
    name: "Gaurav Pandey",
    role: "Senior Developer, Microsoft",
    quote: "Parth brings balanced technical understanding and practical thinking to collaborations. His full-stack knowledge simplified complex ideas into usable, elegant interfaces.",
    initials: "GP",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm text-muted-foreground tracking-wider uppercase">
            What others say
          </span>
          <h2 className="mt-4 text-4xl md:text-6xl font-bold text-foreground">
            The Voices{" "}
            <span className="font-serif italic font-normal text-muted-foreground">
              Behind
            </span>
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="card-gradient rounded-3xl p-6 border border-border hover:border-accent/30 transition-colors duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center text-sm font-bold text-accent">
                  {testimonial.initials}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                "{testimonial.quote}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
