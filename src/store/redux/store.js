import { configureStore } from '@reduxjs/toolkit';
import { menuItemReducer } from './menuItemSlice';
import { menuItemApi, shoppingCartApi } from '../../apis';

const store = configureStore({
  reducer: {
    menuItemStore: menuItemReducer,
    [menuItemApi.reducerPath]: menuItemApi.reducer,
    [shoppingCartApi.reducerPath]: shoppingCartApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(menuItemApi.middleware)
      .concat(shoppingCartApi.middleware),
});

export default store;
