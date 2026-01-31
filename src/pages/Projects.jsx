import PageWrapper from "../components/PageWrapper";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/portfolioData";
import { motion } from "framer-motion";

export default function Projects() {
  return (
    <PageWrapper>
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-3xl font-bold text-primary mb-12"
      >
        Engineering Projects
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            project={project}
            index={index}
          />
        ))}
      </div>
    </PageWrapper>
  );
}
