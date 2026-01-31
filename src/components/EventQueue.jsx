import { motion } from "framer-motion";

export default function EventQueue() {
  return (
    <div className="flex items-center gap-6">

      <div className="text-xs uppercase tracking-widest text-primary/60">
        Event Queue
      </div>

      <div className="w-2 bg-primary/30 h-40 rounded-full relative overflow-hidden">

        {/* Animated message */}
        <motion.div
          className="w-4 h-4 bg-primary rounded-full absolute -left-1"
          animate={{ y: [0, 150] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />

      </div>

      <div className="text-xs text-white/50">
        Processing...
      </div>

    </div>
  );
}
