import { motion } from "framer-motion";
import PageWrapper from "../components/PageWrapper";

const skillGroups = [
  {
    title: "Frontend",
    icon: "🎨",
    skills: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"]
  },
  {
    title: "Backend",
    icon: "⚙️",
    skills: ["Node.js", "Express", "PostgreSQL", "MongoDB", "REST APIs"]
  },
  {
    title: "System Design",
    icon: "🧠",
    skills: ["Scalability", "Caching", "Load Balancing", "Microservices"]
  },
  {
    title: "DevOps & Tools",
    icon: "🚀",
    skills: ["Docker", "CI/CD", "AWS", "Nginx", "Git"]
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
  }
};

const card = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

function SkillCard({ group }) {
  return (
    <motion.div
      variants={card}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="
        relative rounded-2xl p-6
        bg-white/5 backdrop-blur-xl
        border border-white/10
        shadow-lg
        hover:border-cyan-400/40
        hover:shadow-cyan-500/20
      "
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">{group.icon}</span>
        <h3 className="text-lg font-semibold tracking-wide">
          {group.title}
        </h3>
      </div>

      <ul className="flex flex-wrap gap-2">
        {group.skills.map(skill => (
          <li
            key={skill}
            className="
              px-3 py-1 text-sm rounded-full
              bg-black/40
              border border-white/10
              text-white/80
              hover:border-cyan-400/40
            "
          >
            {skill}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <PageWrapper>
    <section className="min-h-screen flex items-center">
      <motion.div
        className="max-w-6xl mx-auto px-6 w-full"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Heading */}
        <motion.h2
          variants={card}
          className="text-4xl font-bold text-center mb-4"
        >
          Skills
        </motion.h2>

        {/* Subtext */}
        <motion.p
          variants={card}
          className="max-w-2xl mx-auto text-center text-white/70 mb-14"
        >
          A focused toolkit shaped by building real products —
          optimized for performance, scalability, and clean architecture.
        </motion.p>

        {/* Grid */}
        <motion.div
          variants={container}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {skillGroups.map(group => (
            <SkillCard key={group.title} group={group} />
          ))}
        </motion.div>
      </motion.div>
    </section>
    </PageWrapper>
  );
}
