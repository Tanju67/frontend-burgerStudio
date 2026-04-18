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
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Menu" as const, id: _id })),
              { type: "Menu", id: "LIST" },
            ]
          : [{ type: "Menu", id: "LIST" }],
    }),

    createMenu: builder.mutation<AddMenu, FormData>({
      query: (formData) => ({
        url: "/menu",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "Menu", id: "LIST" }],
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
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Menu", id },
        { type: "Menu", id: "LIST" },
      ],
    }),

    deleteMenu: builder.mutation({
      query: (id) => ({
        url: `/menu/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Menu", id },
        { type: "Menu", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetMenusQuery,
  useCreateMenuMutation,
  useUpdateMenuMutation,
  useDeleteMenuMutation,
} = menuApi;
