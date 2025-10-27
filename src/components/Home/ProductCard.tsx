"use client";

import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";
import React, { Suspense } from "react";

interface Product {
  _id?: string;
  name: string;
  price: number;
  rating?: number;
  badge?: string;
  images?: string[];
  modelUrl?: string;
  category?: string | { name: string };
  categories?: (string | { name: string })[];
}

interface ProductCardProps {
  product: Product;
}

/** 🧩 Model Loader for GLB/GLTF */
function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1.5} />;
}

/** 🖼️ Box showing front/back images */
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

/** 🎨 3D Product Viewer using react-three-fiber */
const Product3DViewer: React.FC<{ modelUrl?: string; images?: string[] }> = ({
  modelUrl,
  images = [],
}) => {
  const isModel =
    modelUrl && (modelUrl.endsWith(".glb") || modelUrl.endsWith(".gltf"));

  return (
    <div className="relative w-full aspect-[4/3] bg-[#f5fff9] rounded-xl overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} className="touch-none">
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
          {isModel ? (
            <Model url={modelUrl!} />
          ) : (
            images.length > 0 && <ImageBox front={images[0]} back={images[1]} />
          )}
        </Suspense>

        {/* 🎮 OrbitControls: smooth drag rotation */}
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>

      <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
        Drag to rotate
      </div>
    </div>
  );
};

export default function ProductCard({ product }) {
  const router = useRouter();

  // Extract category safely
  const displayCategory =
    typeof product.categories?.[0] === "object"
      ? product.categories[0]?.name
      : product.categories?.[0] ||
        (typeof product.category === "object"
          ? product.category.name
          : product.category) ||
        "General";

  // Click handlers
  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product._id) router.push(`/product/${product._id}`);
  };

  const handleCategoryClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (displayCategory && displayCategory !== "General") {
      router.push(`/category/${encodeURIComponent(displayCategory.toLowerCase())}`);
    }
  };

  return (
    <div
      onClick={handleViewDetails}
      className="relative bg-white rounded-2xl shadow-md overflow-hidden border border-[#e7f6ed]
                 cursor-pointer hover:shadow-[0_10px_25px_rgba(29,170,97,0.25)]
                 hover:scale-[1.02] transition-all duration-300 group"
    >
      {/* === 3D Product Viewer === */}
      {product.modelUrl || product.images?.[0] ? (
        <Product3DViewer modelUrl={product.modelUrl} images={product.images} />
      ) : (
        <div className="aspect-[4/3] flex items-center justify-center text-gray-400 text-sm italic bg-[#f5fff9]">
          No Image
        </div>
      )}

      {/* ⭐ Rating Badge */}
      {product.rating && (
        <div className="absolute bottom-2 right-2 flex items-center bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full shadow-sm pointer-events-none">
          <Star className="w-3.5 h-3.5 fill-[#1daa61] text-[#1daa61]" />
          <span className="ml-1 text-xs font-semibold text-gray-700">
            {product.rating}
          </span>
        </div>
      )}

      {/* === Product Info === */}
      <div className="p-4 sm:p-5">
        <button
          onClick={handleCategoryClick}
          className="relative text-xs sm:text-sm font-semibold text-[#1daa61] mb-1 group/category"
        >
          {displayCategory}
          <span
            className="absolute left-0 bottom-[-2px] w-0 h-[2px] bg-[#1daa61] 
                       transition-all duration-300 group-hover/category:w-full"
          ></span>
        </button>

        <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-1 line-clamp-2 group-hover:text-[#1daa61] transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center justify-between mt-2">
          <span className="text-lg sm:text-xl font-bold text-[#1daa61]">
            ₹{product.price}
          </span>
          <button
            onClick={handleViewDetails}
            className="px-3 py-1.5 text-xs sm:text-sm font-semibold text-white bg-[#1daa61] rounded-full shadow-md 
                       hover:bg-[#189c57] hover:shadow-[0_4px_12px_rgba(29,170,97,0.3)] transition-all"
          >
            Buy
          </button>
        </div>
      </div>

      {product.badge && (
        <div className="absolute top-3 left-3 bg-[#1daa61]/10 text-[#1daa61] px-3 py-1 text-xs font-bold rounded-full shadow-sm z-10">
          {product.badge}
        </div>
      )}
    </div>
  );
};

// import { useRouter } from "next/navigation";
// import { Star } from "lucide-react";
// import Image from "next/image";

// export default function ProductCard({ product }) {
//   const router = useRouter();

//   // ✅ Go to product detail page
//   const handleViewDetails = (e) => {
//     e.stopPropagation();
//     if (!product?._id) return;
//     router.push(`/product/${product._id}`);
//   };

//   // ✅ Handle category click — works for populated or string categories
//   const handleCategoryClick = (e) => {
//     e.stopPropagation();
//     let categoryName = "General";

//     if (product.categories?.length > 0) {
//       // Handle both populated object and string case
//       const firstCategory = product.categories[0];
//       categoryName = typeof firstCategory === "object" ? firstCategory.name : firstCategory;
//     } else if (product.category) {
//       categoryName = typeof product.category === "object" ? product.category.name : product.category;
//     }

//     if (categoryName && categoryName !== "General") {
//       router.push(`/category/${encodeURIComponent(categoryName.toLowerCase())}`);
//     }
//   };

//   // ✅ Extract category name safely
//   const displayCategory =
//     typeof product.categories?.[0] === "object"
//       ? product.categories[0]?.name
//       : product.categories?.[0] || product.category || "General";

//   return (
//     <div
//       onClick={handleViewDetails}
//       className="relative bg-white rounded-2xl shadow-md overflow-hidden border border-[#e7f6ed]
//                  cursor-pointer hover:shadow-[0_10px_25px_rgba(29,170,97,0.25)]
//                  hover:scale-[1.02] transition-all duration-300 group"
//     >
//       {/* === Product Image === */}
//       <div className="relative aspect-[4/3] w-full bg-gradient-to-br from-[#f5fff9] to-white flex items-center justify-center overflow-hidden">
//         {product.images?.[0] ? (
//           <Image
//             src={product.images[0]}
//             alt={product.name}
//             width={500}
//             height={375}
//             className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
//           />
//         ) : (
//           <div className="flex items-center justify-center text-gray-400 text-sm italic h-full">
//             No Image
//           </div>
//         )}

//         {/* ⭐ Rating Badge */}
//         {product.rating && (
//           <div className="absolute bottom-2 right-2 flex items-center bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full shadow-sm">
//             <Star className="w-3.5 h-3.5 fill-[#1daa61] text-[#1daa61]" />
//             <span className="ml-1 text-xs font-semibold text-gray-700">
//               {product.rating}
//             </span>
//           </div>
//         )}
//       </div>

//       {/* === Product Info === */}
//       <div className="p-4 sm:p-5">
//         {/* Category Label */}
//         <button
//           onClick={handleCategoryClick}
//           className="relative text-xs sm:text-sm font-semibold text-[#1daa61] mb-1 group/category"
//         >
//           {displayCategory}
//           <span
//             className="absolute left-0 bottom-[-2px] w-0 h-[2px] bg-[#1daa61] 
//                        transition-all duration-300 group-hover/category:w-full"
//           ></span>
//         </button>

//         {/* Product Name */}
//         <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-1 line-clamp-2 group-hover:text-[#1daa61] transition-colors">
//           {product.name}
//         </h3>

//         {/* Price + Buy Button */}
//         <div className="flex items-center justify-between mt-2">
//           <span className="text-lg sm:text-xl font-bold text-[#1daa61]">
//             ₹{product.price}
//           </span>
//           <button
//             onClick={handleViewDetails}
//             className="px-3 py-1.5 text-xs sm:text-sm font-semibold text-white bg-[#1daa61] rounded-full shadow-md 
//                        hover:bg-[#189c57] hover:shadow-[0_4px_12px_rgba(29,170,97,0.3)] transition-all"
//           >
//             Buy
//           </button>
//         </div>
//       </div>

//       {/* 🏷️ Optional badge */}
//       {product.badge && (
//         <div className="absolute top-3 left-3 bg-[#1daa61]/10 text-[#1daa61] px-3 py-1 text-xs font-bold rounded-full shadow-sm">
//           {product.badge}
//         </div>
//       )}
//     </div>
//   );
// }
