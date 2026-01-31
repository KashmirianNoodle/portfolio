import { motion } from "framer-motion";

export default function ArchitectureFlow() {
  return (
    <div className="absolute inset-0 -z-10 opacity-20">
      <svg
        viewBox="0 0 800 600"
        className="w-full h-full"
        fill="none"
        stroke="currentColor"
      >
        <motion.path
          d="M50 300 H250 L350 200 H550 L650 300"
          strokeWidth="2"
          className="text-primary"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </svg>
    </div>
  );
}
