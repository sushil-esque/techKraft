import type { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync.js";
import * as userService from "../services/user.service.js";



export const createUser = catchAsync(async (req: Request, res: Response) => {
  const newUser = await userService.createUser(req.body);
  res.status(201).json({
    status: "success",
    data: { user: newUser },
  });
});
  