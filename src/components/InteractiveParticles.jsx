import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function ParticleField({ count = 2000, mousePosition }) {
  const particlesRef = useRef();
  const velocitiesRef = useRef([]);
  
  // Generate particle positions and velocities
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = [];
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Random positions in a sphere
      const radius = 15;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
      
      // Store velocity for each particle
      velocities.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02,
      });
    }
    
    velocitiesRef.current = velocities;
    return positions;
  }, [count]);

  useFrame((state) => {
    if (!particlesRef.current) return;
    
    const positions = particlesRef.current.array;
    const time = state.clock.getElapsedTime();
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Get current velocity
      const velocity = velocitiesRef.current[i];
      
      // Apply mouse attraction
      const mouseInfluence = 2;
      const dx = mousePosition.x * 10 - positions[i3];
      const dy = mousePosition.y * 10 - positions[i3 + 1];
      
      const distance = Math.sqrt(dx * dx + dy * dy);
      const force = Math.min(1 / (distance + 1), 0.1);
      
      velocity.x += dx * force * mouseInfluence * 0.01;
      velocity.y += dy * force * mouseInfluence * 0.01;
      
      // Apply damping
      velocity.x *= 0.98;
      velocity.y *= 0.98;
      velocity.z *= 0.98;
      
      // Update positions with velocity
      positions[i3] += velocity.x;
      positions[i3 + 1] += velocity.y;
      positions[i3 + 2] += velocity.z;
      
      // Add wave motion
      positions[i3 + 1] += Math.sin(time + i * 0.1) * 0.005;
      
      // Keep particles in bounds
      const maxDist = 15;
      const dist = Math.sqrt(
        positions[i3] ** 2 +
        positions[i3 + 1] ** 2 +
        positions[i3 + 2] ** 2
      );
      
      if (dist > maxDist) {
        positions[i3] *= 0.99;
        positions[i3 + 1] *= 0.99;
        positions[i3 + 2] *= 0.99;
      }
    }
    
    particlesRef.current.needsUpdate = true;
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          ref={particlesRef}
          attach="attributes-position"
          count={count}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#00ffc6"
        sizeAttenuation={true}
        transparent={true}
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Connection lines between nearby particles
function ParticleConnections({ count = 2000, mousePosition }) {
  const linesRef = useRef();
  const particlePositionsRef = useRef([]);
  
  // Initialize particle positions
  useMemo(() => {
    particlePositionsRef.current = [];
    for (let i = 0; i < count; i++) {
      const radius = 15;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      
      particlePositionsRef.current.push({
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.sin(phi) * Math.sin(theta),
        z: radius * Math.cos(phi),
        vx: (Math.random() - 0.5) * 0.02,
        vy: (Math.random() - 0.5) * 0.02,
        vz: (Math.random() - 0.5) * 0.02,
      });
    }
  }, [count]);
  
  useFrame(() => {
    if (!linesRef.current) return;
    
    const positions = [];
    const maxDistance = 2;
    const particles = particlePositionsRef.current;
    
    // Update particle positions
    particles.forEach((particle, i) => {
      // Mouse influence
      const dx = mousePosition.x * 10 - particle.x;
      const dy = mousePosition.y * 10 - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const force = Math.min(1 / (distance + 1), 0.1);
      
      particle.vx += dx * force * 0.02;
      particle.vy += dy * force * 0.02;
      
      particle.vx *= 0.98;
      particle.vy *= 0.98;
      particle.vz *= 0.98;
      
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.z += particle.vz;
      
      // Bounds checking
      const dist = Math.sqrt(particle.x ** 2 + particle.y ** 2 + particle.z ** 2);
      if (dist > 15) {
        particle.x *= 0.99;
        particle.y *= 0.99;
        particle.z *= 0.99;
      }
    });
    
    // Create connections between nearby particles
    for (let i = 0; i < Math.min(count, 100); i++) {
      const p1 = particles[i];
      
      for (let j = i + 1; j < Math.min(count, 100); j++) {
        const p2 = particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dz = p1.z - p2.z;
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
        
        if (distance < maxDistance) {
          positions.push(p1.x, p1.y, p1.z);
          positions.push(p2.x, p2.y, p2.z);
        }
      }
    }
    
    linesRef.current.geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(positions, 3)
    );
  });
  
  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry />
      <lineBasicMaterial
        color="#00ffc6"
        transparent={true}
        opacity={0.2}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}

export default function InteractiveParticles({ 
  particleCount = 2000, 
  showConnections = true,
  className = '' 
}) {
  const mousePosition = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (event) => {
      mousePosition.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      };
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 20], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} color="#00ffc6" intensity={0.5} />
        
        <ParticleField count={particleCount} mousePosition={mousePosition.current} />
        {showConnections && (
          <ParticleConnections count={Math.min(particleCount, 200)} mousePosition={mousePosition.current} />
        )}
      </Canvas>
    </div>
  );
}
