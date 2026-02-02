import { motion } from "framer-motion";

export default function ArchitectureFlow() {
  return (
    <div className="absolute inset-0 -z-10 opacity-40 pointer-events-none">
      <svg
        viewBox="0 0 800 600"
        className="w-full h-full"
        fill="none"
      >
        <motion.path
          d="M50 300 H250 L350 200 H550 L650 300"
          stroke="#00b7ff"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </svg>
    </div>
  );
}
