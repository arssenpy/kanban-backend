import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";
import { AppError } from "../utils/AppError";

type RequestPart = "body" | "query";

export const validate = (schema: ZodType, part: RequestPart = "body") => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[part]);

    if (!result.success) {
      const message = result.error.issues
        .map((e) => `${e.path.join(".")}: ${e.message}`)
        .join("; ");
      return next(new AppError(`Validation error: ${message}`, 400));
    }

    if (part === "query") {
      Object.assign(req.query, result.data);
    } else {
      req.body = result.data;
    }

    next();
  };
};
