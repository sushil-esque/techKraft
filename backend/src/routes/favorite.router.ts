import { Router } from "express";
import { protect } from "../utils/authHandler.js";
import * as favoriteController from "../controllers/favorite.controller.js";

const router = Router();
router
  .route("/")
  .post(protect, favoriteController.toggleFavorite)
  .get(protect, favoriteController.getFavorites);

export default router;
