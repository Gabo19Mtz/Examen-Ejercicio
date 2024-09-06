import express from "express";
import projectRoutes from "./routes/projects.routes.js";
import taskRoutes from "./routes/tasks.routes.js";
import cors from "cors";

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use(projectRoutes);
app.use(taskRoutes);

export default app;
