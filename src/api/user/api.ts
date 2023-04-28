import { apiSlice } from "../api-slice";

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserInf: builder.query({
      query: () => ({
        url: "/api/ClientProfile/get-user-profile",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    editUserProfile: builder.mutation({
      query: (body) => ({
        url: "/api/ClientProfile/update-user-profile",
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["User"],
    }),

    addProfileImage: builder.mutation({
      query: (profilePhoto) => ({
        url: "/api/ClientProfile/upload-image",
        method: "POST",
        body: profilePhoto,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUserInfQuery,
  useEditUserProfileMutation,
  useAddProfileImageMutation,
} = extendedApi;
