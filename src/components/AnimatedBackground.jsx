import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <>
      <motion.div
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="fixed inset-0 -z-20 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-[length:200%_200%]"
      />

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.12)_0%,_transparent_60%)]" />

      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: 0, opacity: 0.3 }}
          animate={{ y: -1000, opacity: 0 }}
          transition={{
            duration: 15 + i * 2,
            repeat: Infinity,
            ease: "linear",
          }}
          className="fixed bottom-0 w-2 h-2 bg-primary rounded-full blur-sm -z-10"
          style={{
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </>
  );
}
