import express from "express";
import { createCategory, getCategories, deleteCategory } from "../controllers/category.controller.js";
import { adminRoute, protectRoute } from '../middlewares/auth.middleware.js';


const router = express.Router();

router.post("/", adminRoute, protectRoute, createCategory);
router.get("/", adminRoute, protectRoute, getCategories);
router.delete("/:id", adminRoute, protectRoute, deleteCategory);

export default router;
