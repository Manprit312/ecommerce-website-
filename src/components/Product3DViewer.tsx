"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";

interface Product3DViewerProps {
  modelUrl?: string; // Path to .glb/.gltf file
  images?: string[]; // [front, back]
}

/**
 * ✅ Load and render a 3D model (GLB/GLTF)
 */
function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1.5} />;
}

/**
 * ✅ Display 2D product as a box with front & back textures
 */
function ImageBox({ front, back }: { front: string; back?: string }) {
  const textureLoader = new THREE.TextureLoader();
  const frontTexture = textureLoader.load(front);
  const backTexture = textureLoader.load(back || front);

  const materials = [
    new THREE.MeshStandardMaterial({ color: 0xffffff }), // right
    new THREE.MeshStandardMaterial({ color: 0xffffff }), // left
    new THREE.MeshStandardMaterial({ color: 0xffffff }), // top
    new THREE.MeshStandardMaterial({ color: 0xffffff }), // bottom
    new THREE.MeshStandardMaterial({ map: frontTexture }), // front
    new THREE.MeshStandardMaterial({ map: backTexture }), // back
  ];

  const geometry = new THREE.BoxGeometry(2.5, 3, 0.3);
  return <mesh geometry={geometry} material={materials} />;
}

/**
 * 🎨 Main 3D Product Viewer Component
 */
const Product3DViewer: React.FC<Product3DViewerProps> = ({ modelUrl, images = [] }) => {
  const isModel = !!(modelUrl && (modelUrl.endsWith(".glb") || modelUrl.endsWith(".gltf")));

  return (
    <div className="w-full aspect-[4/3] bg-[#f5fff9] rounded-xl overflow-hidden relative">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        className="touch-none"
      >
        {/* 💡 Lights */}
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <directionalLight position={[-5, -5, -5]} intensity={0.4} />
        <Environment preset="sunset" />

        <Suspense
          fallback={
            <mesh>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color="lightgray" />
            </mesh>
          }
        >
          {/* 🧩 Load 3D model or fallback to image box */}
          {isModel ? (
            <Model url={modelUrl!} />
          ) : (
            images.length > 0 && <ImageBox front={images[0]} back={images[1]} />
          )}
        </Suspense>

        {/* 🎮 OrbitControls: smooth drag rotation, no zoom */}
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>

      <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
        Drag to rotate
      </div>
    </div>
  );
};

export default Product3DViewer;
