import "reflect-metadata"
import "express-async-errors";
import express, { json } from "express";
import helmet from "helmet";
import { taskRoutes } from "./routes/task.routes";
import { categoriesRoutes } from "./routes/categories.routes";
import { HandleErrors } from "./errors/handleErrors.middleware";


export const app = express();

app.use(helmet());

app.use(json());

app.use('/tasks', taskRoutes)

app.use('/categories', categoriesRoutes)

app.use(HandleErrors.execute)





