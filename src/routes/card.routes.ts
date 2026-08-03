import { Router } from "express";
import { validate } from "../middlewares/validate.middleware";
import {
  createCardSchema,
  getCardsQuerySchema,
  reorderCardsSchema,
} from "../validators/card.validator";
import {
  getCards,
  createCard,
  reorderCards,
} from "../controllers/card.controller";

const router = Router();

router.get("/", validate(getCardsQuerySchema, "query"), getCards);
router.post("/", validate(createCardSchema), createCard);
router.patch("/reorder", validate(reorderCardsSchema), reorderCards);

export default router;
