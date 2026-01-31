import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import PageHeader from "../components/PageHeader";

const experiences = [
  {
    role: "Backend Developer",
    company: "Atomic House",
    type: "Bookmark Management Startup",
    date: "May 2025 – Nov 2025",
    location: "Remote",
    impact:
      "Reduced API response times by up to 60% and improved DynamoDB read performance by ~40%.",
    tech: ["Node.js", "Redis", "DynamoDB", "Zod", "AWS"],
    points: [
      "Implemented a Redis-based caching layer, reducing database load and improving response times by up to 60%.",
      "Migrated backend services from SQL (Prisma ORM) to NoSQL (DynamoDB with Dynamoose), improving scalability for high-throughput workloads.",
      "Integrated schema validation using Zod at API boundaries, significantly reducing runtime errors.",
      "Refactored legacy code into a modular architecture, improving maintainability and developer onboarding.",
      "Optimized DynamoDB data models and indexes, achieving ~40% faster read performance on critical endpoints."
    ]
  },
  {
    role: "Software Development Engineer",
    company: "Zithara",
    type: "Jewelry Retail CRM",
    date: "Mar 2024 – Oct 2024",
    location: "Hyderabad",
    impact:
      "Enabled real-time CRM workflows, automated campaigns, and strengthened platform security.",
    tech: ["AWS", "EventBridge", "WebSockets", "Redis", "Cognito"],
    points: [
      "Built a dynamic query builder enabling efficient querying of leads, customers, and campaigns.",
      "Designed and implemented campaign scheduling using AWS EventBridge.",
      "Developed a real-time chat system using WebSockets and Redis Pub/Sub.",
      "Implemented custom authentication and MFA using AWS Cognito.",
      "Engineered loyalty and referral programs.",
      "Integrated wallet and payment systems with third-party providers."
    ]
  },
  {
    role: "Junior Software Engineer",
    company: "Growpital",
    type: "Fintech / Agritech Investment Platform",
    date: "Sep 2022 – Feb 2024",
    location: "Remote",
    impact:
      "Supported transactions contributing to ₹100 Cr+ in capital and improved backend reliability.",
    tech: ["Node.js", "AWS", "Cognito", "Jest", "Pub/Sub"],
    points: [
      "Contributed to a publish–subscribe based payment processing system supporting ₹100 Cr+ in capital.",
      "Built a user impersonation feature using AWS Cognito tokens.",
      "Integrated Zoho and Digio for document workflows.",
      "Improved backend reliability with API validations and unit tests."
    ]
  }
];

export default function Experience() {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(null);
  const [open, setOpen] = useState(0); // 👈 auto-expand most recent role

  /* Timeline scroll animation */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <PageWrapper>
    <section >
      <div ref={ref}>
        {/* Heading */}
        <section className="pb-16">
          <div >
            <PageHeader
              title="Experience"
              subtitle="Building scalable backend systems across startups, fintech, and SaaS platforms."
            />

            {/* timeline stays the same */}
          </div>
        </section>
        {/* Timeline */}
        <div className="relative">
          {/* Base line */}
          <div className="absolute left-4 top-0 h-full w-px bg-white/10" />

          {/* Animated fill line */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-4 top-0 w-px bg-cyan-400 origin-top"
          />

          <div className="space-y-16">
            {experiences.map((exp, idx) => {
              const isOpen = open === idx;
              const isDimmed = hovered !== null && hovered !== idx;

              return (
                <motion.div
                  key={idx}
                  onMouseEnter={() => setHovered(idx)}
                  onMouseLeave={() => setHovered(null)}
                  animate={{ opacity: isDimmed ? 0.35 : 1 }}
                  transition={{ duration: 0.25 }}
                  className="relative pl-14"
                >
                  {/* Timeline dot */}
                  <span className="absolute left-2 top-7 w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.6)]" />

                  {/* Card */}
                  <motion.div
                    layout
                    className="
                      rounded-2xl p-6
                      bg-white/5 backdrop-blur-xl
                      border border-white/10
                      shadow-lg
                    "
                  >
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-2 mb-3">
                      <h3 className="text-xl font-semibold">
                        {exp.role}
                      </h3>
                      <span className="text-sm text-white/50">
                        {exp.date}
                      </span>
                    </div>

                    <p className="text-white/80">
                      <span className="font-medium">{exp.company}</span>{" "}
                      · {exp.type}
                    </p>
                    <p className="text-sm text-white/50 mb-4">
                      {exp.location}
                    </p>

                    {/* Key Impact */}
                    <div className="
                      mb-4 p-4 rounded-xl
                      bg-cyan-400/10 border border-cyan-400/20
                      text-sm text-cyan-200
                    ">
                      <span className="font-semibold text-cyan-300">
                        Key Impact:
                      </span>{" "}
                      {exp.impact}
                    </div>

                    {/* Tech */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {exp.tech.map(t => (
                        <span
                          key={t}
                          className="
                            px-3 py-1 text-xs rounded-full
                            bg-black/40 border border-white/10
                            text-white/70
                          "
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Expandable content */}
                    <motion.ul
                      layout
                      initial={false}
                      animate={{
                        height: isOpen ? "auto" : 0,
                        opacity: isOpen ? 1 : 0
                      }}
                      className="overflow-hidden space-y-2 text-white/80 text-sm"
                    >
                      {exp.points.map((point, i) => (
                        <li key={i}>• {point}</li>
                      ))}
                    </motion.ul>

                    {/* Toggle */}
                    <button
                      onClick={() => setOpen(isOpen ? null : idx)}
                      className="mt-4 text-sm text-cyan-400 hover:text-cyan-300"
                    >
                      {isOpen ? "Show less ↑" : "Show more ↓"}
                    </button>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
    </PageWrapper>
  );
}
