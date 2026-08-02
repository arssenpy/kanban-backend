import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import { Prisma } from "@prisma/client";

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Record not found" });
    }

    if (err.code === "P2002") {
      return res.status(409).json({ error: "Unique constraint violation" });
    }

    if (err.code === "P2003") {
      return res.status(404).json({
        error: "Invalid foreign key (e.g. boardId or listId does not exist)",
      });
    }
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    return res.status(400).json({ error: "Invalid request data" });
  }

  return res.status(500).json({ error: "Internal server error" });
};
