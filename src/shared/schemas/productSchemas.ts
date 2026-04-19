import { z } from "zod";

export const productSchema = z.object({
  _id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  price: z.number(),
  image: z.string().url().optional(),
  menu: z.union([
    z.string(),
    z.object({ _id: z.string(), title: z.string() }).passthrough().optional(),
  ]),
  amount: z.number().optional(),
});

export type Product = z.infer<typeof productSchema>;

const imageSchema = z
  .any()
  .optional()
  .refine((files) => {
    if (!files || files.length === 0) return true;
    return files[0] instanceof File;
  }, "Invalid file format");

export const addProductSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().min(0.01, "Price must be greater than 0"),
  image: imageSchema,
});

export type AddProduct = z.infer<typeof addProductSchema>;

export const updateProductSchema = z
  .object({
    title: z
      .string()
      .min(1, "Title cannot be empty")
      .optional()
      .or(z.literal("")),
    description: z
      .string()
      .min(1, "Description cannot be empty")
      .optional()
      .or(z.literal("")),
    price: z.coerce
      .number()
      .min(0.01, "Price must be greater than 0")
      .optional(),
    image: imageSchema,
  })
  .refine(
    (data) =>
      data.title ||
      data.description ||
      data.price ||
      (data.image && data.image.length > 0),
    {
      message: "At least one field must be updated",
      path: ["title"],
    },
  );

export type UpdateProduct = z.infer<typeof updateProductSchema>;
