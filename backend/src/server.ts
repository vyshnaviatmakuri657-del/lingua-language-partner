import dns from "node:dns";
dns.setDefaultResultOrder("ipv4first");

import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRouter from "./routes/auth";
import learningPathRouter from "./routes/learningPath";
import curriculumRouter from "./routes/curriculum";
import practiceRouter from "./routes/practice";
import reviewRouter from "./routes/review";
import userRouter from "./routes/user";
import aiRouter from "./routes/ai";

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL?.replace(/\/$/, "") || "http://localhost:3000";
const allowedOrigins = new Set([
  FRONTEND_URL,
  "http://localhost:3000",
  "http://127.0.0.1:3000",
]);

// Global Middlewares
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const clean = origin.replace(/\/$/, "");
      if (allowedOrigins.has(clean) || process.env.NODE_ENV !== "production") {
        return callback(null, true);
      }
      return callback(null, false);
    },
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    service: "lingua-backend",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

// Mount Routes
app.use("/api/auth", authRouter);
app.use("/api", learningPathRouter);
app.use("/api", curriculumRouter);
app.use("/api", practiceRouter);
app.use("/api", reviewRouter);
app.use("/api", userRouter);
app.use("/api", aiRouter);

// 404 Handler for Unknown API endpoints
app.use("/api/*", (req: Request, res: Response) => {
  res.status(404).json({ error: `Endpoint not found: ${req.method} ${req.originalUrl}` });
});

// Error handling middleware
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Server Error:", err);
  res.status(500).json({ error: "Internal server error", message: err?.message || String(err) });
});

const server = app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`  Lingua Backend API Server is active!        `);
  console.log(`  Listening on: http://localhost:${PORT}      `);
  console.log(`  Allowed CORS: ${FRONTEND_URL}               `);
  console.log(`===============================================`);
});

export default app;
