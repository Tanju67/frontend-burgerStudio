import { z } from "zod";
import { productSchema } from "./productSchemas";

export const orderStatusEnum = z.enum([
  "preparing",
  "out_for_delivery",
  "delivered",
  "cancelled",
]);

export const updateOrderStatusSchema = z.object({
  status: orderStatusEnum,
});

export type UpdateOrderStatus = z.infer<typeof updateOrderStatusSchema>;

export const orderItemSchema = z.object({
  product: productSchema,
  amount: z.number().min(1),
  price: z.number().min(1),
  _id: z.string(),
});

export type OrderItem = z.infer<typeof orderItemSchema>;

export const customerSchema = z.object({
  _id: z.string(),
  fullName: z.string(),
  phoneNumber: z.string(),
  street: z.string(),
  houseNumber: z.string(),
  city: z.string(),
  postalCode: z.string(),
});

export const orderSchema = z.object({
  _id: z.string(),
  customerId: customerSchema,
  orderItems: z.array(orderItemSchema),
  status: orderStatusEnum,
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const ordersSchema = z.array(orderSchema);

export type Order = z.infer<typeof orderSchema>;

export type CreateOrderResponse = {
  success: boolean;
  data: Order;
};

export const addressSchema = z.object({
  street: z.string().min(2, "Street must be at least 2 characters"),
  houseNumber: z.string().min(1, "House number is required"),
  city: z.string().min(2, "City must be at least 2 characters"),
  postalCode: z.string().min(4, "Postal code must be at least 4 characters"),
  phoneNumber: z.string().min(6, "Phone number is required"),
});

export type AddressFormData = z.infer<typeof addressSchema>;

export type UpdateAddressResponse = {
  success: boolean;
  data: AddressFormData;
};
