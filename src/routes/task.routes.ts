import { Router } from "express";
import { TaskControllers } from "../controllers/task.controllers";
import { IsValidBody } from "../middlewares/isValidBody.middleware";
import { createTaskSchema, updateTaskSchema } from "../schemas/TaskSchema.schema";


export const taskRoutes = Router();

const taskControllers = new TaskControllers();

taskRoutes.post("/", IsValidBody.execute({ body: createTaskSchema }), taskControllers.createTask);
taskRoutes.get("/", taskControllers.getTasks);
taskRoutes.get("/:id", taskControllers.getOneTask);
taskRoutes.patch("/:id", IsValidBody.execute({ body: updateTaskSchema}),taskControllers.updateTask);
taskRoutes.delete("/:id", taskControllers.deleteTask);