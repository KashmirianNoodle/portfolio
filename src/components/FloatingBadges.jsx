import { motion } from "framer-motion";

const tech = [
  "Node.js",
  "TypeScript",
  "AWS",
  "DynamoDB",
  "PostgreSQL",
  "Redis",
  "SQS",
  "Cognito",
  "WebSockets"
];

export default function FloatingBadges() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {tech.map((item, i) => (
        <motion.div
          key={item}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 0.15,
            y: [0, -20, 0],
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            delay: i * 0.4,
          }}
          className="absolute text-xs md:text-sm border border-primary/30 text-primary px-3 py-1 rounded-full backdrop-blur-md"
          style={{
            top: `${10 + i * 8}%`,
            left: `${5 + i * 9}%`,
          }}
        >
          {item}
        </motion.div>
      ))}
    </div>
  );
}
