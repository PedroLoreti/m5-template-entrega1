import { injectable } from "tsyringe";
import { prisma } from "../database/prisma";
import { ITaskUpdate, ITaskWithoutId } from "../interfaces/tasks.interfaces";


@injectable()
export class TaskServices {
    async createTask(body: ITaskWithoutId) {
        if (body.categoryId) {
            const category = await prisma.category.findUnique({
                where: { id: body.categoryId }
            });
            
            if (!category) {
                throw new Error("Category not found");
            }
        }
        return await prisma.task.create({ data: body });
    }

    async getTasks(categoryName?: string) {
        const tasks = await prisma.task.findMany({
            where: categoryName ? { category: { name: { contains: categoryName.toLowerCase(), mode: "insensitive" } } } : {},
            include: { category: true }
        });

        if (categoryName && tasks.length === 0) {
            throw new Error("Category not found");
        }

        return tasks.map(task => ({
            id: task.id,
            title: task.title,
            content: task.content,
            finished: task.finished,
            category: task.category || null
        }))
    }

    async getOneTask(id: number) {
        const task = await prisma.task.findFirst({ where: { id }, include: { category: true } });

        if (task) {
            return {
                id: task.id,
                title: task.title,
                content: task.content,
                finished: task.finished,
                category: task.category || null
            };
        }

        return null;
    }

    async updateTask(id: number, body: ITaskUpdate) {
        const existingTask = await prisma.task.findUnique({ where: { id } });
        if (!existingTask) {
            throw new Error("Task not found");
        }

        if (body.categoryId !== undefined) {
            const existingCategory = await prisma.category.findUnique({
                where: { id: body.categoryId }
            });

            if (!existingCategory) {
                throw new Error("Category not found");
            }
        }

        return await prisma.task.update({ where: { id }, data: body });
    }

    async deleteTask(id: number) {
        const task = await prisma.task.findUnique({ where: { id } });

        if (!task) {
            throw new Error("Task not found");
        }

        return await prisma.task.delete({ where: { id } });
    }

}

