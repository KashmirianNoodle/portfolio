import { motion } from "framer-motion";
import Counter from "../components/Counter";
import GlassCard from "../components/GlassCard";
import { Link } from "react-router-dom";
import { Download } from "lucide-react";
import FloatingBadges from "../components/FloatingBadges";
// import EventQueue from "../components/EventQueue";
import TerminalTyping from './../components/TerminalTyping';
import MatrixRain from "../components/MatrixRain";

export default function Home() {
  return (
    <section className="relative min-h-screen flex items-center py-20">
      <FloatingBadges />
       <MatrixRain />
      {/* Glow Accent */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-primary/20 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative w-full space-y-20">

        {/* ================= HERO SECTION ================= */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <p className="text-primary text-sm tracking-widest uppercase">
                Backend Engineer
              </p>

              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Hi, I'm <span className="text-primary">Mir Shafeeq</span>
              </h1>

              <p className="text-white/70 text-lg max-w-xl leading-relaxed">
                I design scalable, event-driven backend systems with
                high-performance data layers and secure authentication flows.
                Focused on cloud-native architecture and production-grade reliability.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">

              <Link
                to="/projects"
                className="px-6 py-3 rounded-xl bg-primary text-black font-semibold hover:scale-105 transition"
              >
                View Projects
              </Link>

              <Link
                to="/contact"
                className="px-6 py-3 rounded-xl border border-white/20 hover:border-primary transition"
              >
                Contact Me
              </Link>

              <a
                href="/mir_shafeeq_resume.pdf"
                download
                className="
                  px-6 py-3 rounded-xl
                  border border-primary/30
                  text-primary font-semibold
                  hover:bg-primary/10
                  hover:scale-105
                  hover:shadow-[0_0_20px_rgba(0,255,198,0.3)]
                  transition
                  backdrop-blur-md
                  flex items-center gap-2
                "
              >
                <Download size={16} />
                Download CV
              </a>

            </div>
          </motion.div>

          {/* RIGHT SIDE - Terminal Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="
              bg-black/50 border border-white/10
              rounded-2xl p-6 md:p-8
              code-font backdrop-blur-xl
            "
          >
            <TerminalTyping />
            {/* <p className="text-green-400">$ whoami</p>
            <p className="text-lg md:text-xl">Mir Shafeeq</p>

            <p className="text-green-400 mt-5">$ stack</p>
            <p className="text-white/80 leading-relaxed">
              Node.js · TypeScript · Express · AWS · DynamoDB · PostgreSQL · Redis · GraphQL · WebSockets
            </p>

            <p className="text-green-400 mt-5">$ focus</p>
            <p className="text-white/80">
              Distributed Systems · Event-Driven Architecture · Microservices · Auth · Caching · Serverless
            </p>

            <p className="mt-4 text-primary animate-pulse">▋</p> */}
          </motion.div>

        </div>

        {/* ================= METRICS ================= */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          <GlassCard>
            <Counter value={60} label="Latency Reduced (%)" />
          </GlassCard>

          <GlassCard>
            <Counter value={40} label="DB Read Optimization (%)" />
          </GlassCard>

          <GlassCard>
            <Counter value={100} label="Capital Processed (Cr+ ₹)" />
          </GlassCard>

          <GlassCard>
            <Counter value={30} label="Test Coverage Increase (%)" />
          </GlassCard>
        </motion.div>

      </div>
    </section>
  );
}
