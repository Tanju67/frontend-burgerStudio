import { menuSchema, type Menu } from "../schemas/menuSchemas";
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
  }),
});

export const { useGetMenusQuery } = menuApi;
