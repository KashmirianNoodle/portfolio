import { motion } from "framer-motion";
import Counter from "../components/Counter";
import GlassCard from "../components/GlassCard";

export default function Home() {
  return (
    <section className="min-h-screen flex items-center">
      <div className="w-full space-y-16">

        {/* ================= HERO / TERMINAL ================= */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="
            bg-black/50 border border-white/10
            rounded-2xl p-6 md:p-8
            code-font max-w-4xl
          "
        >
          <p className="text-green-400">$ whoami</p>
          <p className="text-lg md:text-xl">
            Mir Shafeeq
          </p>

          <p className="text-green-400 mt-5">$ role</p>
          <p>
            Backend Developer
          </p>

          <p className="text-green-400 mt-5">$ stack</p>
          <p className="text-white/80 leading-relaxed">
            Node.js · TypeScript · Express · AWS (Lambda, API Gateway,
            DynamoDB, SQS, SNS, Cognito) · PostgreSQL · Redis · WebSockets
          </p>
        </motion.div>

        {/* ================= SUMMARY ================= */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <GlassCard>
            <p className="text-white/80 leading-relaxed max-w-4xl">
              Backend developer with 3+ years of experience building
              scalable, cloud-native systems. Strong focus on
              distributed architectures, event-driven design,
              authentication (AWS Cognito, MFA), caching, and
              high-performance data layers in production environments.
            </p>
          </GlassCard>
        </motion.div>

        {/* ================= METRICS ================= */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="
            grid gap-4
            grid-cols-2
            md:grid-cols-4
          "
        >
          <Counter value={60} label="Latency Reduced (%)" />
          <Counter value={40} label="DB Read Improvement (%)" />
          <Counter value={100} label="Capital Processed (Cr+ ₹)" />
          <Counter value={30} label="Test Coverage Increase (%)" />
        </motion.div>

      </div>
    </section>
  );
}
