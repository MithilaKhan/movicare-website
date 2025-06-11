import { GetLocalStorage } from "@/util/LocalStroage";
import { baseApi } from "../../base/baseApi";

export type UserType = {
  _id: string;
  name: string;
  role: string;
  email: string;
  password: string;
  image: string;
  status: string;
  verified: boolean; 
  contact ?: string
};
const resetToken = GetLocalStorage("resetToken")

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({

    registerUser: build.mutation({
      query: (data) => ({
        url: "/auth/signup",
        method: "POST",
        body: data,
      }),
    }),

    loginUser: build.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),

    // google Login  
    googleLogin: build.mutation({
      query: () => ({
        url: "/auth/google",
        method: "GET",
      }),
    }),

    verifyEmail: build.mutation({
      query: (data) => ({
        url: "/auth/verify-email",
        method: "POST",
        body: data,
      }),
    }),

    forgetPassword: build.mutation({
      query: (data) => ({
        url: "/auth/forget-password",
        method: "POST",
        body: data,
      }),
    }),

    resetPassword: build.mutation({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
        headers: {
          authorization: `${resetToken}`,
        },
      }),
    }),

    changePassword: build.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        body: data,
      }),
    }),

    getProfile: build.query({
      query: () => ({
        url: "/user/profile",
      }),
      transformResponse: (res: { data: UserType }) => res.data,
    }), 

    updateProfile: build.mutation({
      query: (data) => ({
        url: "/user/profile",
        method: "PATCH",
        body: data,
      }),
    }),

  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useChangePasswordMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useVerifyEmailMutation,
  useGoogleLoginMutation,
  useGetProfileQuery ,
  useUpdateProfileMutation
} = authApi;