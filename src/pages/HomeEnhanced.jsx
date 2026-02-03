import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Download, Code2, Database, Zap } from "lucide-react";
import FloatingBadges from "../components/FloatingBadges";
import TerminalTyping from './../components/TerminalTyping';
import Rotating3DObject from '../components/Rotating3DObject';
import InteractiveParticles from '../components/InteractiveParticles';
import HolographicCard, { HolographicMetricCard, HolographicProjectCard } from '../components/HolographicCard';

export default function Home() {
  return (
    <section className="relative min-h-screen py-20">
      <FloatingBadges />

      {/* Interactive Particle Background */}
      <div className="fixed inset-0 pointer-events-none opacity-30 z-0">
        <InteractiveParticles particleCount={1500} showConnections={true} />
      </div>

      {/* Glow Accent */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-primary/20 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative w-full space-y-20 z-10">

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

          {/* RIGHT SIDE - Terminal Card with 3D Object */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            {/* 3D Object Background */}
            <div className="absolute inset-0 z-0 opacity-40">
              <Rotating3DObject type="sphere" />
            </div>

            {/* Terminal Content */}
            <HolographicCard
              className="
                relative z-10
                bg-black/50 
                rounded-2xl p-6 md:p-8
                code-font backdrop-blur-xl
                border border-white/10
              "
              intensity={1.2}
            >
              <TerminalTyping />
            </HolographicCard>
          </motion.div>

        </div>

        {/* ================= HOLOGRAPHIC METRICS ================= */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          <HolographicMetricCard
            value="60%"
            label="Latency Reduced"
            icon="⚡"
          />

          <HolographicMetricCard
            value="40%"
            label="DB Read Optimization"
            icon="📊"
          />

          <HolographicMetricCard
            value="₹100Cr+"
            label="Capital Processed"
            icon="💰"
          />

          <HolographicMetricCard
            value="30%"
            label="Test Coverage Increase"
            icon="✅"
          />
        </motion.div>

        {/* ================= FEATURED PROJECTS WITH 3D ================= */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-8"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">Featured Projects</h2>
            <Link 
              to="/projects" 
              className="text-primary hover:underline"
            >
              View All →
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <HolographicProjectCard
              title="High-Performance Caching Layer"
              description="Redis-based multi-tier caching system reducing DB load by 70%."
              tech={["Node.js", "Redis", "DynamoDB"]}
            />

            <HolographicProjectCard
              title="Event-Driven Payment System"
              description="Scalable async payment architecture handling 50K+ transactions."
              tech={["AWS SNS", "SQS", "Lambda"]}
            />

            <HolographicProjectCard
              title="Real-Time Chat System"
              description="Low-latency messaging with Redis Pub/Sub (<200ms delivery)."
              tech={["WebSocket", "Redis", "Node.js"]}
            />
          </div>
        </motion.div>

        {/* ================= TECH STACK WITH 3D VISUALIZATION ================= */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="space-y-8"
        >
          <h2 className="text-3xl font-bold text-center">Tech Stack</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Backend Card with rotating Torus */}
            <div className="relative">
              <div className="absolute inset-0 z-0 opacity-30">
                <Rotating3DObject type="torus" />
              </div>
              <HolographicCard
                className="relative z-10 p-6 rounded-xl bg-black/40 backdrop-blur-xl border border-white/10"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Code2 className="text-primary" size={32} />
                  <h3 className="text-xl font-bold">Backend</h3>
                </div>
                <div className="space-y-2 text-white/70">
                  <p>• Node.js & TypeScript</p>
                  <p>• Express & NestJS</p>
                  <p>• GraphQL & REST APIs</p>
                  <p>• AWS Lambda & Serverless</p>
                </div>
              </HolographicCard>
            </div>

            {/* Database Card with rotating Cube */}
            <div className="relative">
              <div className="absolute inset-0 z-0 opacity-30">
                <Rotating3DObject type="cube" />
              </div>
              <HolographicCard
                className="relative z-10 p-6 rounded-xl bg-black/40 backdrop-blur-xl border border-white/10"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Database className="text-primary" size={32} />
                  <h3 className="text-xl font-bold">Databases</h3>
                </div>
                <div className="space-y-2 text-white/70">
                  <p>• PostgreSQL & DynamoDB</p>
                  <p>• MongoDB & Redis</p>
                  <p>• Sequelize & Prisma</p>
                  <p>• Query Optimization</p>
                </div>
              </HolographicCard>
            </div>

            {/* Architecture Card with rotating Sphere */}
            <div className="relative">
              <div className="absolute inset-0 z-0 opacity-30">
                <Rotating3DObject type="sphere" />
              </div>
              <HolographicCard
                className="relative z-10 p-6 rounded-xl bg-black/40 backdrop-blur-xl border border-white/10"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="text-primary" size={32} />
                  <h3 className="text-xl font-bold">Architecture</h3>
                </div>
                <div className="space-y-2 text-white/70">
                  <p>• Microservices</p>
                  <p>• Event-Driven Systems</p>
                  <p>• Caching Strategies</p>
                  <p>• Cloud Infrastructure</p>
                </div>
              </HolographicCard>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
