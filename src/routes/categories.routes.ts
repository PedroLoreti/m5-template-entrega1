import { Router } from "express";
import { CategoriesControllers } from "../controllers/categories.controllers";


export const categoriesRoutes = Router();

const categoriesControllers = new CategoriesControllers();

categoriesRoutes.post("/", categoriesControllers.createCategory);
categoriesRoutes.delete("/:id", categoriesControllers.deleteCategory);