import { Request, Response } from "express";
import { boardService } from "../services/board.service";
import { asyncHandler } from "../middlewares/asyncHandler";

export const getBoards = asyncHandler(async (req: Request, res: Response) => {
  const boards = await boardService.getAll();
  res.json(boards);
});

export const createBoard = asyncHandler(async (req: Request, res: Response) => {
  const { title } = req.body;
  const board = await boardService.create(title);
  res.status(201).json(board);
});
