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
  deleteCard,
} from "../controllers/card.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.get("/", validate(getCardsQuerySchema, "query"), getCards);
router.post("/", validate(createCardSchema), createCard);
router.patch("/reorder", validate(reorderCardsSchema), reorderCards);
router.delete("/:id", deleteCard);

export default router;
