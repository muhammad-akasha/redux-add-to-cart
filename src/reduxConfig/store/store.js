import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web
import cartReducer from "../reducers/cartSlice";
import { combineReducers } from "redux";

// Configure persistence
const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  carts: cartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
