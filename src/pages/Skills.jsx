import { motion } from "framer-motion";
import PageWrapper from "../components/PageWrapper";
import PageHeader from "../components/PageHeader";

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
    transition: { staggerChildren: 0.1 }
  }
};

const card = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" }
  }
};

function SkillCard({ group }) {
  return (
    <motion.div
      variants={card}
      whileHover={{ y: -6 }}
      className="
        group relative rounded-2xl p-6
        bg-white/5 backdrop-blur-xl
        border border-white/10
        hover:border-cyan-400/40
        transition
      "
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-5">
        <div
          className="
            flex h-10 w-10 items-center justify-center
            rounded-xl bg-cyan-500/10
            text-xl
            group-hover:scale-110
            transition
          "
        >
          {group.icon}
        </div>

        <h3 className="text-lg font-semibold tracking-wide">
          {group.title}
        </h3>
      </div>

      {/* Skills */}
      <ul className="flex flex-wrap gap-2">
        {group.skills.map(skill => (
          <motion.li
            key={skill}
            whileHover={{ y: -2, scale: 1.05 }}
            className="
              px-3 py-1.5 text-sm rounded-full
              bg-black/40
              border border-white/10
              text-white/80
              hover:border-cyan-400/40
              hover:text-white
              transition
              cursor-default
            "
          >
            {skill}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <PageWrapper>
      <section>
        <motion.div
          // className="max-w-6xl mx-auto px-6"
          className="max-w-3xl mx-auto space-y-12"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
      <section>
        <div>

          <PageHeader
            title="Skills"
            subtitle="A focused toolkit shaped by shipping production systems — optimized for performance, scalability, and reliability."
          />

          {/* grid stays the same */}
        </div>
      </section>

          {/* Grid */}
          <motion.div
            variants={container}
            className="
                grid gap-6
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-4
              "
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
