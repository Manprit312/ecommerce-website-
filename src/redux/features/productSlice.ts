// import { createSlice } from "@reduxjs/toolkit";
// export const products = [
//   // 💡 LED & Decor
//   {
//     id: 1,
//     name: "Swan Crystal LED Photo Frame",
//     price: 45.99,
//     category: "Decor",
//     rating: 4.9,
//     reviews: 234,
//     description:
//       "Elegant swan-shaped crystal LED lamp with a wooden photo frame base — perfect for gifting and home decor.",
//     specs: {
//       material: "Crystal Swan + Wooden Base",
//       dimensions: "28cm x 10cm x 23cm",
//       weight: "488g",
//       power: "USB Powered LED",
//       features: ["LED Night Light", "Photo Frame", "Wooden Base", "Gift Ready"],
//     },
//     images: [
//       "https://res.cloudinary.com/dnvhetnud/image/upload/v1759901843/swanledphotoframs_x92deh.jpg",
//     ],
//     inStock: true,
//     badge: "Bestseller",
//   },

//   // 👛 Crochet Fashion
//   {
//     id: 2,
//     name: "Handmade Crochet Purse (Pink)",
//     price: 29.99,
//     category: "Fashion",
//     rating: 4.8,
//     reviews: 180,
//     description:
//       "Stylish handmade crochet purse crafted with soft yarn. Lightweight, eco-friendly, and perfect for casual outings.",
//     specs: {
//       material: "Soft Cotton Yarn",
//       color: "Pink",
//       features: ["Eco-Friendly", "Durable Stitching", "Handmade"],
//     },
//     images: [
//       "https://res.cloudinary.com/dnvhetnud/image/upload/v1759901843/handmadecrochetpurse2_wugeqp.jpg",
//     ],
//     inStock: true,
//   },
//   {
//     id: 3,
//     name: "Handmade Crochet Purse (Black)",
//     price: 29.99,
//     category: "Fashion",
//     rating: 4.7,
//     reviews: 162,
//     description:
//       "Elegant black handmade crochet purse — lightweight and versatile with a modern handmade aesthetic.",
//     specs: {
//       material: "Soft Cotton Yarn",
//       color: "Black",
//       features: ["Handcrafted", "Eco-Friendly", "Durable Yarn"],
//     },
//     images: [
//       "https://res.cloudinary.com/dnvhetnud/image/upload/v1759901843/handmadecrochetpurseblack_diat5e.jpg",
//     ],
//     inStock: true,
//   },
//   {
//     id: 4,
//     name: "Handmade Crochet Purse (Beige)",
//     price: 28.99,
//     category: "Fashion",
//     rating: 4.8,
//     reviews: 150,
//     description:
//       "Beige-toned crochet purse handcrafted for a chic look — perfect accessory for everyday elegance.",
//     specs: {
//       material: "Premium Wool Yarn",
//       color: "Beige",
//       features: ["Elegant Design", "Soft Texture", "Durable Material"],
//     },
//     images: [
//       "https://res.cloudinary.com/dnvhetnud/image/upload/v1759901843/handmadecrochetpurse_zzyofm.jpg",
//     ],
//     inStock: true,
//   },

//   // 🧤 Crochet Accessories
//   {
//     id: 5,
//     name: "Handmade Crochet Gloves",
//     price: 19.99,
//     category: "Fashion",
//     rating: 4.6,
//     reviews: 110,
//     description:
//       "Soft handmade crochet gloves that offer warmth and comfort during winter days. Stylish and breathable.",
//     specs: {
//       material: "Soft Wool Yarn",
//       color: "Pastel Mix",
//       features: ["Handcrafted", "Warm", "Comfort Fit"],
//     },
//     images: [
//       "https://res.cloudinary.com/dnvhetnud/image/upload/v1759901842/handmadecrochetgluves_ltpxxf.jpg",
//     ],
//     inStock: true,
//   },
//   {
//     id: 6,
//     name: "Crochet Gloves (Design 2)",
//     price: 19.99,
//     category: "Fashion",
//     rating: 4.7,
//     reviews: 95,
//     description:
//       "Classic crochet gloves designed for warmth and everyday wear. Crafted by skilled artisans.",
//     specs: {
//       material: "Cotton Yarn Blend",
//       color: "Gray-White Mix",
//       features: ["Soft Texture", "Handmade", "Perfect Fit"],
//     },
//     images: [
//       "https://res.cloudinary.com/dnvhetnud/image/upload/v1759901842/handmadecrochetgloves_fq66qo.jpg",
//     ],
//     inStock: true,
//   },

//   // 🔑 Keychains Collection
//   {
//     id: 7,
//     name: "Handmade Crochet Keychain (Blue)",
//     price: 9.99,
//     category: "Accessories",
//     rating: 4.8,
//     reviews: 220,
//     description:
//       "Cute handmade crochet keychain with colorful detailing — a perfect gift for friends and loved ones.",
//     specs: {
//       material: "Cotton Yarn + Metal Hook",
//       features: ["Handmade", "Vibrant Colors", "Lightweight"],
//     },
//     images: [
//       "https://res.cloudinary.com/dnvhetnud/image/upload/v1759901843/handmadecrochetkeychains_jgt2mr.jpg",
//     ],
//     inStock: true,
//     badge: "New",
//   },
//   {
//     id: 8,
//     name: "Crochet Keychain (Design 2)",
//     price: 8.99,
//     category: "Accessories",
//     rating: 4.7,
//     reviews: 205,
//     description:
//       "Mini crochet keychain in a unique design — ideal as a car charm or small gift.",
//     specs: {
//       material: "Soft Yarn + Keyring",
//       features: ["Custom Design", "Durable Stitching"],
//     },
//     images: [
//       "https://res.cloudinary.com/dnvhetnud/image/upload/v1759901842/handmadecrochetkeychain2_ndiddz.jpg",
//     ],
//     inStock: true,
//   },
//   {
//     id: 9,
//     name: "Crochet Keychain (Single Piece)",
//     price: 7.99,
//     category: "Accessories",
//     rating: 4.6,
//     reviews: 170,
//     description:
//       "Simple handmade keychain — minimalistic, colorful, and soft to the touch.",
//     specs: {
//       material: "Cotton Yarn",
//       features: ["Vibrant Look", "Eco-Friendly Yarn"],
//     },
//     images: [
//       "https://res.cloudinary.com/dnvhetnud/image/upload/v1759901842/handmadecrochetkeychain_wgejwh.jpg",
//     ],
//     inStock: true,
//   },
//   {
//     id: 10,
//     name: "Custom Name Keychain",
//     price: 11.99,
//     category: "Accessories",
//     rating: 4.9,
//     reviews: 300,
//     description:
//       "Personalized name keychain handcrafted with love — makes your keys or bag extra special.",
//     specs: {
//       material: "Thread + Metal Hook",
//       features: ["Customizable Name", "Durable Build", "Gift Friendly"],
//     },
//     images: [
//       "https://res.cloudinary.com/dnvhetnud/image/upload/v1759901841/namekeychain_qztwil.jpg",
//     ],
//     inStock: true,
//     badge: "Personalized",
//   },
//   {
//     id: 11,
//     name: "Keychain (Classic Loop)",
//     price: 8.99,
//     category: "Accessories",
//     rating: 4.5,
//     reviews: 145,
//     description:
//       "Classic crochet keychain in a loop design — soft, stylish, and practical.",
//     specs: {
//       material: "Thread + Metal Keyring",
//       features: ["Loop Style", "Durable Stitch", "Eco Friendly"],
//     },
//     images: [
//       "https://res.cloudinary.com/dnvhetnud/image/upload/v1759901841/keychain_cnjl1q.jpg",
//     ],
//     inStock: true,
//   },
//   {
//     id: 12,
//     name: "Crochet Keychain (Round Design)",
//     price: 9.49,
//     category: "Accessories",
//     rating: 4.7,
//     reviews: 190,
//     description:
//       "Handcrafted round crochet keychain made with soft yarn. Great accessory or gift item.",
//     specs: {
//       material: "Soft Yarn + Steel Hook",
//       features: ["Round Shape", "Vibrant Colors"],
//     },
//     images: [
//       "https://res.cloudinary.com/dnvhetnud/image/upload/v1759901841/handmadecrochet_purse_ngzr7e.jpg",
//     ],
//     inStock: true,
//   },
// ];



// const productSlice = createSlice({
//   name: "products",
//   initialState: {
//     allProducts: products,
//     filtered: products.filter((p) => p.category === "Trending"),
//     currentCategory: "Trending",
//     selectedProduct: null,
//   },
//   reducers: {
//     filterByCategory: (state, action) => {
//       const category = action.payload;
//       state.filtered = state.allProducts.filter(
//         (p) => p.category.toLowerCase() === category.toLowerCase()
//       );
//       state.currentCategory = category;
//     },
//     selectProduct: (state, action) => {
//       state.selectedProduct = action.payload;
//     },
//     clearSelectedProduct: (state) => {
//       state.selectedProduct = null;
//     },
//   },
// });

// export const { filterByCategory, selectProduct, clearSelectedProduct } =
//   productSlice.actions;
// export default productSlice.reducer;

"use client";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// 🧩 Product Type Definitions
export interface ProductSpecs {
  material?: string;
  dimensions?: string;
  weight?: string;
  power?: string;
  features?: string[];
  color?: string;
}

export interface Product {
  _id?: string;
  id?: number;
  name: string;
  price: number;
  categories?: string[];
  category?: string;
  rating: number;
  reviews: number;
  description: string;
  specs: ProductSpecs;
  images: string[];
  inStock: boolean;
  badge?: string;
}

// 🔄 Async thunk for fetching products
export const fetchProducts = createAsyncThunk<
  { data: Product[]; category?: string },
  string | undefined,
  { rejectValue: string }
>(
  "products/fetchProducts",
  async (category, { rejectWithValue }) => {
    try {
      const baseUrl = "http://213.210.36.79:5000/api/products";
      const url = category
        ? `${baseUrl}?categories=${encodeURIComponent(category)}`
        : baseUrl;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data: Product[] = await response.json();
      return { data, category };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// 🧠 Redux State Type
interface ProductState {
  allProducts: Product[];
  filtered: Product[];
  currentCategory: string;
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
}

// 🧱 Initial State
const initialState: ProductState = {
  allProducts: [],
  filtered: [],
  currentCategory: "All",
  selectedProduct: null,
  loading: false,
  error: null,
};

// 🧩 Slice Definition
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    selectProduct: (state, action: PayloadAction<Product>) => {
      state.selectedProduct = action.payload;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.allProducts = action.payload.data;
        state.filtered = action.payload.data;
        state.currentCategory = action.payload.category || "All";
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load products";
      });
  },
});

export const { selectProduct, clearSelectedProduct } = productSlice.actions;
export default productSlice.reducer;
