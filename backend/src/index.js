import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {connectDB} from "./lib/db.js";
import {clerkMiddleware} from "@clerk/express";
import fs from "fs";
import path from "path";
dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL;
const publicDir = path.join(process.cwd(), "public");
app.use(cors({
  origin: FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));
app.use(express.json());
app.use(clerkMiddleware());
if(fs.existsSync(publicDir)) {
  app.use(express.static(publicDir));
  app.get("/{*splat}", (req, res) => {
    res.sendFile(path.join(publicDir, "index.html"));
  });
}
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});