import { z } from "zod";

export const menuSchema = z.object({
  _id: z.string(),
  title: z.string(),
  image: z.string().url(),
});

export const menuArraySchema = z.array(menuSchema);

export type Menu = z.infer<typeof menuSchema>;
