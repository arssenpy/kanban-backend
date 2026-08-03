import { Request, Response } from "express";
import { cardService } from "../services/card.service";
import { asyncHandler } from "../middlewares/asyncHandler";

export const getCards = asyncHandler(async (req: Request, res: Response) => {
  const { listId } = req.query as { listId: string };
  const cards = await cardService.getByList(listId);
  res.json(cards);
});

export const createCard = asyncHandler(async (req: Request, res: Response) => {
  const { title, listId, order } = req.body;
  const card = await cardService.create(title, listId, order ?? 0);
  res.status(201).json(card);
});

export const reorderCards = asyncHandler(
  async (req: Request, res: Response) => {
    await cardService.reorder(req.body);
    res.status(200).json({ success: true });
  },
);
