import { useState } from 'react';
import { motion } from 'framer-motion';
import Rotating3DObject from '../components/Rotating3DObject';
import InteractiveParticles from '../components/InteractiveParticles';
import HolographicCard, { 
  HolographicMetricCard, 
  HolographicProjectCard,
  HolographicSkillCard 
} from '../components/HolographicCard';
import PageWrapper from '../components/PageWrapper';
import PageHeader from '../components/PageHeader';

export default function PremiumFeaturesDemo() {
  const [selected3DShape, setSelected3DShape] = useState('sphere');
  const [particleCount, setParticleCount] = useState(1500);
  const [showConnections, setShowConnections] = useState(true);

  return (
    <PageWrapper>
      <PageHeader
        title="Premium Features Demo"
        subtitle="Interactive showcase of advanced 3D, particle effects, and holographic UI"
      />

      <div className="space-y-20">
        
        {/* ================= FEATURE 1: 3D OBJECTS ================= */}
        <section className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h2 className="text-3xl font-bold text-primary">
              1. Rotating 3D Objects
            </h2>
            <p className="text-white/70 max-w-3xl">
              Interactive Three.js objects with smooth animations, lighting effects, 
              and orbit controls. Choose from different shapes to see them in action.
            </p>
          </motion.div>

          {/* Shape Selector */}
          <div className="flex gap-4 flex-wrap">
            {['sphere', 'torus', 'cube'].map((shape) => (
              <button
                key={shape}
                onClick={() => setSelected3DShape(shape)}
                className={`
                  px-6 py-3 rounded-xl font-semibold capitalize transition
                  ${selected3DShape === shape
                    ? 'bg-primary text-black'
                    : 'bg-white/10 text-white hover:bg-white/20'
                  }
                `}
              >
                {shape}
              </button>
            ))}
          </div>

          {/* 3D Display */}
          <div className="grid md:grid-cols-2 gap-8">
            <HolographicCard className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
              <div className="h-[400px]">
                <Rotating3DObject type={selected3DShape} />
              </div>
            </HolographicCard>

            <div className="space-y-4">
              <h3 className="text-xl font-bold">Features:</h3>
              <ul className="space-y-3 text-white/70">
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Smooth rotation and animation using React Three Fiber</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Dynamic lighting with multiple light sources</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Metallic and distortion material effects</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Orbit controls for user interaction</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Floating animation with sine wave motion</span>
                </li>
              </ul>

              <div className="mt-6 p-4 bg-black/40 rounded-lg border border-white/10">
                <h4 className="font-semibold mb-2">Usage:</h4>
                <code className="text-sm text-primary">
                  {'<Rotating3DObject type="sphere" />'}
                </code>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FEATURE 2: PARTICLE SYSTEM ================= */}
        <section className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h2 className="text-3xl font-bold text-primary">
              2. Interactive Particle System
            </h2>
            <p className="text-white/70 max-w-3xl">
              Dynamic particle field that reacts to mouse movement with physics-based 
              interactions. Particles attract towards cursor and maintain natural motion.
            </p>
          </motion.div>

          {/* Controls */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="text-white">Particle Count:</label>
              <input
                type="range"
                min="500"
                max="3000"
                step="500"
                value={particleCount}
                onChange={(e) => setParticleCount(Number(e.target.value))}
                className="flex-1 max-w-xs"
              />
              <span className="text-primary font-mono">{particleCount}</span>
            </div>

            <div className="flex items-center gap-4">
              <label className="text-white">Show Connections:</label>
              <button
                onClick={() => setShowConnections(!showConnections)}
                className={`
                  px-4 py-2 rounded-lg transition
                  ${showConnections 
                    ? 'bg-primary text-black' 
                    : 'bg-white/10 text-white'
                  }
                `}
              >
                {showConnections ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>

          {/* Particle Display */}
          <div className="grid md:grid-cols-2 gap-8">
            <HolographicCard className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
              <div className="h-[400px] relative">
                <InteractiveParticles 
                  particleCount={particleCount} 
                  showConnections={showConnections}
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <p className="text-white/50 text-center">
                    Move your mouse to interact<br />
                    <span className="text-sm">Particles will follow your cursor</span>
                  </p>
                </div>
              </div>
            </HolographicCard>

            <div className="space-y-4">
              <h3 className="text-xl font-bold">Features:</h3>
              <ul className="space-y-3 text-white/70">
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Mouse attraction with physics-based movement</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Velocity damping for natural motion</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Wave motion for organic feel</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Boundary constraints to keep particles in view</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Optional connection lines between nearby particles</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Additive blending for glowing effect</span>
                </li>
              </ul>

              <div className="mt-6 p-4 bg-black/40 rounded-lg border border-white/10">
                <h4 className="font-semibold mb-2">Usage:</h4>
                <code className="text-sm text-primary block">
                  {'<InteractiveParticles'}
                  <br />
                  {'  particleCount={1500}'}
                  <br />
                  {'  showConnections={true}'}
                  <br />
                  {' />'}
                </code>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FEATURE 3: HOLOGRAPHIC CARDS ================= */}
        <section className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <h2 className="text-3xl font-bold text-primary">
              3. Holographic Card Effects
            </h2>
            <p className="text-white/70 max-w-3xl">
              Interactive cards with tilt effects, holographic rainbow shimmer, 
              glare following mouse position, and smooth 3D transformations.
            </p>
          </motion.div>

          <div className="space-y-8">
            {/* Basic Card Example */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Basic Holographic Card</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <HolographicCard className="p-6 rounded-xl bg-black/40 backdrop-blur-xl border border-white/10">
                  <h4 className="text-lg font-bold mb-2">Hover Me!</h4>
                  <p className="text-white/70">
                    Move your mouse over this card to see the holographic effect in action.
                  </p>
                </HolographicCard>

                <HolographicCard className="p-6 rounded-xl bg-black/40 backdrop-blur-xl border border-white/10">
                  <h4 className="text-lg font-bold mb-2">Tilt Effect</h4>
                  <p className="text-white/70">
                    3D rotation follows your mouse position with smooth spring animations.
                  </p>
                </HolographicCard>

                <HolographicCard className="p-6 rounded-xl bg-black/40 backdrop-blur-xl border border-white/10">
                  <h4 className="text-lg font-bold mb-2">Rainbow Glare</h4>
                  <p className="text-white/70">
                    Dynamic gradient moves with cursor creating holographic appearance.
                  </p>
                </HolographicCard>
              </div>
            </div>

            {/* Metric Cards */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Metric Cards</h3>
              <div className="grid md:grid-cols-4 gap-4">
                <HolographicMetricCard
                  value="99.9%"
                  label="Uptime"
                  icon="🚀"
                />
                <HolographicMetricCard
                  value="45ms"
                  label="Avg Latency"
                  icon="⚡"
                />
                <HolographicMetricCard
                  value="2M+"
                  label="Requests/Day"
                  icon="📊"
                />
                <HolographicMetricCard
                  value="$800"
                  label="Cost Savings"
                  icon="💰"
                />
              </div>
            </div>

            {/* Project Cards */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Project Cards</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <HolographicProjectCard
                  title="Microservices Architecture"
                  description="Built scalable microservices handling millions of requests with event-driven patterns."
                  tech={["Node.js", "Docker", "Kubernetes", "RabbitMQ"]}
                />
                <HolographicProjectCard
                  title="Real-Time Analytics"
                  description="WebSocket-based analytics dashboard with sub-second data updates."
                  tech={["WebSocket", "Redis", "React", "D3.js"]}
                />
              </div>
            </div>

            {/* Skill Cards */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Skill Cards</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <HolographicSkillCard
                  title="Backend"
                  icon="⚙️"
                  skills={["Node.js", "Express", "NestJS", "GraphQL"]}
                />
                <HolographicSkillCard
                  title="Databases"
                  icon="💾"
                  skills={["PostgreSQL", "MongoDB", "Redis", "DynamoDB"]}
                />
                <HolographicSkillCard
                  title="Cloud"
                  icon="☁️"
                  skills={["AWS Lambda", "EC2", "S3", "CloudFront"]}
                />
              </div>
            </div>
          </div>

          {/* Features List */}
          <div className="mt-8 space-y-4">
            <h3 className="text-xl font-bold">Features:</h3>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span>3D tilt effect based on mouse position</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span>Holographic rainbow gradient following cursor</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span>Dynamic glare/shimmer effect</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span>Border glow that intensifies on hover</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span>Smooth spring animations with Framer Motion</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span>Preset variants for quick implementation</span>
              </li>
            </ul>
          </div>
        </section>

        {/* ================= IMPLEMENTATION GUIDE ================= */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-primary">Implementation Guide</h2>
          
          <HolographicCard className="p-6 rounded-xl bg-black/40 backdrop-blur-xl border border-white/10">
            <h3 className="text-xl font-bold mb-4">Quick Start</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-primary mb-2">1. Import Components</h4>
                <pre className="p-4 bg-black/60 rounded-lg overflow-x-auto">
                  <code className="text-sm text-white/80">
{`import Rotating3DObject from './components/Rotating3DObject';
import InteractiveParticles from './components/InteractiveParticles';
import HolographicCard from './components/HolographicCard';`}
                  </code>
                </pre>
              </div>

              <div>
                <h4 className="font-semibold text-primary mb-2">2. Use in Your Pages</h4>
                <pre className="p-4 bg-black/60 rounded-lg overflow-x-auto">
                  <code className="text-sm text-white/80">
{`// Add 3D background
<div className="h-96">
  <Rotating3DObject type="sphere" />
</div>

// Add particle system
<InteractiveParticles particleCount={1500} showConnections />

// Wrap content in holographic card
<HolographicCard className="p-6 rounded-xl">
  <h2>Your Content</h2>
</HolographicCard>`}
                  </code>
                </pre>
              </div>

              <div>
                <h4 className="font-semibold text-primary mb-2">3. Customize</h4>
                <pre className="p-4 bg-black/60 rounded-lg overflow-x-auto">
                  <code className="text-sm text-white/80">
{`// Adjust 3D object type
type="sphere" | "torus" | "cube"

// Control particle count
particleCount={500-3000}

// Adjust holographic intensity
intensity={0.5-2.0}`}
                  </code>
                </pre>
              </div>
            </div>
          </HolographicCard>
        </section>

      </div>
    </PageWrapper>
  );
}
