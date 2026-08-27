import { Router } from "express";
import {
  getBoards,
  createBoard,
  deleteBoard,
} from "../controllers/board.controller";
import { validate } from "../middlewares/validate.middleware";
import { createBoardSchema } from "../validators/board.validator";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.get("/", getBoards);
router.post("/", validate(createBoardSchema), createBoard);
router.delete("/:id", deleteBoard);

export default router;
