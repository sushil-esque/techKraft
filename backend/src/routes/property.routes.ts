import { Router } from "express";
import * as propertyController from "../controllers/property.controller.js";

const router = Router();

router.route("/").get(propertyController.getProperties);

export default router;
