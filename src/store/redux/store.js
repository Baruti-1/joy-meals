import { configureStore } from '@reduxjs/toolkit';
import { menuItemReducer } from './menuItemSlice';
import { shoppingCartReducer } from './shoppingCartSlice';
import { authApi, menuItemApi, shoppingCartApi } from '../../apis';
import { userAuthReducer } from './userAuthSlice';

const store = configureStore({
  reducer: {
    menuItemStore: menuItemReducer,
    shoppingCartStore: shoppingCartReducer,
    userAuthStore: userAuthReducer,
    [menuItemApi.reducerPath]: menuItemApi.reducer,
    [shoppingCartApi.reducerPath]: shoppingCartApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(menuItemApi.middleware)
      .concat(authApi.middleware)
      .concat(shoppingCartApi.middleware),
});

export default store;
