import { z } from "zod";

export const createListSchema = z.object({
  title: z.string().trim().min(1, "Title cannot be empty").max(100),
  boardId: z.string().uuid("boardId must be a valid UUID"),
  order: z.number().int().nonnegative().optional(),
});

export const getListsQuerySchema = z.object({
  boardId: z.string().uuid("boardId must be a valid UUID"),
});

export const reorderListsSchema = z
  .array(
    z.object({
      id: z.string().uuid(),
      order: z.number().int().nonnegative(),
    }),
  )
  .min(1, "Payload cannot be empty");
