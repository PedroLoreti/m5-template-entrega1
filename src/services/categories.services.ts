import { injectable } from "tsyringe";
import { prisma } from "../database/prisma";

@injectable()
export class CategoriesServices {

    async createCategory(name: string) {
        return await prisma.category.create({ data: { name } })
    }

    async deleteCategory(id: number) {
        const category = await prisma.category.findUnique({ where: { id } });
    
    if (!category) {
        throw new Error("Category not found");
    }
        return await prisma.category.delete({ where: { id } })
    }

}