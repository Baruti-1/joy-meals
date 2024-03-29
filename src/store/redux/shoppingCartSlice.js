import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
};

export const shoppingCartSlice = createSlice({
  name: 'cartItems',
  initialState,
  reducers: {
    setShoppingCart: (state, action) => {
      state.cartItems = action.payload;
    },

    updateQuantity: (state, action) => {
      state.cartItems = state.cartItems.map((item) => {
        if (item.id === action.payload.cartItem.id) {
          item.quantity = action.payload.quantity;
        }
        return item;
      });
    },

    emptyCart: (state) => {
      state.cartItems = [];
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => {
        if (item.id === action.payload.cartItem.id) {
          return null;
        }
        return item;
      });
    },
  },
});

export const { setShoppingCart, updateQuantity, removeFromCart, emptyCart } =
  shoppingCartSlice.actions;
export const shoppingCartReducer = shoppingCartSlice.reducer;
