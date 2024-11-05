import { Request, Response } from "express";
import { TaskServices } from "../services/task.services";
import { container } from "tsyringe";

export class TaskControllers {
    async createTask(req: Request, res: Response) {
        const taskService = container.resolve(TaskServices);

        const { title, content, finished, categoryId } = req.body;
        const taskData = {
            title,
            content,
            finished,
            ...(categoryId && { categoryId })
        };
        const response = await taskService.createTask(taskData);
        res.status(201).json(response);
        res.status(404).json({ message: "Category not found" });
    }

    async getTasks(req: Request, res: Response) {
        const taskService = container.resolve(TaskServices);
        const category = req.query.category as string;


        const response = await taskService.getTasks(category);
        res.status(200).json(response);
    }

    async getOneTask(req: Request, res: Response) {
        const taskService = container.resolve(TaskServices);

        const { id } = req.params;
        const response = await taskService.getOneTask(Number(id));

        if (!response) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json(response);
    }

    async updateTask(req: Request, res: Response) {
        const taskService = container.resolve(TaskServices);


        const { id } = req.params;
        const { title, content, finished, categoryId } = req.body;

        const taskData = {
            title,
            content,
            finished,
            ...(categoryId && { categoryId })
        };
        const response = await taskService.updateTask(Number(id), taskData);
        res.status(200).json(response);

    }

    async deleteTask(req: Request, res: Response) {
        const taskService = container.resolve(TaskServices);

        const { id } = req.params;
        await taskService.deleteTask(Number(id));
        res.status(204).json();

    }
}