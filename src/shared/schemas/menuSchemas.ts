import { z } from "zod";

export const menuSchema = z.object({
  _id: z.string(),
  title: z.string(),
  image: z.string().url(),
});

export const menuArraySchema = z.array(menuSchema);

export type Menu = z.infer<typeof menuSchema>;

export const addMenuSchema = z.object({
  title: z.string().min(1, "Title is required"),
  image: z.instanceof(File).refine((file) => file instanceof File, {
    message: "Image file is required",
  }),
});

export type AddMenu = z.infer<typeof addMenuSchema>;

export const updateMenuSchema = z.object({
  title: z.string().min(1).optional().nullable(),
  image: z.instanceof(File).optional().nullable(),
});

export type UpdateMenuForm = z.infer<typeof updateMenuSchema>;
