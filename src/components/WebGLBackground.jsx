import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";

function Network() {
  const groupRef = useRef();
  const pointsRef = useRef([]);
  const linesRef = useRef();

  const { mouse } = useThree();

  const NODE_COUNT = 40;
  const BOUNDS = 3;
  const MAX_DISTANCE = 1.2;

  const scrollBoost = useRef(0);

  // 🔥 Scroll Speed Burst
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const delta = Math.abs(window.scrollY - lastScrollY);
      scrollBoost.current = Math.min(delta * 0.002, 0.15);
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const nodes = useMemo(() => {
    return Array.from({ length: NODE_COUNT }).map(() => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * BOUNDS * 2,
        (Math.random() - 0.5) * BOUNDS * 2,
        (Math.random() - 0.5) * BOUNDS * 2
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01
      ),
    }));
  }, []);

  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(NODE_COUNT * NODE_COUNT * 3);
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3).setUsage(
        THREE.DynamicDrawUsage
      )
    );
    return geometry;
  }, []);

  useFrame((state) => {
    if (!groupRef.current || !linesRef.current) return;

    const positions = linesRef.current.geometry.attributes.position.array;
    let index = 0;

    // Smooth decay of scroll boost
    scrollBoost.current *= 0.9;

    // Move nodes
    nodes.forEach((node, i) => {
      node.position.add(
        node.velocity.clone().multiplyScalar(1 + scrollBoost.current * 10)
      );

      ["x", "y", "z"].forEach((axis) => {
        if (Math.abs(node.position[axis]) > BOUNDS) {
          node.velocity[axis] *= -1;
        }
      });

      pointsRef.current[i].position.copy(node.position);
    });

    // Recalculate connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i].position;
        const b = nodes[j].position;

        if (a.distanceTo(b) < MAX_DISTANCE) {
          positions[index++] = a.x;
          positions[index++] = a.y;
          positions[index++] = a.z;

          positions[index++] = b.x;
          positions[index++] = b.y;
          positions[index++] = b.z;
        }
      }
    }

    linesRef.current.geometry.setDrawRange(0, index / 3);
    linesRef.current.geometry.attributes.position.needsUpdate = true;

    // ✨ Mouse Parallax Tilt (Smooth Lerp)
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mouse.x * 0.5,
      0.05
    );

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -mouse.y * 0.5,
      0.05
    );

    // Optional subtle float
    groupRef.current.position.y =
      Math.sin(state.clock.elapsedTime * 0.6) * 0.15;
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <mesh
          key={i}
          ref={(el) => (pointsRef.current[i] = el)}
          position={node.position}
        >
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#38bdf8"
            emissiveIntensity={0.6}
          />
        </mesh>
      ))}

      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.15}
        />
      </lineSegments>
    </group>
  );
}

export default function WebGLBackground() {
  return (
    <div className="fixed inset-0 -z-40 opacity-40 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Network />
      </Canvas>
    </div>
  );
}
