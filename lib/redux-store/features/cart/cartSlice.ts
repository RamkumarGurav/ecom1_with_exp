import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ICartItem {
  _id: string;
  name: string;
  price: number;
}

export interface ICart {
  cartItems: ICartItem[]; // Define cartItems as an array of ICartItem
}

const initialState: ICart = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addSingleItemToCart: (state, action: PayloadAction<any>) => {
      state.cartItems.push({
        _id: action.payload._id,
        name: action.payload.name,
        price: action.payload.price,
      });
    },
    addMultipleItemsToCart: (state, action: PayloadAction<any>) => {
      action.payload.map((item: any) => {
        state.cartItems.push({
          _id: item._id,
          name: item.name,
          price: item.price,
        });
      });
    },
    removeSingleItemFromCart: (state, action: PayloadAction<any>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
    },
  },
});

export const { addSingleItemToCart, removeSingleItemFromCart } =
  cartSlice.actions;
export const cartReducer = cartSlice.reducer;
