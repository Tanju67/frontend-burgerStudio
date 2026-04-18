import { productSchema, type Product } from "../schemas/productSchemas";
import { baseApi } from "./baseApi";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProductsByMenu: builder.query<Product[], string>({
      query: (menuId: string) => ({
        url: "/product/menu/" + menuId,
        method: "GET",
      }),
      transformResponse: (response: { data: unknown }) => {
        const result = productSchema.array().safeParse(response.data);
        if (!result.success) {
          console.error("Product Validation Error:", result.error.format());
          return [];
        }
        return result.data;
      },
      providesTags: (result, _error, menuId) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: "Product" as const,
                id: _id,
              })),
              { type: "Product", id: `LIST_${menuId}` },
            ]
          : [{ type: "Product", id: `LIST_${menuId}` }],
    }),

    createProduct: builder.mutation<
      Product,
      { menuId: string; data: FormData }
    >({
      query: ({ menuId, data }) => ({
        url: `/product/${menuId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (_result, _error, { menuId }) => [
        { type: "Product", id: `LIST_${menuId}` },
      ],
    }),

    updateProduct: builder.mutation<Product, { id: string; data: FormData }>({
      query: ({ id, data }) => ({
        url: `/product/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Product", id: id },
        { type: "Product", id: "PARTIAL_LIST" },
      ],
    }),

    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Product", id: id },
        { type: "Product", id: "PARTIAL_LIST" },
      ],
    }),
  }),
});

export const {
  useGetProductsByMenuQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
