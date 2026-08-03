import { z } from "zod";

export const createBoardSchema = z.object({
  title: z.string().trim().min(1, "Title cannot be empty").max(100),
});
