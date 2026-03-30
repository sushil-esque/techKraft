import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import passport from "passport";
import "../strategies/local-strategy.js";
import { loginSchema } from "../zodSchema.js";
import { protect } from "../utils/authHandler.js";

const router = Router();

router.post("/signUp", authController.signUp);
router.post(
  "/signIn",
  (req, res, next) => {
    loginSchema.parse(req.body);
    next();
  },
  authController.signIn,
);

router.get("/me", protect, authController.getMe);
router.post("/logout", authController.logout)
export default router;
