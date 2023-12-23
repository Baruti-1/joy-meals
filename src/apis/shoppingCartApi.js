import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const shoppingCartApi = createApi({
  reducerPath: 'shoppingCartApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://redmangoapi.azurewebsites.net/api/',
  }),
  tageTypes: ['shoppingCarts'],
  endpoints: (builder) => ({
    getShoppingCart: builder.query({
      query: (userId) => ({
        url: `shoppingcart`,
        params: {
          userId,
        },
      }),
      providesTags: ['ShoppingCarts'],
    }),
    updateShoppingCart: builder.mutation({
      query: ({ menuItemId, updateQuantityBy, userId }) => ({
        url: 'shoppingcart',
        method: 'POST',
        //mode: 'no-cors',
        params: {
          menuItemId,
          updateQuantityBy,
          userId,
        },
      }),
      invalidatesTags: ['ShoppingCarts'],
    }),
  }),
});

export const { useGetShoppingCartQuery, useUpdateShoppingCartMutation } =
  shoppingCartApi;
export default shoppingCartApi;
