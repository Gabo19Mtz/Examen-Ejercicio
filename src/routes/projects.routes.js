import { Router } from "express";
import {
  getProjects,
  createProject,
  updateProject,
  getProject,
  deleteProject,
  getProjectTasks,
} from "../controllers/project.controller.js";

const router = Router();

// Routes
router.post("/projects", createProject);
router.get("/projects", getProjects);
router.put("/projects/:id", updateProject);
router.delete("/projects/:id", deleteProject);

router.get("/projects/:id/tasks", getProjectTasks);
router.get("/projects/:id", getProject);

export default router;
