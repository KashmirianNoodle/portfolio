import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Counter({ value = 0, label }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const increment = value / (duration / 16);

    const counter = setInterval(() => {
      start += increment;

      if (start >= value) {
        setCount(value);
        clearInterval(counter);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(counter);
  }, [value]);

  return (
    <div className="text-center space-y-2">
      <motion.h3
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        className="text-3xl font-bold text-primary"
      >
        {count}
      </motion.h3>

      <p className="text-xs text-white/60 uppercase tracking-wider">
        {label}
      </p>
    </div>
  );
}
