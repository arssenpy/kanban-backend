import { Request, Response } from "express";
import { authService } from "../services/auth.service";
import { asyncHandler } from "../middlewares/asyncHandler";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  const result = await authService.register(email, password, name);
  res.status(201).json(result);
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await authService.login(email, password);
  res.status(200).json(result);
});

export const getMe = asyncHandler(async (req: Request, res: Response) => {
  const user = await authService.getById(req.userId as string);
  res.json(user);
});
