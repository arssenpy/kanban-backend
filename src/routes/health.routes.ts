import { Router } from "express";
import { getHealthStatus } from "../controllers/health.controller";

const router = Router();

export default router.get("/", getHealthStatus);
