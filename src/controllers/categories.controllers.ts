import { Request, Response } from "express";
import { CategoriesServices } from "../services/categories.services";
import { categorySchema } from "../schemas/categoriesSchema.schema";
import { container } from "tsyringe";
import { z } from "zod";

export class CategoriesControllers {

    async createCategory(req: Request, res: Response) {
        const categoryService = container.resolve(CategoriesServices);
        try {
            const { name } = categorySchema.parse(req.body);


            const response = await categoryService.createCategory(name);
            res.status(201).json(response);
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({ errors: error.errors });
            }
            res.status(500).json({ error: "Failed to create category" });
        }
    }

    async deleteCategory(req: Request, res: Response) {
        const categoryService = container.resolve(CategoriesServices);
        try {
            const { id } = req.params;
            await categoryService.deleteCategory(Number(id));
            res.status(204).json();
        } catch (error) {
            if ((error as Error).message === "Category not found") {
                res.status(404).json({ message: "Category not found" });
            } 
        }
    }
}