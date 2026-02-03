import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Environment,
  MeshDistortMaterial,
  Sphere,
  Box,
  useTexture,
  Float,
  Text3D,
  Center,
} from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { Layers, Zap, Code } from 'lucide-react';

// Floating particles around the scene
function FloatingParticles({ count = 1000 }) {
  const particles = useRef();
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Random position in a sphere
      const radius = 20 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
      
      // Colors - cyan/blue gradient
      const t = Math.random();
      colors[i3] = t * 0.0 + (1 - t) * 0.0;      // R
      colors[i3 + 1] = t * 1.0 + (1 - t) * 0.6;  // G
      colors[i3 + 2] = t * 1.0 + (1 - t) * 1.0;  // B
    }
    
    return { positions, colors };
  }, [count]);

  useFrame((state) => {
    if (!particles.current) return;
    
    const time = state.clock.getElapsedTime();
    const positions = particles.current.array;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Gentle floating motion
      positions[i3 + 1] += Math.sin(time + i * 0.1) * 0.002;
      
      // Slow rotation
      const angle = time * 0.05;
      const x = positions[i3];
      const z = positions[i3 + 2];
      positions[i3] = x * Math.cos(angle) - z * Math.sin(angle);
      positions[i3 + 2] = x * Math.sin(angle) + z * Math.cos(angle);
    }
    
    particles.current.needsUpdate = true;
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          ref={particles}
          attach="attributes-position"
          count={count}
          array={particlePositions.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={particlePositions.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Central morphing sphere
function MorphingSphere({ position = [0, 0, 0] }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = time * 0.2;
    meshRef.current.rotation.y = time * 0.3;
    
    // Pulse effect
    const scale = 1 + Math.sin(time * 2) * 0.05;
    meshRef.current.scale.set(scale, scale, scale);
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere
        ref={meshRef}
        args={[2, 64, 64]}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <MeshDistortMaterial
          color={hovered ? '#00ffc6' : '#0099ff'}
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.1}
          metalness={0.9}
          emissive={hovered ? '#00ffc6' : '#0066ff'}
          emissiveIntensity={hovered ? 0.5 : 0.2}
        />
      </Sphere>
    </Float>
  );
}

// Orbiting cubes representing tech stack
function OrbitingCubes() {
  const groupRef = useRef();
  
  const technologies = [
    { name: 'Node.js', color: '#68A063', position: 5 },
    { name: 'React', color: '#61DAFB', position: 6 },
    { name: 'AWS', color: '#FF9900', position: 7 },
    { name: 'DB', color: '#336791', position: 8 },
  ];

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
  });

  return (
    <group ref={groupRef}>
      {technologies.map((tech, index) => {
        const angle = (index / technologies.length) * Math.PI * 2;
        const x = Math.cos(angle) * tech.position;
        const z = Math.sin(angle) * tech.position;

        return (
          <Float key={tech.name} speed={2 + index * 0.5} floatIntensity={0.5}>
            <Box position={[x, 0, z]} args={[0.8, 0.8, 0.8]}>
              <meshStandardMaterial
                color={tech.color}
                metalness={0.8}
                roughness={0.2}
                emissive={tech.color}
                emissiveIntensity={0.3}
              />
            </Box>
          </Float>
        );
      })}
    </group>
  );
}

// Wireframe background sphere
function WireframeSphere() {
  const meshRef = useRef();

  useFrame((state) => {
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.05;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.08;
  });

  return (
    <lineSegments ref={meshRef}>
      <sphereGeometry args={[15, 32, 32]} />
      <lineBasicMaterial color="#00ffc6" opacity={0.1} transparent />
    </lineSegments>
  );
}

// DNA Helix structure
function DNAHelix() {
  const groupRef = useRef();
  const spheres = useMemo(() => {
    const arr = [];
    const height = 8;
    const radius = 3;
    const count = 30;
    
    for (let i = 0; i < count; i++) {
      const t = i / count;
      const angle1 = t * Math.PI * 4;
      const angle2 = angle1 + Math.PI;
      
      const y = (t - 0.5) * height;
      
      arr.push({
        position1: [Math.cos(angle1) * radius, y, Math.sin(angle1) * radius],
        position2: [Math.cos(angle2) * radius, y, Math.sin(angle2) * radius],
        key: i,
      });
    }
    
    return arr;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
  });

  return (
    <group ref={groupRef} position={[10, 0, -5]}>
      {spheres.map((sphere) => (
        <group key={sphere.key}>
          <Sphere args={[0.15, 16, 16]} position={sphere.position1}>
            <meshStandardMaterial color="#00ffc6" emissive="#00ffc6" emissiveIntensity={0.5} />
          </Sphere>
          <Sphere args={[0.15, 16, 16]} position={sphere.position2}>
            <meshStandardMaterial color="#0099ff" emissive="#0099ff" emissiveIntensity={0.5} />
          </Sphere>
          <line>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([...sphere.position1, ...sphere.position2])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#ffffff" opacity={0.2} transparent />
          </line>
        </group>
      ))}
    </group>
  );
}

// Rings system
function RingSystem() {
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
    groupRef.current.rotation.z = state.clock.getElapsedTime() * 0.15;
  });

  return (
    <group ref={groupRef} position={[-8, 0, 5]}>
      {[3, 4, 5].map((radius, index) => (
        <mesh key={index} rotation={[Math.PI / 2, 0, index * 0.5]}>
          <torusGeometry args={[radius, 0.08, 16, 64]} />
          <meshStandardMaterial
            color="#00ffc6"
            emissive="#00ffc6"
            emissiveIntensity={0.3}
            transparent
            opacity={0.6 - index * 0.15}
          />
        </mesh>
      ))}
    </group>
  );
}

// Interactive camera controller
function CameraController({ preset }) {
  const { camera } = useThree();
  
  useFrame(() => {
    if (preset === 'overview') {
      camera.position.lerp(new THREE.Vector3(0, 5, 15), 0.05);
    } else if (preset === 'close') {
      camera.position.lerp(new THREE.Vector3(0, 2, 8), 0.05);
    } else if (preset === 'orbit') {
      const time = Date.now() * 0.0005;
      camera.position.x = Math.sin(time) * 15;
      camera.position.z = Math.cos(time) * 15;
      camera.position.y = 5;
    }
    camera.lookAt(0, 0, 0);
  });
  
  return null;
}

// Main scene
function Scene({ preset, showParticles, showHelpers }) {
  return (
    <>
      {/* Camera */}
      <PerspectiveCamera makeDefault position={[0, 5, 15]} fov={75} />
      <CameraController preset={preset} />

      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00ffc6" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0099ff" />
      <spotLight
        position={[0, 20, 0]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        color="#ffffff"
        castShadow
      />

      {/* Main elements */}
      <MorphingSphere />
      <OrbitingCubes />
      <WireframeSphere />
      <DNAHelix />
      <RingSystem />
      
      {showParticles && <FloatingParticles count={1000} />}

      {/* Environment */}
      <Environment preset="night" />

      {/* Controls */}
      {preset === 'free' && (
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          minDistance={5}
          maxDistance={30}
        />
      )}

      {/* Helper grid */}
      {showHelpers && <gridHelper args={[40, 40, '#00ffc6', '#ffffff']} />}
    </>
  );
}

// Main component
export default function Interactive3DScene({ className = '' }) {
  const [preset, setPreset] = useState('overview');
  const [showParticles, setShowParticles] = useState(true);
  const [showHelpers, setShowHelpers] = useState(false);

  const presets = [
    { id: 'overview', label: 'Overview', icon: Layers },
    { id: 'close', label: 'Close Up', icon: Zap },
    { id: 'orbit', label: 'Auto Orbit', icon: Code },
    { id: 'free', label: 'Free Explore', icon: Code },
  ];

  return (
    <div className={`relative ${className}`}>
      {/* 3D Canvas */}
      <div className="w-full h-[600px] rounded-2xl overflow-hidden border-2 border-primary/30 bg-black">
        <Canvas shadows>
          <Scene 
            preset={preset} 
            showParticles={showParticles}
            showHelpers={showHelpers}
          />
        </Canvas>
      </div>

      {/* Controls overlay */}
      <div className="absolute top-4 left-4 right-4 flex flex-wrap gap-3 pointer-events-none">
        <div className="pointer-events-auto flex gap-2 bg-black/60 backdrop-blur-xl rounded-xl p-2 border border-white/10">
          {presets.map((p) => (
            <motion.button
              key={p.id}
              onClick={() => setPreset(p.id)}
              className={`
                px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2
                ${preset === p.id
                  ? 'bg-primary text-black'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <p.icon size={16} />
              <span className="text-sm">{p.label}</span>
            </motion.button>
          ))}
        </div>

        <div className="pointer-events-auto flex gap-2 bg-black/60 backdrop-blur-xl rounded-xl p-2 border border-white/10">
          <motion.button
            onClick={() => setShowParticles(!showParticles)}
            className={`
              px-4 py-2 rounded-lg font-medium transition-all text-sm
              ${showParticles
                ? 'bg-primary text-black'
                : 'bg-white/5 text-white/60 hover:bg-white/10'
              }
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Particles
          </motion.button>

          <motion.button
            onClick={() => setShowHelpers(!showHelpers)}
            className={`
              px-4 py-2 rounded-lg font-medium transition-all text-sm
              ${showHelpers
                ? 'bg-primary text-black'
                : 'bg-white/5 text-white/60 hover:bg-white/10'
              }
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Grid
          </motion.button>
        </div>
      </div>

      {/* Info overlay */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-black/60 backdrop-blur-xl rounded-xl p-4 border border-white/10">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-white font-bold mb-1">Interactive 3D Tech Visualization</h3>
              <p className="text-white/60 text-sm">
                {preset === 'free' 
                  ? 'Click and drag to explore • Scroll to zoom'
                  : 'Select different camera presets to explore the scene'
                }
              </p>
            </div>
            <div className="flex gap-4 text-xs text-white/40">
              <div>
                <span className="block text-primary">Central Sphere</span>
                <span>Core Skills</span>
              </div>
              <div>
                <span className="block text-blue-400">Orbiting Cubes</span>
                <span>Tech Stack</span>
              </div>
              <div>
                <span className="block text-cyan-400">DNA Helix</span>
                <span>Code Flow</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
