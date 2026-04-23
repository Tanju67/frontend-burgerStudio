import { data } from "react-router-dom";
import {
  menuSchema,
  type AddMenu,
  type Menu,
  type UpdateMenuForm,
} from "../schemas/menuSchemas";
import { baseApi } from "./baseApi";
import { toaster } from "../utils/toaster";

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

      async onQueryStarted({ id, data }, { dispatch, queryFulfilled }) {
        const updatedValues: any = {};
        data.forEach((value, key) => {
          if (value instanceof File) {
            updatedValues[key] = URL.createObjectURL(value);
          } else {
            updatedValues[key] = value;
          }
        });
        const patchResult = dispatch(
          menuApi.util.updateQueryData("getMenus", undefined, (draft) => {
            const menu = draft.find((m: any) => m._id === id);

            if (menu) {
              if (updatedValues.title) menu.title = updatedValues.title;
              if (updatedValues.image) menu.image = updatedValues.image;
            }
          }),
        );
        try {
          await queryFulfilled;
          if (updatedValues.image) URL.revokeObjectURL(updatedValues.image);
        } catch {
          // await new Promise((res) => setTimeout(res, 5000));
          patchResult.undo();
          toaster("error", "Menu update failed!");
        }
      },
      invalidatesTags: (_result, error, { id }) => {
        if (error) return [];
        return [
          { type: "Menu", id },
          { type: "Menu", id: "LIST" },
        ];
      },
    }),

    deleteMenu: builder.mutation({
      query: (id) => ({
        url: `/menu/${id}`,
        method: "DELETE",
      }),

      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          menuApi.util.updateQueryData("getMenus", undefined, (draft) => {
            return draft.filter((menu) => menu._id !== id);
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          await new Promise((res) => setTimeout(res, 5000));
          patchResult.undo();
          toaster("error", "Menu delete failed!");
        }
      },
      invalidatesTags: (_result, error, { id }) => {
        if (error) return [];
        return [
          { type: "Menu", id },
          { type: "Menu", id: "LIST" },
        ];
      },
    }),
  }),
});

export const {
  useGetMenusQuery,
  useCreateMenuMutation,
  useUpdateMenuMutation,
  useDeleteMenuMutation,
} = menuApi;
