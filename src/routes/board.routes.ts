import { Router } from "express";
import { getBoards, createBoard } from "../controllers/board.controller";

const router = Router();

router.get("/", getBoards);
router.post("/", createBoard);

export default router;
