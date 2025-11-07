

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// 🔹 Product & Cart types
export interface CartItem {
  _id: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
  shippingCharge?: number;
}

export interface CartState {
  items: CartItem[];
  totalAmount: number;
  totalQuantity: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// -------------------- 🧠 BACKEND SYNC ACTIONS --------------------

// ✅ Add to Cart (backend)
export const addToCartBackend = createAsyncThunk(
  "cart/addToCartBackend",
  async (
    { uid, product }: { uid: string; product: CartItem },
    { rejectWithValue }
  ) => {
    try {
      console.log("🚀 [Thunk Triggered] addToCartBackend called with:", { uid, product });

      const url = `${API_URL}/api/users/cart/add`;
      console.log("🌐 [Fetch URL]:", url);

   const body = JSON.stringify({
  uid,
  productId: product._id,
  quantity: product.quantity,
  image: product.image,
  shippingCharge: product.shippingCharge || 0,  // ✅ include shippingCharge
});


      console.log("📦 [Request Body]:", body);

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });

      console.log("✅ [Response Status]:", res.status);
      const data = await res.json();
      console.log("📨 [Response Data]:", data);

      if (!res.ok) throw new Error(data.message || "Failed to add to cart");
      return data.cart;
    } catch (err: any) {
      console.error("❌ [addToCartBackend Error]:", err.message);
      return rejectWithValue(err.message);
    }
  }
);

// ✅ Remove from Cart (backend)
export const removeFromCartBackend = createAsyncThunk(
  "cart/removeFromCartBackend",
  async (
    { uid, productId, removeAll = false, }: { uid: string; productId: string,removeAll?: boolean; },
    { rejectWithValue }
  ) => {

    try {
      console.log("REQ BODY:", { uid, productId, removeAll });

      const res = await fetch(`${API_URL}/api/users/cart/remove`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid, productId ,removeAll}),
      });

      const data = await res.json();
      console.log(data)
            if (!res.ok) throw new Error(data.message || data);
      return data.cart;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);
// ✅ Fetch User Cart (backend)
export const getUserCart = createAsyncThunk(
  "cart/getUserCart",
  async (uid: string, { rejectWithValue }) => {

    try {
    
      const res = await fetch(`${API_URL}/api/users/cart/${uid}`);
      const data = await res.json();
      console.log(data)
      if (!res.ok) throw new Error(data.message || "Failed to fetch cart");
      return data.cart;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// ✅ Clear Cart (backend)
export const clearCartBackend = createAsyncThunk(
  "cart/clearCartBackend",
  async ({ uid }: { uid: string }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/api/users/cart/clear`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to clear cart");
      return data.cart;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// -------------------- 🛍️ INITIAL STATE --------------------

const initialState: CartState = {
  items: [],
  totalAmount: 0,
  totalQuantity: 0,
  status: "idle",
  error: null,
};

// -------------------- 🧩 CART SLICE --------------------

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // 🔹 Local cart (for unlogged users)
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      const existing = state.items.find((i) => i._id === item._id);
   
  const qtyToAdd = item.quantity || 1; // ✅ Use passed quantity, default 1

  if (existing) {
    existing.quantity += qtyToAdd;
  } else {
    state.items.push({ ...item, quantity: qtyToAdd });
  }

  state.totalQuantity += qtyToAdd;
  state.totalAmount += item.price * qtyToAdd;
    },

   removeFromCart: (state, action: PayloadAction<string>) => {
  const _id = action.payload;
  const existing = state.items.find((i) => i._id === _id);
  if (!existing) return;

  if (existing.quantity > 1) {
    // ➖ Decrease quantity by 1
    existing.quantity -= 1;
    state.totalQuantity -= 1;
    state.totalAmount -= existing.price;
  } else {
    // 🚮 Remove item completely
    state.totalQuantity -= 1;
    state.totalAmount -= existing.price;
    state.items = state.items.filter((i) => i._id !== _id);
  }
},


    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
    },
  },

extraReducers: (builder) => {
  builder
    // ✅ Add to Cart (backend)
    .addCase(addToCartBackend.pending, (state) => {
      state.status = "loading";
    })
    .addCase(addToCartBackend.fulfilled, (state, action) => {
      state.status = "succeeded";
      const cart = action.payload;
      state.items = cart?.items || [];
      state.totalQuantity = cart?.totalCount || 0;
     state.totalAmount = state.items.reduce(
  (sum, i) => sum + (i.price * i.quantity) + (i.shippingCharge || 0),
  0
);
    })
    .addCase(addToCartBackend.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload as string;
    })

    // ✅ Get User Cart
    .addCase(getUserCart.pending, (state) => {
      state.status = "loading";
    })
    .addCase(getUserCart.fulfilled, (state, action) => {
      state.status = "succeeded";
      const cart = action.payload;
      state.items = cart?.items || [];
      state.totalQuantity = cart?.totalCount || 0;
     state.totalAmount = state.items.reduce(
  (sum, i) => sum + (i.price * i.quantity) + (i.shippingCharge || 0),
  0
);
    })
    .addCase(getUserCart.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload as string;
    })

    // ✅ Remove from Cart (backend)
    .addCase(removeFromCartBackend.fulfilled, (state, action) => {
      const cart = action.payload;
      state.items = cart?.items || [];
      state.totalQuantity = cart?.totalCount || 0;
     state.totalAmount = state.items.reduce(
  (sum, i) => sum + (i.price * i.quantity) + (i.shippingCharge || 0),
  0
);
    })

    // ✅ Clear Cart (backend)
    .addCase(clearCartBackend.fulfilled, (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    });
}

});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
