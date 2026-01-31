import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./Navbar";
import AnimatedBackground from "./AnimatedBackground";
import WebGLBackground from "./WebGLBackground";

export default function Layout() {
  const location = useLocation();

  return (
    <div className="relative min-h-screen overflow-hidden">
      <WebGLBackground />
      <AnimatedBackground />
      <Navbar />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <AnimatePresence mode="sync">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
