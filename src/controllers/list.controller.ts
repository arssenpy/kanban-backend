import { Request, Response } from "express";
import { listService } from "../services/list.service";
import { asyncHandler } from "../middlewares/asyncHandler";

export const getLists = asyncHandler(async (req: Request, res: Response) => {
  const { boardId } = req.query as { boardId: string };
  const lists = await listService.getByBoard(boardId, req.userId as string);
  res.json(lists);
});

export const createList = asyncHandler(async (req: Request, res: Response) => {
  const { title, boardId, order } = req.body;
  const list = await listService.create(
    title,
    boardId,
    order ?? 0,
    req.userId as string,
  );
  res.status(201).json(list);
});

export const reorderList = asyncHandler(async (req: Request, res: Response) => {
  await listService.reorder(req.body, req.userId as string);
  res.status(200).json({ success: true });
});

export const deleteList = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  await listService.remove(id as string, req.userId as string);
  res.status(204).send();
});
