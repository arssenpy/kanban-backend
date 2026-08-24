import { Router } from "express";
import { getBoards, createBoard } from "../controllers/board.controller";
import { validate } from "../middlewares/validate.middleware";
import { createBoardSchema } from "../validators/board.validator";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.get("/", getBoards);
router.post("/", validate(createBoardSchema), createBoard);

export default router;
