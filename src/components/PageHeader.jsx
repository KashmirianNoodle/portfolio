import { motion } from "framer-motion";

export default function PageHeader({
  title,
  subtitle,
  center = false
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`space-y-3 ${center ? "text-center" : ""}`}
    >
      {/* Title */}
        <h2 className="
        text-3xl
        font-bold
        text-primary
        text-left
        md:text-center
        ">
        {title}
        </h2>


      {/* Subtitle */}
      {subtitle && (
        <p className="
            text-white/65
            max-w-2xl
            text-left
            md:text-center
            md:mx-auto
            ">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
