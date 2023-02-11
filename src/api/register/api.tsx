import { apiSlice } from "../api-slice";

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sginUp: builder.mutation({
      query: (body) => ({
        url: "/api/Accounts/Register/register",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Auth"],
    }),
    login: builder.mutation({
      query: (body) => ({
        url: "/api/Accounts/Login/login",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const { useSginUpMutation, useLoginMutation } = extendedApi;
