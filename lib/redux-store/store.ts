"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { persistReducer } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { authReducer } from "./features/auth/authSlice";
import { cartReducer } from "./features/cart/cartSlice";

const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: number) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const authPersistConfig = {
  key: "auth",
  storage: storage,
  whitelist: ["isLoggedIn", "name", "session", "image", "role"],
};
const cartPersistConfig = {
  key: "cart",
  storage: storage,
  whitelist: ["cartItems"],
};

const persistedAuthReducer: any = persistReducer(
  authPersistConfig,
  authReducer
);
const persistedCartReducer: any = persistReducer(
  cartPersistConfig,
  cartReducer
);

const rootReducer: any = combineReducers({
  auth: persistedAuthReducer,
  cart: persistedCartReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

//--hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
