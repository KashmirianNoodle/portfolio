import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function Network() {
  const groupRef = useRef();

  const nodes = useMemo(() => {
    return Array.from({ length: 40 }).map(() => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01
      ),
    }));
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;

    // Move nodes
    nodes.forEach((node, index) => {
      node.position.add(node.velocity);

      // Bounce inside bounds
      if (Math.abs(node.position.x) > 3) node.velocity.x *= -1;
      if (Math.abs(node.position.y) > 3) node.velocity.y *= -1;
      if (Math.abs(node.position.z) > 3) node.velocity.z *= -1;

      // Apply new position to mesh
      groupRef.current.children[index].position.copy(node.position);
    });

    // Subtle global rotation
    groupRef.current.rotation.y += 0.0008;
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <mesh
          key={i}
          position={node.position}
          onPointerOver={(e) => {
            e.object.material.emissiveIntensity = 1.5;
          }}
          onPointerOut={(e) => {
            e.object.material.emissiveIntensity = 0.6;
          }}
        >
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#38bdf8"
            emissiveIntensity={0.6}
          />
        </mesh>
      ))}

      {nodes.map((a, i) =>
        nodes.map((b, j) => {
          if (i >= j) return null;
          if (a.position.distanceTo(b.position) < 1.2) {
            const geometry = new THREE.BufferGeometry().setFromPoints([
              a.position,
              b.position,
            ]);
            return (
              <line key={`${i}-${j}`} geometry={geometry}>
                <lineBasicMaterial
                  color="#38bdf8"
                  opacity={0.2}
                  transparent
                />
              </line>
            );
          }
          return null;
        })
      )}
    </group>
  );
}

export default function WebGLBackground() {
  return (
    <div className="fixed inset-0 -z-40 opacity-30 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Network />
      </Canvas>
    </div>
  );
}
