import { NextFunction, Request, Response } from "express";
import { CustomError } from "./CustomError.js";

 export const protect = (req:Request, res:Response, next:NextFunction) => {
  if (req && typeof req.isAuthenticated === "function") {
    if (req.isAuthenticated()) return next();
  }
  throw new CustomError("session expired", 401);
};