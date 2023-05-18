import { setProfileData } from "@/app/slices/user.slice";
import { apiSlice } from "../api-slice";

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserInf: builder.query({
      query: () => ({
        url: "/api/Profile/get-user-profile",
        method: "GET",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setProfileData(data));
        } catch (error) {
          return;
        }
      },
      providesTags: ["User"],
    }),
    editUserProfile: builder.mutation({
      query: (body) => ({
        url: "/api/Profile/update-user-profile",
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["User"],
    }),

    addProfileImage: builder.mutation({
      query: (profilePhoto) => ({
        url: "/api/Profile/upload-image",
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
