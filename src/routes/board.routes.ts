import { Router } from "express";
import { getBoards, createBoard } from "../controllers/board.controller";
import { validate } from "../middlewares/validate.middleware";
import { createBoardSchema } from "../validators/board.validator";

const router = Router();

router.get("/", getBoards);
router.post("/", validate(createBoardSchema), createBoard);

export default router;
