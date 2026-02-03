import { motion } from "framer-motion";
import PageWrapper from "../components/PageWrapper";
import PageHeader from "../components/PageHeader";
import WebGLBackground from "../components/WebGLBackground";

const achievements = [
  {
    metric: "$800 / month",
    title: "Infrastructure Cost Reduction",
    desc: "Reduced infrastructure costs through intelligent caching and query optimization."
  },
  {
    metric: "60%",
    title: "API Performance Improvement",
    desc: "Improved API response times by implementing Redis caching and database optimizations."
  },
  {
    metric: "$2M+ / month",
    title: "Transaction Volume",
    desc: "Processed high-volume transactions through payment and wallet system integrations."
  },
  {
    metric: "₹100 Cr+",
    title: "Capital Facilitated",
    desc: "Contributed to a fintech platform facilitating large-scale agricultural investments."
  },
  {
    metric: "40%",
    title: "Faster Document Processing",
    desc: "Reduced document processing time via third-party API integrations."
  },
  {
    metric: "180ms → 45ms",
    title: "P95 Latency Reduction",
    desc: "Lowered P95 query latency through migration to optimized NoSQL data models."
  }
];

export default function Achievements() {
  return (
    <PageWrapper>
            <WebGLBackground />
      <div className="max-w-4xl mx-auto space-y-14">

        {/* Header */}
        <PageHeader
          title="Key Achievements"
          subtitle="Measurable impact across performance, scalability, reliability, and cost optimization."
/>
        {/* Stacked Achievements */}
        <div className="space-y-6">
          {achievements.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.35, delay: index * 0.04 }}
              whileHover="hover"
              className="
                group relative
                rounded-2xl p-6
                bg-white/5 backdrop-blur
                border border-white/10
                hover:border-cyan-400/40
                transition
              "
            >
              <div className="flex flex-col sm:flex-row gap-6 items-start">

                {/* Metric */}
                <motion.div
                  variants={{
                    hover: {
                      scale: 1.08
                    }
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  className="
                    sm:w-40 shrink-0
                    text-primary text-2xl font-bold
                    relative
                  "
                >
                  {item.metric}

                  {/* Glow */}
                  <span
                    className="
                      absolute inset-0
                      blur-xl opacity-0
                      group-hover:opacity-30
                      bg-cyan-400
                      transition
                      -z-10
                    "
                  />
                </motion.div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">
                    {item.title}
                  </h3>

                  <p className="text-sm text-white/70 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* Accent line */}
              <span
                className="
                  absolute left-0 top-6 bottom-6
                  w-[2px]
                  bg-cyan-400/0
                  group-hover:bg-cyan-400/40
                  transition
                "
              />
            </motion.div>
          ))}
        </div>

      </div>
    </PageWrapper>
  );
}
