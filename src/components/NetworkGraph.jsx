import { motion } from "framer-motion";

export default function NetworkGraph() {
  return (
    <div className="absolute inset-0 -z-10 opacity-30">
      <svg viewBox="0 0 800 600" className="w-full h-full">

        {/* Lines */}
        <line x1="150" y1="200" x2="400" y2="300" stroke="#00FFC6" strokeWidth="1" />
        <line x1="400" y1="300" x2="650" y2="200" stroke="#00FFC6" strokeWidth="1" />

        {/* Animated Data Packet */}
        <motion.circle
          r="4"
          fill="#00FFC6"
          initial={{ cx: 150, cy: 200 }}
          animate={{ cx: 650, cy: 200 }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </svg>
    </div>
  );
}
