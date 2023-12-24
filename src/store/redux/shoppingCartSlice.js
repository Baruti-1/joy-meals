import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
};

export const shoppingCartSlice = createSlice({
  name: 'CartItems',
  initialState,
  reducers: {
    setShoppingCart: (state, action) => {
      state.cartItems = action.payload;
    },
    updateQuantity: (state, action) => {
      state.cartItems = state.cartItems.map((items) => {
        if (items.id === action.payload.cartItem.id) {
          items.quantity = action.payload.quantity;
        }
        return item;
      });
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((items) => {
        if (items.id === action.payload.cartItem.id) {
          return null;
        }
        return item;
      });
    },
  },
});

export const { setShoppingCart } = shoppingCartSlice.actions;
export const shoppingCartReducer = shoppingCartSlice.reducer;
