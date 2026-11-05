
import express from "express";
import cors from "cors";

import healthRoutes from "./routes/health.routes.js";
import protectedRoutes from "./routes/protected.routes.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/health", healthRoutes);
app.use("/api/protected", protectedRoutes);

export default app;
