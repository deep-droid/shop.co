import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../../data/products";
import type { RootState } from "../../app/store";

export type CartItem = {
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
};

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

type AddToCartPayload = {
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<AddToCartPayload>) => {
      const { product, selectedColor, selectedSize, quantity } = action.payload;

      const existingItem = state.items.find(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          product,
          selectedColor,
          selectedSize,
          quantity,
        });
      }

    },

    // Remove exact variant (product + color + size)
    removeFromCart: (
      state,
      action: PayloadAction<{
        productId: number;
        selectedColor: string;
        selectedSize: string;
      }>
    ) => {
      const { productId, selectedColor, selectedSize } = action.payload;

      state.items = state.items.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedColor === selectedColor &&
            item.selectedSize === selectedSize
          )
      );
    },

    // Update quantity for exact variant
    updateQuantity: (
      state,
      action: PayloadAction<{
        productId: number;
        selectedColor: string;
        selectedSize: string;
        quantity: number;
      }>
    ) => {
      const { productId, selectedColor, selectedSize, quantity } =
        action.payload;

      const item = state.items.find(
        (i) =>
          i.product.id === productId &&
          i.selectedColor === selectedColor &&
          i.selectedSize === selectedSize
      );

      if (item && quantity > 0) {
        item.quantity = quantity;
      }
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;

// Selectors

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartTotalItems = (state: RootState) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const selectCartSubtotal = (state: RootState) =>
  state.cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );