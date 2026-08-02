import { Request, Response } from "express";
import { listService } from "../services/list.service";
import { asyncHandler } from "../middlewares/asyncHandler";

export const getLists = asyncHandler(async (req: Request, res: Response) => {
  const { boardId } = req.query;

  if (!boardId || typeof boardId !== "string") {
    return res.status(400).json({ error: "boardId is required" });
  }

  const lists = await listService.getByBoard(boardId);
  res.json(lists);
});

export const createList = asyncHandler(async (req: Request, res: Response) => {
  const { title, boardId, order } = req.body;

  if (!title || !boardId) {
    return res.status(400).json({ error: "title and boardId is required" });
  }

  const list = await listService.create(title, boardId, order ?? 0);
  res.status(201).json(list);
});

export const reorderList = asyncHandler(async (req: Request, res: Response) => {
  const payload = req.body;

  if (!Array.isArray(payload)) {
    return res.status(400).json({ error: "payload must be array" });
  }

  await listService.reorder(payload);
  res.status(200).json({ success: true });
});
