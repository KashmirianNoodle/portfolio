import { motion } from "framer-motion";
import PageWrapper from "../components/PageWrapper";
import PageHeader from "../components/PageHeader";
import WebGLBackground from "../components/WebGLBackground";

const skillGroups = [
  {
    title: "Programming",
    icon: "💻",
    skills: ["JavaScript (ES6+)", "TypeScript", "Node.js Runtime"]
  },
  {
    title: "Backend Engineering",
    icon: "⚙️",
    skills: [
      "Node.js",
      "Express.js",
      "GraphQL",
      "Sequelize ORM",
      "Socket.io",
      "RESTful APIs"
    ]
  },
  {
    title: "Databases & Caching",
    icon: "🗄️",
    skills: [
      "PostgreSQL",
      "DynamoDB",
      "Redis",
      "Data Modeling",
      "Index Optimization"
    ]
  },
  {
    title: "Cloud & Serverless",
    icon: "☁️",
    skills: [
      "AWS Lambda",
      "API Gateway",
      "S3",
      "SNS",
      "SQS",
      "Cognito",
      "Serverless Framework"
    ]
  },
  {
    title: "Architecture",
    icon: "🧠",
    skills: [
      "Microservices",
      "Event-Driven Systems",
      "Serverless Architecture",
      "Scalability",
      "Load Balancing",
      "Payment Processing Systems"
    ]
  },
  {
    title: "DevOps & Testing",
    icon: "🚀",
    skills: [
      "Docker",
      "CI/CD Pipelines",
      "Git",
      "Jest",
      "Postman",
      "Monitoring & Logging"
    ]
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
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

function SkillCard({ group }) {
  return (
    <motion.div
      variants={card}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 140 }}
      className="
        group relative rounded-2xl p-6
        bg-white/5 backdrop-blur-xl
        border border-cyan-400/10
        hover:border-cyan-400/40
        transition-all duration-300
        hover:shadow-[0_0_35px_rgba(0,255,198,0.18)]
        overflow-hidden
      "
    >
      {/* Glow aura on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-56 h-56 bg-cyan-400/10 blur-3xl rounded-full" />
      </div>

      {/* Header */}
      <div className="flex items-center gap-4 mb-6 relative z-10">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="
            flex h-11 w-11 items-center justify-center
            rounded-xl
            bg-cyan-500/10
            border border-cyan-400/20
            text-xl
          "
        >
          {group.icon}
        </motion.div>

        <h3 className="text-lg font-semibold tracking-wide text-white">
          {group.title}
        </h3>
      </div>

      {/* Skills */}
      <ul className="flex flex-wrap gap-2 relative z-10">
        {group.skills.map(skill => (
          <motion.li
            key={skill}
            whileHover={{ scale: 1.06 }}
            className="
              px-3 py-1.5 text-xs rounded-full
              bg-white/5
              border border-cyan-400/10
              text-white/80
              hover:border-cyan-400/40
              hover:text-cyan-300
              transition
              cursor-default
              backdrop-blur-md
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
      <WebGLBackground />
      <section className="relative">

        {/* subtle background glow */}
        <div/>
{/* "absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-400/10 blur-[140px] rounded-full pointer-events-none" */}
        <motion.div
          className="max-w-6xl mx-auto px-6 space-y-16 relative z-10"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <PageHeader
            title="Skills"
            subtitle="An infrastructure-focused toolkit built for performance, scalability, and production-grade reliability."
          />

          <motion.div
            variants={container}
            className="
              grid gap-8
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
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
