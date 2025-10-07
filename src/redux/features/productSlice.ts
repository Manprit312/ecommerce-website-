import { createSlice } from "@reduxjs/toolkit";
const products = [
  // 💚 Trending
  {
    id: 0,
    name: "Trending LED Combo Pack",
    price: 49.99,
    category: "Trending",
    rating: 4.9,
    reviews: 500,
    description:
      "Top trending LED decor pack featuring bestsellers from Arya Enterprises. A perfect gift for any occasion.",
    specs: {
      material: "Mixed Decor Set",
      power: "USB + Battery",
      features: ["Trending Picks", "Gift Ready", "Multi-color Light Glow"],
    },
    images: ["/images/product13.jpeg"],
    inStock: true,
    badge: "Trending",
  },
  {
    id: 1,
    name: "Swan Crystal LED Photo Frame",
    price: 45.99,
    category: "Trending",
    rating: 4.9,
    reviews: 234,
    description:
      "Elegant swan-shaped crystal LED lamp with wooden photo frame base. A perfect wedding or anniversary gift for couples.",
    specs: {
      material: "Crystal Swan + Wooden Base",
      dimensions: "28cm x 10cm x 23cm",
      weight: "488g",
      power: "USB Powered LED",
      features: [
        "LED Night Light",
        "Photo Frame",
        "Wooden Base",
        "Crystal Swan Design",
      ],
    },
    images: ["/images/product1.jpeg"],
    inStock: true,
    badge: "Bestseller",
  },

  // 💞 Romantic
  {
    id: 2,
    name: "Crystal Heart Photo Frame",
    price: 42.99,
    category: "Romantic",
    rating: 4.9,
    reviews: 312,
    description:
      "Romantic heart-shaped crystal frame with LED backlighting. Perfect for couples to showcase their precious memories.",
    specs: {
      material: "Crystal + Metal Base",
      power: "Battery Powered LED",
      features: ["LED Backlight", "Heart Design", "Romantic Gift"],
    },
    images: ["/images/product4.jpeg"],
    inStock: true,
  },

  // 🏡 Decor
  {
    id: 3,
    name: "Butterfly LED Frame",
    price: 39.99,
    category: "Decor",
    rating: 4.7,
    reviews: 198,
    description:
      "Elegant butterfly-themed LED frame with glowing accents. Ideal for enhancing bedroom or living room aesthetics.",
    specs: {
      material: "Metal + Crystal",
      power: "USB Powered",
      features: ["LED Accent", "Butterfly Design", "Photo Display"],
    },
    images: ["/images/product6.jpeg"],
    inStock: true,
  },
  {
    id: 4,
    name: "Wooden LED Table Lamp",
    price: 38.99,
    category: "Decor",
    rating: 4.7,
    reviews: 189,
    description:
      "Aesthetic wooden table lamp that complements any modern decor. Perfect for cozy corners and reading spaces.",
    specs: {
      material: "Natural Wood + LED",
      power: "USB Powered",
      features: ["Adjustable Brightness", "Modern Design", "Energy Efficient"],
    },
    images: ["/images/product3.jpeg"],
    inStock: true,
  },
    {
    id: 4,
    name: "Wooden LED Table Lamp",
    price: 38.99,
    category: "Trending",
    rating: 4.7,
    reviews: 189,
    description:
      "Aesthetic wooden table lamp that complements any modern decor. Perfect for cozy corners and reading spaces.",
    specs: {
      material: "Natural Wood + LED",
      power: "USB Powered",
      features: ["Adjustable Brightness", "Modern Design", "Energy Efficient"],
    },
    images: ["/images/product3.jpeg"],
    inStock: true,
  },

  // 💡 Smart Lights
  {
    id: 5,
    name: "Mushroom LED Night Light (Colorful)",
    price: 24.99,
    category: "Smart Lights",
    rating: 4.8,
    reviews: 456,
    description:
      "Smart mushroom-shaped LED night light with auto light sensor. Adds charm and functionality to your space.",
    specs: {
      material: "Plastic Leaf + Silicone Lampshade",
      sensor: "Auto Light Control",
      power: "Socket Plug-in",
      colors: "Multi-color LED",
      features: ["Auto Sensor", "Color Changing", "Energy Saving", "Decorative"],
    },
    images: ["/images/product2.jpeg"],
    inStock: true,
    badge: "Popular",
  },
  {
    id: 6,
    name: "Star Projector Night Light",
    price: 35.99,
    category: "Smart Lights",
    rating: 4.8,
    reviews: 421,
    description:
      "Transforms any room into a starry sky with rotating projection and soothing light effects.",
    specs: {
      material: "Plastic Housing",
      power: "AC Adapter",
      features: ["Star Projection", "Rotating", "Multiple Colors"],
    },
    images: ["/images/product7.jpeg"],
    inStock: true,
  },
{
    id: 6,
    name: "Star Projector Night Light",
    price: 35.99,
    category: "Trending",
    rating: 4.8,
    reviews: 421,
    description:
      "Transforms any room into a starry sky with rotating projection and soothing light effects.",
    specs: {
      material: "Plastic Housing",
      power: "AC Adapter",
      features: ["Star Projection", "Rotating", "Multiple Colors"],
    },
    images: ["/images/product7.jpeg"],
    inStock: true,
  },

  // 💎 Luxury
  {
    id: 7,
    name: "Vintage Edison LED Lamp",
    price: 44.99,
    category: "Luxury",
    rating: 4.9,
    reviews: 356,
    description:
      "Classic Edison bulb design infused with LED technology. A luxurious touch to modern interiors.",
    specs: {
      material: "Glass + Wood Base",
      power: "AC Powered",
      features: ["Vintage Style", "LED Technology", "Dimmable"],
    },
    images: ["/images/product8.jpeg"],
    inStock: true,
  },
  {
    id: 8,
    name: "Golden Crystal Table Lamp",
    price: 59.99,
    category: "Luxury",
    rating: 5.0,
    reviews: 190,
    description:
      "Premium crystal lamp with gold accents. Designed for luxury interiors and sophisticated ambiances.",
    specs: {
      material: "Gold-Plated Metal + Crystal",
      power: "AC Powered",
      features: ["Golden Finish", "Soft Light Glow", "Premium Design"],
    },
    images: ["/images/product9.jpeg"],
    inStock: true,
    badge: "Exclusive",
  },

  // 🎉 Festive
  {
    id: 9,
    name: "Moon LED Night Light",
    price: 32.99,
    category: "Festive",
    rating: 4.6,
    reviews: 278,
    description:
      "3D printed moon lamp with multiple colors — a perfect addition to your festive celebrations.",
    specs: {
      material: "3D Printed PLA",
      power: "Rechargeable Battery",
      features: ["Touch Control", "16 Colors", "Portable"],
    },
    images: ["/images/product5.jpeg"],
    inStock: true,
  },
 {
    id: 7,
    name: "Vintage Edison LED Lamp",
    price: 44.99,
    category: "Trending",
    rating: 4.9,
    reviews: 356,
    description:
      "Classic Edison bulb design infused with LED technology. A luxurious touch to modern interiors.",
    specs: {
      material: "Glass + Wood Base",
      power: "AC Powered",
      features: ["Vintage Style", "LED Technology", "Dimmable"],
    },
    images: ["/images/product8.jpeg"],
    inStock: true,
  },
  {
    id: 10,
    name: "Color Changing LED Gift Set",
    price: 49.99,
    category: "Festive",
    rating: 4.8,
    reviews: 250,
    description:
      "Festive-themed LED gift set that includes decorative lights and small accent pieces for celebrations.",
    specs: {
      material: "Mixed Decorative Set",
      power: "USB Powered",
      features: ["Gift Ready", "Multi-color", "Elegant Packaging"],
    },
    images: ["/images/product10.jpeg"],
    inStock: true,
  },

  // 🪴 Office
  {
    id: 11,
    name: "Minimalist LED Desk Lamp",
    price: 34.99,
    category: "Office",
    rating: 4.7,
    reviews: 310,
    description:
      "Sleek LED desk lamp with adjustable arm and touch controls, ideal for productive workspaces.",
    specs: {
      material: "Aluminum + Plastic",
      power: "USB Powered",
      features: ["Adjustable Arm", "Touch Control", "Eye Protection"],
    },
    images: ["/images/product11.jpeg"],
    inStock: true,
  },
  {
    id: 12,
    name: "Ambient Glow Office Decor Lamp",
    price: 36.99,
    category: "Office",
    rating: 4.8,
    reviews: 278,
    description:
      "Soft ambient LED desk light that enhances focus and adds warmth to office setups.",
    specs: {
      material: "Wood + Frosted Glass",
      power: "USB Powered",
      features: ["Ambient Lighting", "Minimalist Design", "Soft Glow"],
    },
    images: ["/images/product12.jpeg"],
    inStock: true,
  },

  // ⚡ Electronics
  {
    id: 13,
    name: "Smart Bluetooth Speaker Lamp",
    price: 54.99,
    category: "Electronics",
    rating: 4.8,
    reviews: 320,
    description:
      "A multifunctional Bluetooth speaker with LED lamp — perfect for both music and ambiance lighting.",
    specs: {
      power: "Rechargeable Battery",
      connectivity: "Bluetooth 5.0",
      features: ["Music Sync Lights", "Touch Control", "Portable Design"],
    },
    images: ["/images/product3.jpeg"],
    inStock: true,
  },
  {
    id: 14,
    name: "Wireless Charging LED Base",
    price: 39.99,
    category: "Electronics",
    rating: 4.6,
    reviews: 190,
    description:
      "Charge your devices wirelessly with this elegant LED-lit base — combines utility with style.",
    specs: {
      power: "USB-C",
      output: "15W Fast Charge",
      features: ["LED Ring Light", "Qi Compatible", "Minimal Design"],
    },
    images: ["/images/product5.png"],
    inStock: true,
  },

  // 🛍️ Brands
  {
    id: 15,
    name: "Lumina Signature Lamp",
    price: 64.99,
    category: "Brands",
    rating: 4.9,
    reviews: 150,
    description:
      "Lumina's best-selling LED lamp featuring a unique glow aura design for luxury lighting.",
    specs: {
      brand: "Lumina",
      power: "AC Powered",
      features: ["Aura Glow", "Smart Dimming", "Premium Build"],
    },
    images: ["/images/product5.jpeg"],
    inStock: true,
  },
  {
    id: 16,
    name: "GlowArt Decorative Light",
    price: 48.99,
    category: "Brands",
    rating: 4.7,
    reviews: 212,
    description:
      "From GlowArt’s premium decor series — a modern LED piece that transforms your space instantly.",
    specs: {
      brand: "GlowArt",
      features: ["Artistic Light Design", "Low Power Use"],
    },
    images: ["/images/product11.jpeg"],
    inStock: true,
  },

  // 🧩 Collections
  {
    id: 17,
    name: "Romantic Gift Collection Set",
    price: 89.99,
    category: "Collections",
    rating: 4.9,
    reviews: 210,
    description:
      "A special bundle of romantic LED decor and frames designed for gifting your loved ones.",
    specs: {
      features: ["Gift Box Packaging", "Mixed LED Products", "Elegant Design"],
    },
    images: ["/images/product10.jpeg"],
    inStock: true,
  },
  {
    id: 18,
    name: "Minimalist Home Collection",
    price: 99.99,
    category: "Collections",
    rating: 4.8,
    reviews: 178,
    description:
      "A curated home collection featuring table lamps, decor frames, and warm ambient lights.",
    specs: {
      features: ["Home Decor Essentials", "LED + Wood Mix", "Soft Ambience"],
    },
    images: ["/images/product5.jpeg"],
    inStock: true,
  },

  // 👗 Fashion
  {
    id: 19,
    name: "GlowEdge LED T-Shirt",
    price: 29.99,
    category: "Fashion",
    rating: 4.6,
    reviews: 165,
    description:
      "Trendy LED-lined t-shirt that glows at night — perfect for events, parties, or casual wear.",
    specs: {
      material: "Cotton + Fiber Optic",
      power: "USB Rechargeable",
      features: ["Glow Fabric", "Light Patterns", "Washable Tech"],
    },
    images: ["/images/product12.jpeg"],
    inStock: true,
  },
  {
    id: 20,
    name: "Smart LED Sneakers",
    price: 59.99,
    category: "Fashion",
    rating: 4.7,
    reviews: 234,
    description:
      "Futuristic sneakers with integrated LED soles — designed for comfort, durability, and style.",
    specs: {
      material: "Mesh + TPU",
      power: "Rechargeable Battery",
      features: ["LED Sole Glow", "Touch Control", "Lightweight"],
    },
    images: ["/images/product13.jpeg"],
    inStock: true,
  },

  // 🏠 Home & Kitchen
  {
    id: 21,
    name: "Aroma LED Diffuser",
    price: 44.99,
    category: "Home & Kitchen",
    rating: 4.8,
    reviews: 400,
    description:
      "Combines soothing LED lights with an aroma diffuser — a must-have for relaxation.",
    specs: {
      capacity: "200ml",
      features: ["Aroma Therapy", "7 Color Lights", "Quiet Operation"],
    },
    images: ["/images/product6.jpeg"],
    inStock: true,
  },
  {
    id: 22,
    name: "LED Glass Kettle",
    price: 34.99,
    category: "Home & Kitchen",
    rating: 4.6,
    reviews: 189,
    description:
      "Transparent glass kettle with LED temperature indication — style meets practicality.",
    specs: {
      capacity: "1.7L",
      power: "1500W",
      features: ["LED Heat Indicator", "Auto Shutoff", "Fast Boil"],
    },
    images: ["/images/product8.jpeg"],
    inStock: true,
  },

  // 🎁 Gifts
  {
    id: 23,
    name: "Personalized LED Photo Crystal",
    price: 64.99,
    category: "Gifts",
    rating: 5.0,
    reviews: 230,
    description:
      "Custom 3D crystal frame that lights up your favorite memories with warm LED illumination.",
    specs: {
      material: "Engraved Crystal",
      features: ["Customizable", "LED Base", "Gift Box"],
    },
    images: ["/images/product9.jpeg"],
    inStock: true,
    badge: "Gift Pick",
  },
  {
    id: 24,
    name: "Music Reactive LED Frame",
    price: 49.99,
    category: "Gifts",
    rating: 4.9,
    reviews: 210,
    description:
      "A fun, sound-reactive LED photo frame that dances to your favorite music — the perfect personalized gift.",
    specs: {
      features: ["Sound Reactive", "Photo Display", "Rechargeable"],
    },
    images: ["/images/musicreactiveledframe.webp"],
    inStock: true,
  },
];


const productSlice = createSlice({
  name: "products",
  initialState: {
    allProducts: products,
    filtered: products.filter((p) => p.category === "Trending"),
    currentCategory: "Trending",
    selectedProduct: null,
  },
  reducers: {
    filterByCategory: (state, action) => {
      const category = action.payload;
      state.filtered = state.allProducts.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
      state.currentCategory = category;
    },
    selectProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
});

export const { filterByCategory, selectProduct, clearSelectedProduct } =
  productSlice.actions;
export default productSlice.reducer;

