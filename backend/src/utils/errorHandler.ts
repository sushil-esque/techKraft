import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export interface AppError extends Error {
  status?: number;
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(err);
  if (err instanceof ZodError) {
    console.log(err.issues, "zod Error");

    const formattedErrors = err.issues.reduce(
      (acc, issue) => {
        const path = issue.path.join(".");
        acc[path] = issue.message;
        return acc;
      },
      {} as Record<string, string>,
    );
    return res.status(400).json({
      status: "fail",
      message: "Validation Error",
      errors: formattedErrors,
    });
  }

  res.status(err.status || 500).send({
    message: err.message || "Internal Server Error",
  });
};
