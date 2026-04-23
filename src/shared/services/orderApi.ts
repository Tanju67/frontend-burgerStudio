import {
  addressSchema,
  orderSchema,
  type AddressFormData,
  type CreateOrderResponse,
  type Order,
  type UpdateAddressResponse,
  type UpdateOrderStatus,
} from "../schemas/orderSchemas";
import { toaster } from "../utils/toaster";
import { baseApi } from "./baseApi";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query<Order[], void>({
      query: () => ({
        url: "/order",
        method: "GET",
      }),
      transformResponse: (response: { data: unknown }) => {
        const result = orderSchema.array().safeParse(response.data);

        if (!result.success) {
          console.error("Zod Validation Error:", result.error.format());
          return [];
        }
        return result.data;
      },

      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Order" as const, id: _id })),
              { type: "Order", id: "LIST" },
            ]
          : [{ type: "Order", id: "LIST" }],
    }),

    getMyAddress: builder.query<AddressFormData, void>({
      query: () => ({
        url: "/order/my-address",
        method: "GET",
      }),
      transformResponse: (response: { data: unknown }) => {
        const result = addressSchema.safeParse(response.data);

        if (!result.success) {
          console.error("Zod Validation Error:", result.error.format());
          throw new Error("Invalid address format received from server");
        }
        return result.data;
      },

      providesTags: ["Address"],
    }),

    getMyOrders: builder.query<Order[], void>({
      query: () => ({
        url: "/order/my-orders",
        method: "GET",
      }),
      transformResponse: (response: { data: unknown }) => {
        console.log(response);
        const result = orderSchema.array().safeParse(response.data);
        console.log(result, "result");

        if (!result.success) {
          console.error("Zod Validation Error:", result.error.format());
          return [];
        }
        return result.data;
      },

      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Order" as const, id: _id })),
              { type: "Order", id: "MY_LIST" },
            ]
          : [{ type: "Order", id: "MY_LIST" }],
    }),

    createOrder: builder.mutation<
      CreateOrderResponse,
      { product: string; price: number; amount: number }[]
    >({
      query: (orderItems) => ({
        url: "/order",
        method: "POST",
        body: { orderItems },
      }),
      invalidatesTags: [
        { type: "Order", id: "LIST" },
        { type: "Order", id: "MY_LIST" },
      ],
    }),

    updateOrderStatus: builder.mutation<
      Order,
      { id: string; status: UpdateOrderStatus }
    >({
      query: ({ id, status }) => ({
        url: `/order/${id}/status`,
        method: "PATCH",
        body: { status },
      }),

      async onQueryStarted({ id, status }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          orderApi.util.updateQueryData("getAllOrders", undefined, (draft) => {
            const order = draft.find((o: any) => o._id === id);
            if (order) {
              order.status = status.status;
            }
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          await new Promise((res) => setTimeout(res, 5000));
          patchResult.undo();
          toaster("error", "Failed to update order status! Changes reverted.");
        }
      },

      invalidatesTags: (_result, error, { id }) => {
        if (error) return [];
        return [
          { type: "Order", id },
          { type: "Order", id: "LIST" },
        ];
      },
    }),

    updateAddress: builder.mutation<
      UpdateAddressResponse,
      {
        data: {
          street: string;
          houseNumber: string;
          postalCode: string;
          city: string;
          phoneNumber: string;
        };
      }
    >({
      query: (data) => ({
        url: "/order/address",
        method: "PATCH",
        body: data.data,
      }),
      invalidatesTags: ["Address"],
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetMyOrdersQuery,
  useCreateOrderMutation,
  useUpdateOrderStatusMutation,
  useUpdateAddressMutation,
  useGetMyAddressQuery,
} = orderApi;
