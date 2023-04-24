import { apiSlice } from "../api-slice";

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCartBook: builder.query({
      query: () => ({
        url: "/api/Carts/get-cart-items",
        method: "GET",
      }),
    }),
    addToCart: builder.mutation({
      query: ({ BookId, Amount }) => ({
        url: `/api/Carts/add-to-cart?BookId=${BookId}&Amount=${Amount}`,
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
    removeFromCart: builder.mutation<any, { bookId: number }>({
      query: ({ bookId }) => ({
        url: `/api/Carts/remove-item-from-cart/${bookId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAddToCartMutation,
  useGetCartBookQuery,
  useRemoveFromCartMutation,
} = extendedApi;
