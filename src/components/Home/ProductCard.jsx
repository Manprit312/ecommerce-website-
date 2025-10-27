"use client";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import THREE only on client side
const THREE = typeof window !== 'undefined' ? require('three') : null;

export default function ProductCard({ product }) {
  const router = useRouter();
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const meshRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState({ x: 0.3, y: 0.3 });
  const dragStart = useRef({ x: 0, y: 0 });

  // ✅ Go to product detail page
  const handleViewDetails = (e) => {
    e.stopPropagation();
    if (!product?._id) return;
    router.push(`/product/${product._id}`);
  };

  // ✅ Handle category click
  const handleCategoryClick = (e) => {
    e.stopPropagation();
    let categoryName = "General";

    if (product.categories?.length > 0) {
      const firstCategory = product.categories[0];
      categoryName = typeof firstCategory === "object" ? firstCategory.name : firstCategory;
    } else if (product.category) {
      categoryName = typeof product.category === "object" ? product.category.name : product.category;
    }

    if (categoryName && categoryName !== "General") {
      router.push(`/category/${encodeURIComponent(categoryName.toLowerCase())}`);
    }
  };

  // ✅ Extract category name safely
  const displayCategory =
    typeof product.categories?.[0] === "object"
      ? product.categories[0]?.name
      : product.categories?.[0] || product.category || "General";

  // ✅ Initialize 3D Scene
  useEffect(() => {
    // Ensure we're on client side and THREE is available
    if (typeof window === 'undefined' || !THREE || !canvasRef.current || !product.images?.[0]) return;

    const canvas = canvasRef.current;
    const width = canvas.clientWidth || 300;
    const height = canvas.clientHeight || 225;

    if (width === 0 || height === 0) return;

    let renderer, scene, camera, mesh;
    let animationId;

    try {

    try {
      // Scene setup
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0xf5fff9);
      sceneRef.current = scene;

      // Camera
      camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      camera.position.z = 5;

      // Renderer
      renderer = new THREE.WebGLRenderer({ 
        canvas, 
        antialias: true, 
        alpha: true,
        powerPreference: "high-performance"
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambientLight);

      const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight1.position.set(5, 5, 5);
      scene.add(directionalLight1);

      const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.4);
      directionalLight2.position.set(-5, -5, -5);
      scene.add(directionalLight2);

      // Load texture and create 3D object
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load(
        product.images[0],
        (texture) => {
          // Create a box with the product image as texture
          const geometry = new THREE.BoxGeometry(2.5, 3, 0.3);
          const materials = [
            new THREE.MeshStandardMaterial({ color: 0xffffff }), // right
            new THREE.MeshStandardMaterial({ color: 0xffffff }), // left
            new THREE.MeshStandardMaterial({ color: 0xffffff }), // top
            new THREE.MeshStandardMaterial({ color: 0xffffff }), // bottom
            new THREE.MeshStandardMaterial({ map: texture }), // front
            new THREE.MeshStandardMaterial({ 
              map: product.images[1] ? textureLoader.load(product.images[1]) : texture 
            }), // back
          ];

          mesh = new THREE.Mesh(geometry, materials);
          mesh.rotation.x = rotation.x;
          mesh.rotation.y = rotation.y;
          meshRef.current = mesh;
          scene.add(mesh);

          // Animation loop
          const animate = () => {
            animationId = requestAnimationFrame(animate);
            
            if (meshRef.current && !isDragging) {
              meshRef.current.rotation.y += 0.005;
            }
            
            renderer.render(scene, camera);
          };
          animate();
        },
        undefined,
        (error) => {
          console.error('Error loading texture:', error);
        }
      );

      // Handle resize
      const handleResize = () => {
        const newWidth = canvas.clientWidth;
        const newHeight = canvas.clientHeight;
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        if (animationId) cancelAnimationFrame(animationId);
        if (renderer) renderer.dispose();
        if (mesh) {
          if (mesh.geometry) mesh.geometry.dispose();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach(mat => mat.dispose());
          } else if (mesh.material) {
            mesh.material.dispose();
          }
        }
      };
    } catch (error) {
      console.error('Error initializing 3D viewer:', error);
    }
}catch(err){console.log(err)}
   } ,[product.images, isDragging, rotation])

  // ✅ Mouse drag to rotate
const handleMouseDown = (e) => {
  e.stopPropagation();
  setIsDragging(true);
  setDragged(false);
  dragStart.current = { x: e.clientX, y: e.clientY };
};

const handleMouseMove = (e) => {
  if (!isDragging || !meshRef.current) return;

  const deltaX = e.clientX - dragStart.current.x;
  const deltaY = e.clientY - dragStart.current.y;

  if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) setDragged(true);

  meshRef.current.rotation.y += deltaX * 0.01;
  meshRef.current.rotation.x += deltaY * 0.01;

  dragStart.current = { x: e.clientX, y: e.clientY };
};

const handleMouseUp = (e) => {
  // 👇 Prevent click if it was a drag
  if (dragged) {
    e.stopPropagation();
  }
  setIsDragging(false);
};

  // Touch support
const handleTouchStart = (e) => {
  e.stopPropagation();
  setIsDragging(true);
  setDragged(false);
  const touch = e.touches[0];
  dragStart.current = { x: touch.clientX, y: touch.clientY };
};

const handleTouchMove = (e) => {
  if (!isDragging || !meshRef.current) return;

  const touch = e.touches[0];
  const deltaX = touch.clientX - dragStart.current.x;
  const deltaY = touch.clientY - dragStart.current.y;

  if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) setDragged(true);

  meshRef.current.rotation.y += deltaX * 0.01;
  meshRef.current.rotation.x += deltaY * 0.01;

  dragStart.current = { x: touch.clientX, y: touch.clientY };
};

const handleTouchEnd = (e) => {
  if (dragged) {
    e.stopPropagation();
  }
  setIsDragging(false);
};


  return (
    <div
      onClick={handleViewDetails}
      className="relative bg-white rounded-2xl shadow-md overflow-hidden border border-[#e7f6ed]
                 cursor-pointer hover:shadow-[0_10px_25px_rgba(29,170,97,0.25)]
                 hover:scale-[1.02] transition-all duration-300 group"
    >
      {/* === 3D Product Viewer === */}
      <div className="relative aspect-[4/3] w-full bg-gradient-to-br from-[#f5fff9] to-white flex items-center justify-center overflow-hidden">
        {product.images?.[0] ? (
       <canvas
  ref={canvasRef}
  width={600}
  height={450}
  className={`w-full h-full ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
  onMouseDown={handleMouseDown}
  onMouseMove={handleMouseMove}
  onMouseUp={handleMouseUp}
  onMouseLeave={handleMouseUp}
  onTouchStart={handleTouchStart}
  onTouchMove={handleTouchMove}
  onTouchEnd={handleTouchEnd}
  onClick={(e) => e.stopPropagation()} // ✅ Prevent card click on canvas
/>

        ) : (
          <div className="flex items-center justify-center text-gray-400 text-sm italic h-full">
            No Image
          </div>
        )}

        {/* Interaction hint */}
      

        {/* ⭐ Rating Badge */}
        {product.rating && (
          <div className="absolute bottom-2 right-2 flex items-center bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full shadow-sm pointer-events-none">
            <Star className="w-3.5 h-3.5 fill-[#1daa61] text-[#1daa61]" />
            <span className="ml-1 text-xs font-semibold text-gray-700">
              {product.rating}
            </span>
          </div>
        )}
      </div>

      {/* === Product Info === */}
      <div className="p-4 sm:p-5">
        {/* Category Label */}
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

        {/* Product Name */}
        <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-1 line-clamp-2 group-hover:text-[#1daa61] transition-colors">
          {product.name}
        </h3>

        {/* Price + Buy Button */}
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
            <div className="absolute top-2 right-2 bg-black/60 text-black text-xs px-2 py-1 rounded-full backdrop-blur-sm pointer-events-none">
          Drag to rotate
        </div>
        </div>
      </div>

      {/* 🏷️ Optional badge */}
      {product.badge && (
        <div className="absolute top-3 left-3 bg-[#1daa61]/10 text-[#1daa61] px-3 py-1 text-xs font-bold rounded-full shadow-sm z-10">
          {product.badge}
        </div>
      )}
    </div>
  );
}