
"use client";
import React, { useState } from "react";
import Header from "../Header";
import HomeBanner from "./HomeBanner/HomeBanner";
import HeroSection  from "./HeroSection";
import ProductsGrid from "./ProductsGrid";
import ProductDetails from "./ProductDetails";
import FeaturesSection from "./FeaturesSelection";
import Footer from "../Footer";
import { motion } from "framer-motion";

export const products = [
  { 
    id: 1, 
    name: 'Swan Crystal LED Photo Frame', 
    price: 45.99, 
    category: 'frames',
    rating: 4.9, 
    reviews: 234,
    description: 'Elegant swan-shaped crystal LED lamp with wooden photo frame base. Perfect wedding and anniversary gift for couples.',
    specs: {
      material: 'Crystal Swan + Wooden Base',
      dimensions: '28cm x 10cm x 23cm',
      weight: '488g',
      power: 'USB Powered LED',
      features: ['LED Night Light', 'Photo Frame', 'Wooden Base', 'Crystal Swan Design']
    },
    images: ['/images/product1.jpeg'],
    inStock: true,
    badge: 'Bestseller'
  },
  { 
    id: 2, 
    name: 'Mushroom LED Night Light (Colorful)', 
    price: 24.99, 
    category: 'lights',
    rating: 4.8, 
    reviews: 456,
    description: 'Colorful mushroom-shaped LED night light with intelligent light sensor. Automatically turns on in darkness, perfect for bedrooms, nurseries, and hallways.',
    specs: {
      material: 'Plastic Leaf + Silicone Lampshade',
      sensor: 'Auto Light Control',
      power: 'Socket Plug-in',
      colors: 'Multi-color LED',
      features: ['Auto Sensor', 'Color Changing', 'Energy Saving', 'Decorative']
    },
    images: ['/images/product2.jpeg'],
    inStock: true,
    badge: 'Popular'
  },
  { 
    id: 3, 
    name: 'Wooden LED Table Lamp', 
    price: 38.99, 
    category: 'lights',
    rating: 4.7, 
    reviews: 189,
    description: 'Modern wooden desk lamp with adjustable brightness. Perfect for reading and ambient lighting.',
    specs: {
      material: 'Natural Wood + LED',
      power: 'USB Powered',
      features: ['Adjustable Brightness', 'Modern Design', 'Energy Efficient']
    },
  images: ['/images/product3.jpeg'],
    inStock: true
  },
  { 
    id: 4, 
    name: 'Crystal Heart Photo Frame', 
    price: 42.99, 
    category: 'frames',
    rating: 4.9, 
    reviews: 312,
    description: 'Romantic heart-shaped crystal frame with LED backlighting. Ideal for displaying your cherished memories.',
    specs: {
      material: 'Crystal + Metal Base',
      power: 'Battery Powered LED',
      features: ['LED Backlight', 'Heart Design', 'Romantic Gift']
    },
   images: ['/images/product4.jpeg'],
    inStock: true
  },
  { 
    id: 5, 
    name: 'Moon LED Night Light', 
    price: 32.99, 
    category: 'lights',
    rating: 4.6, 
    reviews: 278,
    description: '3D printed moon lamp with touch control and multiple color modes.',
    specs: {
      material: '3D Printed PLA',
      power: 'Rechargeable Battery',
      features: ['Touch Control', '16 Colors', 'Portable']
    },
   images: ['/images/product5.jpeg'],
    inStock: true
  },
  { 
    id: 6, 
    name: 'Butterfly LED Frame', 
    price: 39.99, 
    category: 'frames',
    rating: 4.7, 
    reviews: 198,
    description: 'Delicate butterfly design with LED accent lighting and photo display.',
    specs: {
      material: 'Metal + Crystal',
      power: 'USB Powered',
      features: ['LED Accent', 'Butterfly Design', 'Photo Display']
    },
   images: ['/images/product6.jpeg'],
    inStock: true
  },
  { 
    id: 7, 
    name: 'Star Projector Night Light', 
    price: 35.99, 
    category: 'lights',
    rating: 4.8, 
    reviews: 421,
    description: 'Creates a starry night atmosphere with rotating projection.',
    specs: {
      material: 'Plastic Housing',
      power: 'AC Adapter',
      features: ['Star Projection', 'Rotating', 'Multiple Colors']
    },
   images: ['/images/product7.jpeg'],
    inStock: true
  },
  { 
    id: 8, 
    name: 'Vintage Edison LED Lamp', 
    price: 44.99, 
    category: 'lights',
    rating: 4.9, 
    reviews: 356,
    description: 'Classic Edison bulb design with modern LED technology.',
    specs: {
      material: 'Glass + Wood Base',
      power: 'AC Powered',
      features: ['Vintage Style', 'LED Technology', 'Dimmable']
    },
 images: ['/images/product8.jpeg'],
    inStock: true
  },
];

export default function EcommerceWebsite() {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // product data (same as before)...

  const addToCart = (p) => setCart([...cart, p]);
  const toggleFavorite = (id) =>
    setFavorites(favorites.includes(id) ? favorites.filter((i) => i !== id) : [...favorites, id]);
  const viewProductDetails = (p) => setSelectedProduct(p);

  return selectedProduct ? (
    <ProductDetails
    product={selectedProduct}
    addToCart={addToCart}
    toggleFavorite={toggleFavorite}
    favorites={favorites}
    goBack={() => setSelectedProduct(null)}
    cart={cart}
  />
  ) : (
    <>
  
      <Header cart={cart} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <HomeBanner/>
      {/* <HeroSection /> */}
      <ProductsGrid
        products={products}
        addToCart={addToCart}
        toggleFavorite={toggleFavorite}
        favorites={favorites}
        viewProductDetails={viewProductDetails}
      />
      {/* <FeaturesSection /> */}
      {/* <Footer /> */}
    </>
  );
}
