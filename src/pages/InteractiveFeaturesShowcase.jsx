import { useState } from 'react';
import { motion } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';
import PageHeader from '../components/PageHeader';
import CodePlayground from '../components/CodePlayground';
import ExperienceChatbot from '../components/ExperienceChatbot';
import Interactive3DScene from '../components/Interactive3DScene';
import { Code, MessageCircle, Sparkles } from 'lucide-react';

export default function InteractiveFeaturesShowcase() {
  const [activeChatbot, setActiveChatbot] = useState(false);

  return (
    <PageWrapper>
      <PageHeader
        title="Interactive Features"
        subtitle="Code playground, AI chatbot, and immersive 3D visualization"
      />

      <div className="space-y-20">

        {/* ================= CODE PLAYGROUND ================= */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-yellow-500/20 border border-yellow-500/30">
              <Code className="text-yellow-400" size={32} />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-white mb-2">
                Live Code Playground
              </h2>
              <p className="text-white/70 max-w-3xl">
                Interactive code editor with multi-language support. Write and execute 
                JavaScript, Python, or HTML/CSS in real-time. Perfect for demonstrating 
                coding skills and sharing snippets.
              </p>
            </div>
          </div>

          {/* Playground */}
          <CodePlayground />

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-6 rounded-xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20">
              <h3 className="font-bold text-yellow-300 mb-2">Multi-Language</h3>
              <p className="text-sm text-white/70">
                JavaScript (ES6+), Python 3.x, and HTML/CSS with live preview
              </p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20">
              <h3 className="font-bold text-yellow-300 mb-2">Live Execution</h3>
              <p className="text-sm text-white/70">
                Run code instantly with syntax highlighting and error handling
              </p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20">
              <h3 className="font-bold text-yellow-300 mb-2">Terminal Design</h3>
              <p className="text-sm text-white/70">
                Beautiful IDE-like interface with fullscreen mode
              </p>
            </div>
          </div>

          {/* Implementation */}
          <div className="p-6 rounded-xl bg-black/40 backdrop-blur-xl border border-white/10">
            <h3 className="text-lg font-bold text-white mb-4">✨ Key Features</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>• Real-time JavaScript execution in sandboxed environment</li>
              <li>• Python syntax support with simulated execution</li>
              <li>• Live HTML/CSS preview in iframe</li>
              <li>• Syntax-highlighted editor with line numbers</li>
              <li>• Copy, reset, and fullscreen functionality</li>
              <li>• Terminal-style output with error highlighting</li>
              <li>• Pre-loaded code examples for each language</li>
              <li>• Responsive design with mobile support</li>
            </ul>
          </div>
        </motion.section>

        {/* ================= AI CHATBOT ================= */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-blue-500/20 border border-blue-500/30">
              <MessageCircle className="text-blue-400" size={32} />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-white mb-2">
                AI Experience Assistant
              </h2>
              <p className="text-white/70 max-w-3xl">
                Intelligent chatbot trained on your professional background. Visitors can 
                ask questions about your experience, skills, projects, and achievements. 
                Provides instant, accurate responses in a beautiful chat interface.
              </p>
            </div>
          </div>

          {/* Chatbot Demo */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Embedded version */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Embedded Mode
              </h3>
              <ExperienceChatbot className="h-[600px]" />
            </div>

            {/* Info */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">
                  Floating Widget Mode
                </h3>
                <p className="text-white/70 mb-4">
                  The chatbot can also appear as a floating widget in the bottom-right 
                  corner of your site. Click the button below to try it:
                </p>
                <motion.button
                  onClick={() => setActiveChatbot(true)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-br from-primary to-blue-500 text-black font-semibold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Launch Floating Chatbot
                </motion.button>
              </div>

              {/* Features list */}
              <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
                <h4 className="font-bold text-blue-300 mb-3">Chatbot Features</h4>
                <ul className="space-y-2 text-sm text-white/80">
                  <li>• Trained on your complete professional background</li>
                  <li>• Pattern matching for intelligent responses</li>
                  <li>• Suggested questions for easy engagement</li>
                  <li>• Beautiful gradient chat bubbles</li>
                  <li>• Typing indicators and smooth animations</li>
                  <li>• Both embedded and floating widget modes</li>
                  <li>• Minimizable and closeable interface</li>
                  <li>• Mobile-responsive design</li>
                </ul>
              </div>

              {/* Example questions */}
              <div className="p-6 rounded-xl bg-black/40 border border-white/10">
                <h4 className="font-bold text-white mb-3">Example Questions</h4>
                <div className="space-y-2">
                  {[
                    "What's your experience with AWS?",
                    "Tell me about your recent projects",
                    "How did you improve API performance?",
                    "What databases have you worked with?",
                  ].map((q, i) => (
                    <div
                      key={i}
                      className="p-2 rounded-lg bg-white/5 text-sm text-white/70"
                    >
                      {q}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Customization guide */}
          <div className="p-6 rounded-xl bg-black/40 backdrop-blur-xl border border-white/10">
            <h3 className="text-lg font-bold text-white mb-4">🔧 Customization</h3>
            <div className="space-y-4 text-sm text-white/80">
              <div>
                <h4 className="font-semibold text-primary mb-2">Update Knowledge Base</h4>
                <p>Edit the <code className="px-2 py-1 rounded bg-black/60 text-primary">knowledgeBase</code> constant 
                in <code className="px-2 py-1 rounded bg-black/60">ExperienceChatbot.jsx</code> with your information.</p>
              </div>
              <div>
                <h4 className="font-semibold text-primary mb-2">Add Response Patterns</h4>
                <p>Customize responses in the <code className="px-2 py-1 rounded bg-black/60 text-primary">getChatbotResponse</code> function 
                to match your communication style.</p>
              </div>
              <div>
                <h4 className="font-semibold text-primary mb-2">Connect Real AI (Optional)</h4>
                <p>Replace the simulated responses with actual Claude API calls for advanced conversational AI.</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ================= 3D SCENE ================= */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-purple-500/20 border border-purple-500/30">
              <Sparkles className="text-purple-400" size={32} />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-white mb-2">
                Interactive 3D Visualization
              </h2>
              <p className="text-white/70 max-w-3xl">
                Stunning Three.js scene with morphing spheres, orbiting tech stack elements, 
                DNA helix structures, and particle systems. Multiple camera presets and 
                interactive controls for immersive exploration.
              </p>
            </div>
          </div>

          {/* 3D Scene */}
          <Interactive3DScene />

          {/* Scene elements guide */}
          <div className="grid md:grid-cols-4 gap-4">
            <div className="p-6 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
              <div className="text-3xl mb-3">🌐</div>
              <h3 className="font-bold text-cyan-300 mb-2">Central Sphere</h3>
              <p className="text-sm text-white/70">
                Morphing distortion sphere representing core technical expertise
              </p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20">
              <div className="text-3xl mb-3">📦</div>
              <h3 className="font-bold text-blue-300 mb-2">Tech Cubes</h3>
              <p className="text-sm text-white/70">
                Orbiting cubes for Node.js, React, AWS, and databases
              </p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
              <div className="text-3xl mb-3">🧬</div>
              <h3 className="font-bold text-purple-300 mb-2">DNA Helix</h3>
              <p className="text-sm text-white/70">
                Double helix structure symbolizing code architecture
              </p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-pink-500/10 to-red-500/10 border border-pink-500/20">
              <div className="text-3xl mb-3">⭕</div>
              <h3 className="font-bold text-pink-300 mb-2">Ring System</h3>
              <p className="text-sm text-white/70">
                Rotating torus rings representing continuous integration
              </p>
            </div>
          </div>

          {/* Technical details */}
          <div className="p-6 rounded-xl bg-black/40 backdrop-blur-xl border border-white/10">
            <h3 className="text-lg font-bold text-white mb-4">✨ Scene Features</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <ul className="space-y-2 text-sm text-white/80">
                <li>• React Three Fiber for declarative 3D</li>
                <li>• Drei helpers for advanced effects</li>
                <li>• 1000+ animated particles</li>
                <li>• Multiple camera presets (Overview, Close-up, Auto-orbit, Free)</li>
                <li>• Morphing sphere with distortion material</li>
                <li>• Orbiting technology cubes</li>
                <li>• DNA helix structure</li>
                <li>• Wireframe background sphere</li>
              </ul>
              <ul className="space-y-2 text-sm text-white/80">
                <li>• Ring system with transparency</li>
                <li>• Float animations for natural movement</li>
                <li>• Emissive materials with glow effects</li>
                <li>• Interactive hover states</li>
                <li>• Night environment preset</li>
                <li>• Optional grid helper</li>
                <li>• OrbitControls for free exploration</li>
                <li>• Responsive canvas sizing</li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* ================= IMPLEMENTATION SUMMARY ================= */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold text-white">Quick Implementation</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Code Playground */}
            <div className="p-6 rounded-xl bg-black/40 border border-white/10">
              <h3 className="text-lg font-bold text-yellow-300 mb-4">Code Playground</h3>
              <pre className="text-xs text-white/60 bg-black/60 p-4 rounded-lg overflow-x-auto">
{`import CodePlayground from './components/CodePlayground';

<CodePlayground />`}
              </pre>
              <p className="text-sm text-white/60 mt-3">
                Add to projects page or skills section
              </p>
            </div>

            {/* Chatbot */}
            <div className="p-6 rounded-xl bg-black/40 border border-white/10">
              <h3 className="text-lg font-bold text-blue-300 mb-4">AI Chatbot</h3>
              <pre className="text-xs text-white/60 bg-black/60 p-4 rounded-lg overflow-x-auto">
{`import ExperienceChatbot from './components/ExperienceChatbot';

// Floating widget
<ExperienceChatbot minimal />

// Embedded
<ExperienceChatbot />`}
              </pre>
              <p className="text-sm text-white/60 mt-3">
                Add floating widget to Layout component
              </p>
            </div>

            {/* 3D Scene */}
            <div className="p-6 rounded-xl bg-black/40 border border-white/10">
              <h3 className="text-lg font-bold text-purple-300 mb-4">3D Scene</h3>
              <pre className="text-xs text-white/60 bg-black/60 p-4 rounded-lg overflow-x-auto">
{`import Interactive3DScene from './components/Interactive3DScene';

<Interactive3DScene />`}
              </pre>
              <p className="text-sm text-white/60 mt-3">
                Perfect for homepage hero or about section
              </p>
            </div>
          </div>
        </motion.section>

      </div>

      {/* Floating chatbot demo */}
      {activeChatbot && <ExperienceChatbot minimal />}
    </PageWrapper>
  );
}
