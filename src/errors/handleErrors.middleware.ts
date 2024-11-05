import { NextFunction, Request, Response } from "express";
import { AppError } from "./erros";
import { ZodError } from "zod";

export class HandleErrors {
    static execute(err: Error, req: Request, res: Response, next: NextFunction) {
        if (err instanceof AppError) {
            return res.status(err.statusCode).json({ error: err.message });
        } else if (err instanceof ZodError) {
            return res.status(400).json({ errors: err.errors });
        } else if (err.message === "Category not found") {
            return res.status(404).json({ message: "Category not found" });
        } else if (err.message === "Task not found") {
            return res.status(404).json({ message: "Task not found" });
        } else {
            return res.status(500).json({ error: "Internal server error." });
        }
    }
}