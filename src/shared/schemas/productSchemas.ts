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
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.coerce.number().positive("Price must be a positive number"),
  image: imageSchema,
});

export type AddProduct = z.infer<typeof addProductSchema>;

export const updateProductSchema = z
  .object({
    title: z
      .string()
      .min(3, "Title must be at least 3 characters")
      .max(100, "Title must be less than 100 characters")
      .optional()
      .or(z.literal("")),

    description: z
      .string()
      .min(10, "Description must be at least 10 characters")
      .optional()
      .or(z.literal("")),

    price: z.coerce
      .number()
      .positive("Price must be a positive number")
      .optional(),

    image: imageSchema,
  })
  .refine(
    (data) => {
      const hasTitle = data.title && data.title.trim().length > 0;
      const hasDesc = data.description && data.description.trim().length > 0;
      const hasPrice = data.price !== undefined;
      const hasImage = data.image && data.image.length > 0;

      return hasTitle || hasDesc || hasPrice || hasImage;
    },
    {
      message: "At least one field must be updated with valid data",
      path: ["title"],
    },
  );

export type UpdateProduct = z.infer<typeof updateProductSchema>;
