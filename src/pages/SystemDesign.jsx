import { motion } from "framer-motion";
import { systemDesigns } from "../data/portfolioData";
import PageHeader from "../components/PageHeader";
import WebGLBackground from "../components/WebGLBackground";

export default function SystemDesign() {
  return (
    <section className="max-w-3xl mx-auto space-y-12">
      <div className="max-w-5xl mx-auto px-6 space-y-14">
        {/* Page Header */}
        <PageHeader
          title="System Design"
          subtitle="Selected backend-focused designs emphasizing scalability, performance, and clean architecture."
        />

      <WebGLBackground />
        {/* Design Highlights */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-white/90">
            Design Highlights
          </h3>

          {systemDesigns && systemDesigns.length > 0 ? (
            <div className="space-y-6">
              {systemDesigns.map((design, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35 }}
                  whileHover={{ x: 6 }}
                  className="
                    rounded-xl p-6
                    bg-white/5 backdrop-blur
                    border border-white/10
                    hover:border-cyan-400/30
                    transition
                  "
                >
                  <div className="
                    flex flex-col sm:flex-row
                    sm:items-center sm:justify-between
                    gap-2 mb-2
                  ">
                    <h4 className="text-lg font-semibold">
                      {design.title}
                    </h4>
                    <span className="text-sm text-primary">
                      {design.stack}
                    </span>
                  </div>

                  <p className="text-white/70 leading-relaxed">
                    {design.description}
                  </p>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-white/50 italic">
              No system design highlights available.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
