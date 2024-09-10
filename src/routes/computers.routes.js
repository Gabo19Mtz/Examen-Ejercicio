import { Router } from "express";
import {
  createComputer,
  deleteComputer,
  getComputer,
  getComputers,
  updateComputers,
} from "../controllers/computer.controller.js";

const router = Router();

// Routes
router.post("/computers", createComputer);
router.put("/computers/:id", updateComputers);
router.delete("/computers/:id", deleteComputer);
router.get("/computers", getComputers);
router.get("/computers/:id", getComputer);

export default router;
