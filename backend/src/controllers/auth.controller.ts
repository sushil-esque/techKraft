import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync.js";
import * as authService from "../services/auth.service.js";
import { signUpSchema } from "../zodSchema.js";
import { CustomError } from "../utils/CustomError.js";

export const signUp = catchAsync(async (req: Request, res: Response) => {
  const validatedBody = signUpSchema.parse(req.body);

  const newUser = await authService.signUp(validatedBody);
  res.status(201).json({
    status: "success",
    data: { user: newUser },
  });
});

export const signIn = catchAsync(async (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    message: "Logged in successfully",
    data: { user: req.user },
  });
});

export const getMe = catchAsync(async (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    message: "User session is active",
    data: { user: req.user },
  });
});

export const logout = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new CustomError("Not logged in", 401);
  }
  req.logOut((err) => {
    if (err) {
      throw new CustomError("Logout failed", 400);
    }
    res.status(200).json({
      status: "success",
      message: "Successfully logged out",
    });
  });
});
