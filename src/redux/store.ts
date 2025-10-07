"use client";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./features/userSlice"; // ✅ new import

import productReducer from "./features/productSlice";
import cartReducer from "./features/cartSlice";
// import favoriteReducer from "./features/favoriteSlice";

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  user: userReducer
  // favorites: favoriteReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "favorites","user"],
  
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

// ✅ Export types for useSelector & useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
