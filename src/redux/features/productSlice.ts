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
    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/products`;
    const url = category
      ? `${baseUrl}?categories=${encodeURIComponent(category)}`
      : baseUrl;

    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch products");

    const data: Product[] = await response.json();

    console.log("📦 Products fetched for category:", category || "All", data.length);

    return { data, category };
  } catch (error: any) {
    console.error("❌ Product fetch error:", error);
    return rejectWithValue(error.message || "Unexpected error occurred");
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
  lastFetchedCategory: string | null; // 👈 Added to prevent duplicate calls
}

// 🧱 Initial State
const initialState: ProductState = {
  allProducts: [],
  filtered: [],
  currentCategory: "All",
  selectedProduct: null,
  loading: false,
  error: null,
  lastFetchedCategory: null,
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
      .addCase(fetchProducts.pending, (state, action) => {
        // 🛑 Avoid clearing old data if same category is re-fetched
        const category = action.meta.arg;
        if (state.lastFetchedCategory !== category) {
          state.loading = true;
          state.error = null;
        }
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.allProducts = action.payload.data;
        state.filtered = action.payload.data;
        state.currentCategory = action.payload.category || "All";
        state.lastFetchedCategory = action.payload.category || "All";
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load products";
      });
  },
});

export const { selectProduct, clearSelectedProduct } = productSlice.actions;
export default productSlice.reducer;
