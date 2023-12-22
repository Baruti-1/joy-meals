import { configureStore } from '@reduxjs/toolkit';
import { menuItemReducer } from './menuItemSlice';
import { menuItemApi } from '../../apis';

const store = configureStore({
  reducer: {
    menuItemStore: menuItemReducer,
    [menuItemApi.reducerPath]: menuItemApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(menuItemApi.middleware),
});

export default store;
