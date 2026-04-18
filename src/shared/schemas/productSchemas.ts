import { z } from "zod";

export const productSchema = z.object({
  _id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  price: z.number(),
  image: z.string().url().optional(),
  menu: z.union([
    z.string(),
    z.object({ _id: z.string(), title: z.string() }).passthrough(),
  ]),
  amount: z.number().optional(),
});

export type Product = z.infer<typeof productSchema>;

export const addProductSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(0.01, "Price is required"),
  image: z.instanceof(File).optional().nullable(),
});

export type AddProduct = z.infer<typeof addProductSchema>;

export const updateProductSchema = z.object({
  title: z.string().min(1).optional().nullable(),
  description: z.string().min(1).optional().nullable(),
  price: z.number().min(0.01).optional().nullable(),
  image: z.instanceof(File).optional().nullable(),
});

export type UpdateProduct = z.infer<typeof updateProductSchema>;
