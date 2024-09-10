import { Router } from "express";
import {
  createLaboratory,
  deleteLaboratory,
  getComputerLaboratory,
  getLaboratories,
  getLaboratory,
  updateLaboratory,
} from "../controllers/laboratory.controller.js";

const router = Router();

// Routes
router.post("/laboratory", createLaboratory);
router.get("/laboratory", getLaboratories);
router.put("/laboratory/:id", updateLaboratory);
router.delete("/laboratory/:id", deleteLaboratory);

router.get("/laboratory/:id/computers", getComputerLaboratory);
router.get("/laboratory/:id", getLaboratory);

export default router;
