import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    carts: cartReducer,
  },
});

import cartReducer from "./reducer/cartSlice";
