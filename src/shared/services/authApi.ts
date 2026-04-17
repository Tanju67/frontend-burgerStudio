import type {
  AuthUser,
  LoginFormData,
  RegisterFormData,
} from "../schemas/authSchemas";
import type { LoginResponse, RegisterResponse } from "../types/types";
import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponse, RegisterFormData>({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),

    login: builder.mutation<LoginResponse, LoginFormData>({
      query: (userData) => ({
        url: "/auth/login",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),

    getCurrentUser: builder.query<AuthUser, void>({
      query: () => "/auth/current",
      providesTags: ["User"],
      transformResponse: (response: { data: AuthUser }) => response.data,
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useGetCurrentUserQuery } =
  authApi;
