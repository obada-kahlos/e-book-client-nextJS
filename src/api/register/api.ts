import { apiSlice } from "../api-slice";

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
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
    refreshToken: builder.query({
      query: () => ({
        url: "/api/Accounts/RefershToken/refreshToken",
        method: "Get",
      }),
      providesTags: ["Auth"],
    }),
  }),
});

export const { useSignUpMutation, useLoginMutation, useRefreshTokenQuery } =
  extendedApi;
