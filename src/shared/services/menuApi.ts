import {
  menuSchema,
  type AddMenu,
  type Menu,
  type UpdateMenuForm,
} from "../schemas/menuSchemas";
import { baseApi } from "./baseApi";

export const menuApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMenus: builder.query<Menu[], void>({
      query: () => ({
        url: "/menu",
        method: "GET",
      }),
      transformResponse: (response: { data: unknown }) => {
        // safeParse ile kontrol ediyoruz
        const result = menuSchema.array().safeParse(response.data);

        if (!result.success) {
          console.error("Zod Validation Error:", result.error.format());
          return [];
        }
        return result.data;
      },
      providesTags: ["Menu"],
    }),

    createMenu: builder.mutation<AddMenu, FormData>({
      query: (formData) => ({
        url: "/menu",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Menu"],
    }),

    updateMenu: builder.mutation<
      UpdateMenuForm,
      { id: string; data: FormData }
    >({
      query: ({ id, data: formData }) => ({
        url: `/menu/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Menu"],
    }),

    deleteMenu: builder.mutation({
      query: (id) => ({
        url: `/menu/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Menu"],
    }),
  }),
});

export const {
  useGetMenusQuery,
  useCreateMenuMutation,
  useUpdateMenuMutation,
  useDeleteMenuMutation,
} = menuApi;
