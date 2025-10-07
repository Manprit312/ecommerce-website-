"use client";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productReducer from "./features/productSlice";
import cartReducer from "./features/cartSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// ✅ Combine reducers properly (no extra key)
const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
});

// ✅ Persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"], // only persist cart (remove favorites if not defined)
};

// ✅ Apply persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

// ✅ Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// ✅ Create persistor
export const persistor = persistStore(store);
