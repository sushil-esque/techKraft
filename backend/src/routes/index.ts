import { Router } from "express";
import userRoutes from "./user.routes.js";
import propertyRoutes from "./property.routes.js";
import authRoutes from "./auth.routes.js";
import favoriteRoutes from "./favorite.router.js"
const router = Router();

router.use("/properties", propertyRoutes);
router.use("/auth", authRoutes);
router.use("/favorite", favoriteRoutes)
export default router;
