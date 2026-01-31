import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function Counter({ value, label }) {
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, {
    stiffness: 40,
    damping: 20,
  });

  useEffect(() => {
    motionValue.set(value);
  }, []);

  return (
    <div className="text-center">
      <motion.h2 className="text-4xl font-bold text-primary">
        {spring.get().toFixed(0)}
      </motion.h2>
      <p className="text-gray-400 mt-2">{label}</p>
    </div>
  );
}
