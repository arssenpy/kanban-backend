import { Router } from "express";
import {
  getLists,
  createList,
  reorderList,
} from "../controllers/list.controller";

const router = Router();

router.get("/", getLists);
router.post("/", createList);
router.patch("/reorder", reorderList);

export default router;
