import { motion } from "framer-motion";
import { useMemo } from "react";

export default function AnimatedBackground() {
  // Generate particle positions once
  const particles = useMemo(() => {
    return Array.from({ length: 25 }).map(() => ({
      left: Math.random() * 100,
      size: 4 + Math.random() * 6,
      duration: 20 + Math.random() * 10,
      delay: Math.random() * 10,
    }));
  }, []);

  return (
    <>
      {/* Animated Gradient Background */}
      <motion.div
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="fixed inset-0 -z-20 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 bg-[length:200%_200%]"
      />

      {/* Soft Center Glow */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.18)_0%,_transparent_60%)]" />

      {/* Floating Particles */}
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          initial={{ y: 0 }}
          animate={{
            y: -1200,
            x: [0, 30, -30, 0], // horizontal drift
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "linear",
          }}
          className="fixed bottom-0 rounded-full pointer-events-none"
          style={{
            left: `${particle.left}%`,
            width: particle.size,
            height: particle.size,
            background: "rgba(56,189,248,0.8)",
            boxShadow: "0 0 15px rgba(56,189,248,0.9)",
            zIndex: -5,
          }}
        />
      ))}
    </>
  );
}
