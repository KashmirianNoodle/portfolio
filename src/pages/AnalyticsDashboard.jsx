import { motion } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';
import PageHeader from '../components/PageHeader';
import RealtimeVisitorCounter from '../components/RealtimeVisitorCounter';
import AnimatedSkillCharts from '../components/AnimatedSkillCharts';
import InteractiveCareerTimeline from '../components/InteractiveCareerTimeline';

export default function AnalyticsDashboard() {
  return (
    <PageWrapper>
      <PageHeader
        title="Analytics Dashboard"
        subtitle="Real-time metrics, skill progression, and career journey visualization"
      />

      <div className="space-y-20">
        
        {/* ================= REALTIME VISITOR COUNTER ================= */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-primary">
              Real-Time Visitor Analytics
            </h2>
            <p className="text-white/70 max-w-3xl">
              Live WebSocket-powered dashboard tracking visitor activity, page views, 
              and global reach in real-time. Watch the numbers update as visitors interact 
              with your portfolio.
            </p>
          </div>
          
          <RealtimeVisitorCounter />
          
          <div className="p-6 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <h3 className="text-lg font-semibold text-blue-300 mb-3">✨ Key Features</h3>
            <ul className="space-y-2 text-sm text-blue-200">
              <li>• Real-time WebSocket connection with live updates</li>
              <li>• Animated number counters with smooth transitions</li>
              <li>• Activity feed showing visitor actions by country</li>
              <li>• Connection status indicator with pulse animation</li>
              <li>• Beautiful gradient cards with glassmorphism</li>
              <li>• Fully responsive design with mobile support</li>
            </ul>
          </div>
        </motion.section>

        {/* ================= SKILL PROGRESSION CHARTS ================= */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-primary">
              Skill Progression Over Time
            </h2>
            <p className="text-white/70 max-w-3xl">
              Interactive charts visualizing technical skill development from 2022 to present. 
              Track growth across backend, databases, cloud, and architecture domains with 
              multiple visualization modes.
            </p>
          </div>
          
          <AnimatedSkillCharts />
          
          <div className="p-6 rounded-xl bg-purple-500/10 border border-purple-500/20">
            <h3 className="text-lg font-semibold text-purple-300 mb-3">✨ Key Features</h3>
            <ul className="space-y-2 text-sm text-purple-200">
              <li>• Animated line charts with color-coded skill paths</li>
              <li>• Radial progress indicators for current proficiency</li>
              <li>• Interactive legend with hover effects</li>
              <li>• Multiple categories: Backend, Databases, Cloud, Architecture</li>
              <li>• Timeline view and current level toggle</li>
              <li>• Scroll-triggered animations with Framer Motion</li>
              <li>• Growth statistics and summary metrics</li>
            </ul>
          </div>
        </motion.section>

        {/* ================= CAREER TIMELINE ================= */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-primary">
              Interactive Career Timeline
            </h2>
            <p className="text-white/70 max-w-3xl">
              Beautiful vertical timeline showcasing professional journey with expandable 
              cards, achievements, impact metrics, and skill tags. Includes career growth 
              trajectory visualization.
            </p>
          </div>
          
          <InteractiveCareerTimeline />
          
          <div className="p-6 rounded-xl bg-green-500/10 border border-green-500/20">
            <h3 className="text-lg font-semibold text-green-300 mb-3">✨ Key Features</h3>
            <ul className="space-y-2 text-sm text-green-200">
              <li>• Alternating layout with left/right positioned cards</li>
              <li>• Expandable content revealing detailed achievements</li>
              <li>• Color-coded timeline nodes with pulsing animations</li>
              <li>• Impact metrics showcasing quantifiable results</li>
              <li>• Technology tags for each position</li>
              <li>• Career growth trajectory chart</li>
              <li>• Journey statistics overview</li>
              <li>• Hover effects and smooth transitions</li>
            </ul>
          </div>
        </motion.section>

        {/* ================= IMPLEMENTATION GUIDE ================= */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold text-white">Implementation Guide</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Quick Start */}
            <div className="p-6 rounded-xl bg-black/40 backdrop-blur-xl border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">1️⃣ Import Components</h3>
              <pre className="p-4 rounded-lg bg-black/60 overflow-x-auto">
                <code className="text-sm text-primary">
{`import RealtimeVisitorCounter from './components/RealtimeVisitorCounter';
import AnimatedSkillCharts from './components/AnimatedSkillCharts';
import InteractiveCareerTimeline from './components/InteractiveCareerTimeline';`}
                </code>
              </pre>
            </div>

            {/* Usage Examples */}
            <div className="p-6 rounded-xl bg-black/40 backdrop-blur-xl border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">2️⃣ Add to Your Pages</h3>
              <pre className="p-4 rounded-lg bg-black/60 overflow-x-auto">
                <code className="text-sm text-primary">
{`// Analytics page
<RealtimeVisitorCounter />

// Skills page
<AnimatedSkillCharts />

// Experience page
<InteractiveCareerTimeline />`}
                </code>
              </pre>
            </div>

            {/* WebSocket Setup */}
            <div className="p-6 rounded-xl bg-black/40 backdrop-blur-xl border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">3️⃣ Connect Real WebSocket</h3>
              <pre className="p-4 rounded-lg bg-black/60 overflow-x-auto">
                <code className="text-sm text-primary">
{`// Replace simulated WebSocket
const ws = new WebSocket('wss://your-server.com');

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  updateStats(data);
};`}
                </code>
              </pre>
            </div>

            {/* Customization */}
            <div className="p-6 rounded-xl bg-black/40 backdrop-blur-xl border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">4️⃣ Customize Data</h3>
              <pre className="p-4 rounded-lg bg-black/60 overflow-x-auto">
                <code className="text-sm text-primary">
{`// Update skill data in AnimatedSkillCharts.jsx
const skillProgressionData = {
  backend: [
    { skill: 'Your Skill', levels: [...] }
  ]
};`}
                </code>
              </pre>
            </div>
          </div>
        </motion.section>

        {/* ================= FEATURES COMPARISON ================= */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-white mb-6">Feature Comparison</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="p-4 text-white/60">Feature</th>
                  <th className="p-4 text-white/60">Visitor Counter</th>
                  <th className="p-4 text-white/60">Skill Charts</th>
                  <th className="p-4 text-white/60">Career Timeline</th>
                </tr>
              </thead>
              <tbody className="text-sm text-white/80">
                <tr className="border-b border-white/10">
                  <td className="p-4 font-semibold">Real-time Updates</td>
                  <td className="p-4">✅ WebSocket</td>
                  <td className="p-4">❌ Static</td>
                  <td className="p-4">❌ Static</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-4 font-semibold">Animations</td>
                  <td className="p-4">✅ Number counters</td>
                  <td className="p-4">✅ Line drawing</td>
                  <td className="p-4">✅ Scroll-triggered</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-4 font-semibold">Interactivity</td>
                  <td className="p-4">🟡 Auto-updates</td>
                  <td className="p-4">✅ Hover + Toggle</td>
                  <td className="p-4">✅ Expandable</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-4 font-semibold">Data Source</td>
                  <td className="p-4">Backend/Analytics</td>
                  <td className="p-4">JSON Config</td>
                  <td className="p-4">JSON Config</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-4 font-semibold">Best Used For</td>
                  <td className="p-4">Analytics page</td>
                  <td className="p-4">Skills page</td>
                  <td className="p-4">Experience page</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* ================= PERFORMANCE NOTES ================= */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="p-8 rounded-2xl bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-xl border border-yellow-500/30"
        >
          <h2 className="text-2xl font-bold text-white mb-4">⚡ Performance Tips</h2>
          
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h3 className="font-semibold text-yellow-300 mb-3">Optimizations</h3>
              <ul className="space-y-2 text-white/80">
                <li>• Use React.memo() for chart components</li>
                <li>• Debounce WebSocket message handling</li>
                <li>• Limit activity feed to 5-10 items</li>
                <li>• Use CSS transforms for animations</li>
                <li>• Lazy load timeline items</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-yellow-300 mb-3">Best Practices</h3>
              <ul className="space-y-2 text-white/80">
                <li>• Close WebSocket on component unmount</li>
                <li>• Use IntersectionObserver for scroll animations</li>
                <li>• Compress JSON data for skill progression</li>
                <li>• Add loading states for better UX</li>
                <li>• Test on mobile devices</li>
              </ul>
            </div>
          </div>
        </motion.section>

      </div>
    </PageWrapper>
  );
}
