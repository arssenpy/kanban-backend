import { Request, Response } from "express";
import { cardService } from "../services/card.service";

export const getCards = async (req: Request, res: Response) => {
  const { listId } = req.query;

  if (!listId || typeof listId !== "string") {
    return res.status(400).json({ error: "listId is required" });
  }

  const cards = await cardService.getByList(listId);
  res.json(cards);
};

export const createCard = async (req: Request, res: Response) => {
  const { title, listId, order } = req.body;

  if (!title || !listId) {
    return res.status(400).json({ error: "title and listId is required" });
  }

  const card = await cardService.create(title, listId, order ?? 0);
  res.status(201).json(card);
};

export const reorderCards = async (req: Request, res: Response) => {
  const payload = req.body;

  if (!Array.isArray(payload)) {
    return res.status(400).json({ error: "payload must be array" });
  }

  await cardService.reorder(payload);
  res.status(200).json({ success: true });
};
