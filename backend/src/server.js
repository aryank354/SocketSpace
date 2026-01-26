import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import { app, server } from "./lib/socket.js";

const __dirname = path.resolve();
const PORT = ENV.PORT || 3000;

// ───────────────────── Middlewares ─────────────────────
app.use(express.json({ limit: "5mb" }));
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(cookieParser());

// ───────────────────── Public Health / Cron Route ─────────────────────
app.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "backend-alive",
    time: new Date().toISOString(),
  });
});

// ───────────────────── API Routes ─────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// ───────────────────── Production Static Serve ─────────────────────
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

// ───────────────────── Server Start ─────────────────────
server.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await connectDB();
});
