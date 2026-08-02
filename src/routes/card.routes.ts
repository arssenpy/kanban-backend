import { Router } from "express";
import {
  getCards,
  createCard,
  reorderCards,
} from "../controllers/card.controller";

const router = Router();

router.get("/", getCards);
router.post("/", createCard);
router.patch("/reorder", reorderCards);

export default router;
