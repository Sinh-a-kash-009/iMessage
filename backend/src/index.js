import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {connectDB} from "./lib/db.js";
import {clerkMiddleware} from "@clerk/express";
import job from "./lib/cron.js";
import clerkWebhook from "./webhooks/clerk.webhook.js";
import fs from "fs";
import path from "path";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL;
const publicDir = path.join(process.cwd(), "public");

app.use("/api/webhooks/clerk", express.raw({ type: "application/json" }), clerkWebhook);  
app.use(cors({
  origin: FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));
app.use(express.json());
app.use(clerkMiddleware());

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
if(fs.existsSync(publicDir)) {
  app.use(express.static(publicDir));
  app.get("/{*splat}", (req, res) => {
    res.sendFile(path.join(publicDir, "index.html"));
  });
}
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  if (process.env.NODE_ENV === "production") {
    job.start();
  }
});