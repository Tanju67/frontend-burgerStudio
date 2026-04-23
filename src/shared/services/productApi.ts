import { productSchema, type Product } from "../schemas/productSchemas";
import { toaster } from "../utils/toaster";
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

    updateProduct: builder.mutation<
      Product,
      { id: string; menuId: string; data: FormData }
    >({
      query: ({ id, data }) => ({
        url: `/product/${id}`,
        method: "PATCH",
        body: data,
      }),

      async onQueryStarted({ id, menuId, data }, { dispatch, queryFulfilled }) {
        const updatedValues: any = {};
        data.forEach((value, key) => {
          if (value instanceof File) {
            updatedValues[key] = URL.createObjectURL(value);
          } else {
            updatedValues[key] = value;
          }
        });

        const patchResult = dispatch(
          productApi.util.updateQueryData(
            "getProductsByMenu",
            menuId,
            (draft) => {
              const product = draft.find((p: any) => p._id === id);
              if (product) {
                Object.assign(product, updatedValues);
              }
            },
          ),
        );

        try {
          await queryFulfilled;
          if (updatedValues.image) URL.revokeObjectURL(updatedValues.image);
        } catch {
          // await new Promise((res) => setTimeout(res, 5000));
          patchResult.undo();
          toaster("error", "Product update failed! Changes reverted.");
        }
      },

      invalidatesTags: (_result, error, { id }) => {
        if (error) return [];
        return [
          { type: "Product", id },
          { type: "Product", id: "PARTIAL_LIST" },
        ];
      },
    }),

    deleteProduct: builder.mutation<
      void,
      { productId: string; menuId: string }
    >({
      query: ({ productId }) => ({
        url: `/product/${productId}`,
        method: "DELETE",
      }),

      async onQueryStarted(
        { productId, menuId },
        { dispatch, queryFulfilled },
      ) {
        const patchResult = dispatch(
          productApi.util.updateQueryData(
            "getProductsByMenu",
            menuId,
            (draft) => {
              return draft.filter((product: any) => product._id !== productId);
            },
          ),
        );

        try {
          await queryFulfilled;
        } catch {
          // await new Promise((res) => setTimeout(res, 5000));
          patchResult.undo();
          toaster(
            "error",
            "The product could not be deleted. Changes reverted.",
          );
        }
      },

      // 3. Tag Invalidation yönetimi
      invalidatesTags: (_result, error, { productId }) => {
        if (error) return [];
        return [{ type: "Product", id: productId }];
      },
    }),
  }),
});

export const {
  useGetProductsByMenuQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
