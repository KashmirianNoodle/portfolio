import { motion } from "framer-motion";
import { useState } from "react";

export default function ProjectCard({ project, index }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15 }}
      whileHover={{ scale: 1.02 }}
      className="bg-card border border-slate-700 p-6 rounded-2xl shadow-lg hover:shadow-primary/10 transition-all duration-300"
      onClick={() => setExpanded(!expanded)}
    >
      <h3 className="text-xl font-semibold mb-2">
        {project.title}
      </h3>

      <p className="text-gray-400 mb-4">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-3">
        {project.tech.map((tech, i) => (
          <span
            key={i}
            className="bg-background px-3 py-1 rounded-full text-xs text-primary"
          >
            {tech}
          </span>
        ))}
      </div>

      <p className="text-primary text-sm font-medium mb-2">
        🚀 {project.impact}
      </p>

      {expanded && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-300 mt-3"
        >
          {project.details}
        </motion.p>
      )}
    </motion.div>
  );
}
