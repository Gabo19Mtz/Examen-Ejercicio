import express from "express";
import laboratoriesRoutes from "./routes/laboratories.routes.js";
import computersRoutes from "./routes/computers.routes.js";
import cors from "cors";

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use(laboratoriesRoutes);
app.use(computersRoutes);

export default app;
