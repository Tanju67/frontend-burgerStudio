import {
  addressSchema,
  orderSchema,
  type AddressFormData,
  type CreateOrderResponse,
  type Order,
  type UpdateAddressResponse,
} from "../schemas/orderSchemas";
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

    updateOrderStatus: builder.mutation<Order, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: `/order/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Order", id },
        { type: "Order", id: "LIST" },
        { type: "Order", id: "MY_LIST" },
      ],
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
