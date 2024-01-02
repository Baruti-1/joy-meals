import { configureStore } from '@reduxjs/toolkit';
import { menuItemReducer } from './menuItemSlice';
import { shoppingCartReducer } from './shoppingCartSlice';
import {
  authApi,
  menuItemApi,
  shoppingCartApi,
  paymentApi,
  orderApi,
} from '../../apis';
import { userAuthReducer } from './userAuthSlice';

const store = configureStore({
  reducer: {
    menuItemStore: menuItemReducer,
    shoppingCartStore: shoppingCartReducer,
    userAuthStore: userAuthReducer,
    [menuItemApi.reducerPath]: menuItemApi.reducer,
    [shoppingCartApi.reducerPath]: shoppingCartApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(menuItemApi.middleware)
      .concat(authApi.middleware)
      .concat(paymentApi.middleware)
      .concat(orderApi.middleware)
      .concat(shoppingCartApi.middleware),
});

export default store;
