import { RootState } from "@/app";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  tagTypes: ["Books", "Auth", "User"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7146",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", token ? `Bearer ${token}` : "");
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});
