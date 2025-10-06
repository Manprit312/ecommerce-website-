"use client";
import React, { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import * as THREE from "three";

function SmoothOrbs(): JSX.Element {
  const group = useRef<THREE.Group>(null);

  // Pre-generate orb positions + colors only once (for stability)
  const orbs = useMemo(() =>
    Array.from({ length: 20 }).map(() => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6
      ),
      color: new THREE.Color(`hsl(${Math.random() * 360}, 70%, 80%)`),
      scale: 0.2 + Math.random() * 0.3,
      speed: 0.5 + Math.random() * 0.5,
    }))
  , []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = t * 0.05;
      group.current.children.forEach((child, i) => {
        child.position.y += Math.sin(t * orbs[i].speed + i) * 0.002;
      });
    }
  });

  return (
    <group ref={group}>
      {orbs.map((orb, i) => (
        <Float key={i} speed={orb.speed} floatIntensity={1}>
          <mesh position={orb.position} scale={orb.scale}>
            <sphereGeometry args={[1, 48, 48]} />
            <meshStandardMaterial
              color={orb.color}
              emissive={orb.color}
              emissiveIntensity={0.25}
              roughness={0.4}
              metalness={0.6}
              transparent
              opacity={0.9}
            />
            {/* subtle outer faded glow */}
            <mesh>
              <sphereGeometry args={[1.05, 48, 48]} />
              <meshBasicMaterial
                color={orb.color}
                transparent
                opacity={0.18}
                side={THREE.BackSide}
              />
            </mesh>
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export default function ProductsBackground(): JSX.Element {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#fffaf7"]} />
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffeed1" />
        <Suspense fallback={null}>
          <SmoothOrbs />
          <Stars radius={45} depth={40} count={2000} factor={3} fade speed={0.8} />
        </Suspense>
      </Canvas>

      {/* soft radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rose-50/50 to-amber-100/60 pointer-events-none" />
    </div>
  );
}
