import { Request, Response } from "express";
import { CategoriesServices } from "../services/categories.services";
import { categorySchema } from "../schemas/categoriesSchema.schema";
import { container } from "tsyringe";
import { z } from "zod";

export class CategoriesControllers {

    async createCategory(req: Request, res: Response) {
        const categoryService = container.resolve(CategoriesServices);
        const { name } = categorySchema.parse(req.body);


        const response = await categoryService.createCategory(name);
        res.status(201).json(response);
    }

    async deleteCategory(req: Request, res: Response) {
        const categoryService = container.resolve(CategoriesServices);
        
        const { id } = req.params;
        await categoryService.deleteCategory(Number(id));
        res.status(204).json();
    }
}
