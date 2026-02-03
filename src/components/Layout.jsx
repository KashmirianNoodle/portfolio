import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./Navbar";
import AnimatedBackground from "./AnimatedBackground";
import WebGLBackground from "./WebGLBackground";
import ArchitectureFlow from "./ArchitectureFlow"
import MatrixRain from './MatrixRain';

export default function Layout() {
  const location = useLocation();

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">

      <WebGLBackground />
      <AnimatedBackground />
    <div className="absolute inset-0 z-20 pointer-events-none">
        {/* <ArchitectureFlow /> */}
      {/* <MatrixRain /> */}
      </div>

      {/* Interactive Particle Background */}
      {/* <div className="fixed inset-0 pointer-events-none opacity-30 z-0">
        <InteractiveParticles particleCount={1500} showConnections={true} />
      </div> */}

      <Navbar />
      {/* Ambient Glow */}
      <div className="absolute -top-60 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/20 blur-[160px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-16">
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

