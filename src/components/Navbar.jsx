import { Link } from "react-router-dom";
import Achievements from './../pages/Achievements';

export default function Navbar() {
  return (
    <nav className="bg-card border-b border-slate-700">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
        <h1 className="text-primary font-bold text-lg tracking-wide">
          Mir Shafeeq
        </h1>

        <div className="space-x-6 text-sm text-gray-300">
          <Link to="/" className="hover:text-primary transition">Home</Link>
          <Link to="/experience" className="hover:text-primary transition">Experience</Link>
          <Link to="/projects" className="hover:text-primary transition">Projects</Link>
          <Link to="/system-design" className="hover:text-primary transition">System</Link>
          <Link to="/achievements" className="hover:text-primary transition"> Achievements</Link>
          <Link to="/skills" className="hover:text-primary transition">Skills</Link>
          <Link to="/contact" className="hover:text-primary transition">Contact</Link>
        </div>
      </div>
    </nav>
  );
}
