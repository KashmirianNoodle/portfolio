import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Experience from "./pages/Experience";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Contact from "./pages/Contact";
import SystemDesign from "./pages/SystemDesign";
import Achievements from "./pages/Achievements";
// import PremiumFeaturesDemo from './pages/PremiumFeaturesDemo';
// import AnalyticsDashboard from "./pages/AnalyticsDashboard";

export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/system-design" element={<SystemDesign />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/example" element={<AnalyticsDashboard/>} /> */}
        </Route>
      </Routes>
    </AnimatePresence>
  );
}
