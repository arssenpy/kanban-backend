import { Request, Response } from "express";
import { boardService } from "../services/board.service";
import { asyncHandler } from "../middlewares/asyncHandler";

export const getBoards = asyncHandler(async (req: Request, res: Response) => {
  const boards = await boardService.getAllForUser(req.userId as string);
  res.json(boards);
});

export const createBoard = asyncHandler(async (req: Request, res: Response) => {
  const { title } = req.body;
  const board = await boardService.create(title, req.userId as string);
  res.status(201).json(board);
});

export const deleteBoard = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  await boardService.remove(id as string, req.userId as string);
  res.status(204).send();
});
