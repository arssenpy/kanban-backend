import { Request, Response } from "express";
import { boardService } from "../services/board.service";

export const getBoards = async (req: Request, res: Response) => {
  try {
    const boards = await boardService.getAll();
    res.json(boards);
  } catch (err) {
    res.status(500).json({ error: "failed to fetch boards" });
  }
};

export const createBoard = async (req: Request, res: Response) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: "title is required" });
  }

  const board = await boardService.create(title);
  res.status(201).json(board);
};
