import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {connectDB} from "./src/lib/db.js";
import {clerkMiddleware} from "@clerk/express";
dotenv.config();
connectDB();



const app = express();
const PORT = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL;
app.use(cors({
  origin: FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));
app.use(express.json());
app.use(clerkMiddleware());