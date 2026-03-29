import express from "express";
import type { Request, Response, NextFunction } from "express";
import mainRouter from "./routes/index.js";
import { errorHandler } from "./utils/errorHandler.js";
import session from "express-session";
import cors from "cors";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import prisma from "./config/prisma.js";
import passport from "passport";


const app = express();

// Global Middlewares
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }), 
);
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      httpOnly: true,
    },
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, 
      dbRecordIdIsSessionId: true,
    }),
  }),
);
app.use(passport.initialize());
app.use(passport.session());


// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// Routes
app.use("/api", mainRouter);

app.use(errorHandler);

const PORT = process.env["PORT"] || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

