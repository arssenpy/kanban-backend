import { Router } from "express";
import { validate } from "../middlewares/validate.middleware";
import {
  createListSchema,
  getListsQuerySchema,
  reorderListsSchema,
} from "../validators/list.validator";
import {
  getLists,
  createList,
  reorderList,
  deleteList,
} from "../controllers/list.controller";

const router = Router();

router.get("/", validate(getListsQuerySchema, "query"), getLists);
router.post("/", validate(createListSchema), createList);
router.patch("/reorder", validate(reorderListsSchema), reorderList);
router.delete("/:id", deleteList);

export default router;
