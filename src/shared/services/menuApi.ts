import type { Menu } from "../schemas/menuSchemas";
import { baseApi } from "./baseApi";

export const menuApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMenus: builder.query<Menu[], void>({
      query: () => ({
        url: "/menu",
        method: "GET",
      }),
      transformResponse: (response: { data: Menu[] }) => response.data,
      providesTags: ["Menu"],
    }),
  }),
});

export const { useGetMenusQuery } = menuApi;
