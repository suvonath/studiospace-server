
import "dotenv/config";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDB } from "./config/db";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to StudioSpace API!",
  });
});

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "StudioSpace server is healthy!",
  });
});

async function startServer() {
  try {
    await connectDB();

    const PORT = Number(process.env.PORT) || 5000;

    app.listen(PORT, "0.0.0.0", () => {
      console.log(
        `StudioSpace API running on port ${PORT}`
      );
    });
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
}

startServer();
