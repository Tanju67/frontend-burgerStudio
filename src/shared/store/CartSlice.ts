import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from ".";
import type { Product } from "../schemas/productSchemas";

interface CartState {
  activeCart: number;
  cartModal: boolean;
  selectedProduct: Product | null;
  cartData: (Product & { amount: number })[];
}

const savedCartData = localStorage.getItem("cartData");

const initialState: CartState = {
  activeCart: 0,
  cartModal: false,
  selectedProduct: null,
  cartData: savedCartData ? JSON.parse(savedCartData) : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartModal: (state, action: PayloadAction<boolean>) => {
      state.cartModal = action.payload;
    },

    setActiveCart: (state, action: PayloadAction<number>) => {
      state.activeCart = action.payload;
    },

    setProduct: (state, action: PayloadAction<Product>) => {
      state.selectedProduct = action.payload;
    },

    addToCart: (state, action: PayloadAction<Product & { amount: number }>) => {
      const item = action.payload;
      const existing = state.cartData.find((p) => p._id === item._id);

      if (existing) {
        existing.amount += item.amount;
      } else {
        state.cartData.push({
          ...item,
        });
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      const existing = state.cartData.find((p) => p._id === action.payload);
      if (existing?.amount === 1) {
        state.cartData = state.cartData.filter((p) => p._id !== action.payload);
      } else {
        if (existing) {
          existing.amount -= 1;
        }
      }
    },

    clearCart: (state) => {
      state.cartData = [];
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;

export const selectTotalPrice = (state: RootState) =>
  state.cart.cartData.reduce((acc, item) => acc + item.price * item.amount, 0);
