import { z } from "zod";

export const createCardSchema = z.object({
  title: z.string().trim().min(1, "Title cannot be empty").max(200),
  listId: z.string().uuid("listId must be a valid UUID"),
  order: z.number().int().nonnegative().optional(),
});

export const getCardsQuerySchema = z.object({
  listId: z.string().uuid("listId must be a valid UUID"),
});

export const reorderCardsSchema = z
  .array(
    z.object({
      id: z.string().uuid(),
      order: z.number().int().nonnegative(),
      listId: z.string().uuid(),
    }),
  )
  .min(1, "Payload cannot be empty");
