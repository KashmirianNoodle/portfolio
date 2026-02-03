import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// Animated 3D Sphere with distortion effect
function AnimatedSphere() {
  const meshRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Rotate the sphere
    meshRef.current.rotation.x = time * 0.2;
    meshRef.current.rotation.y = time * 0.3;
    
    // Slight floating animation
    meshRef.current.position.y = Math.sin(time * 0.5) * 0.2;
  });

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]} scale={2}>
      <MeshDistortMaterial
        color="#00ffc6"
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
}

// Animated Torus Knot
function AnimatedTorusKnot() {
  const meshRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = time * 0.3;
    meshRef.current.rotation.y = time * 0.4;
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1, 0.3, 128, 16]} />
      <meshStandardMaterial
        color="#00ffc6"
        roughness={0.1}
        metalness={0.9}
        emissive="#00ffc6"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

// Animated Cube with wireframe
function AnimatedCube() {
  const meshRef = useRef();
  const wireframeRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Rotate both mesh and wireframe
    meshRef.current.rotation.x = time * 0.4;
    meshRef.current.rotation.y = time * 0.6;
    wireframeRef.current.rotation.x = time * 0.4;
    wireframeRef.current.rotation.y = time * 0.6;
    
    // Pulse scale
    const scale = 1 + Math.sin(time * 2) * 0.1;
    meshRef.current.scale.set(scale, scale, scale);
    wireframeRef.current.scale.set(scale, scale, scale);
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial
          color="#00ffc6"
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.6}
        />
      </mesh>
      <lineSegments ref={wireframeRef}>
        <edgesGeometry args={[new THREE.BoxGeometry(1.5, 1.5, 1.5)]} />
        <lineBasicMaterial color="#00ffc6" linewidth={2} />
      </lineSegments>
    </group>
  );
}

// Main component
export default function Rotating3DObject({ type = 'sphere', className = '' }) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00ffc6" />
        <spotLight
          position={[0, 5, 0]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          color="#00ffc6"
        />
        
        {/* Render selected 3D object */}
        {type === 'sphere' && <AnimatedSphere />}
        {type === 'torus' && <AnimatedTorusKnot />}
        {type === 'cube' && <AnimatedCube />}
        
        {/* Optional orbit controls for user interaction */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
}
