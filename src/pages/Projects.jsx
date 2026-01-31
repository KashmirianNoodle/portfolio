import PageHeader from "../components/PageHeader";
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
        className="mb-12"
      >
      <PageHeader
        title="Projects"
        subtitle="A selection of production-grade engineering work and side projects."
      />

      </motion.h2>

        <div className="
          grid gap-6
          grid-cols-1
          md:grid-cols-2
        ">
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
