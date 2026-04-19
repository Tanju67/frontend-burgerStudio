import { z } from "zod";

export const menuSchema = z.object({
  _id: z.string(),
  title: z.string(),
  image: z.string().url(),
});

export const menuArraySchema = z.array(menuSchema);

export type Menu = z.infer<typeof menuSchema>;

const fileSchema = z.any().refine((file) => {
  if (!file) return false;
  return file instanceof File || (file instanceof FileList && file.length > 0);
}, "Image file is required");

export const addMenuSchema = z.object({
  title: z.string().min(1, "Title is required"),
  image: fileSchema,
});

export type AddMenu = z.infer<typeof addMenuSchema>;

export const updateMenuSchema = z
  .object({
    title: z
      .string()
      .min(1, "Title cannot be empty")
      .optional()
      .or(z.literal("")),
    image: z.any().optional(),
  })
  .refine((data) => data.title || (data.image && data.image.length > 0), {
    message: "You must provide either a new title or a new image",
    path: ["image"],
  });

export type UpdateMenuForm = z.infer<typeof updateMenuSchema>;
