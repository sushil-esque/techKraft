import type { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync.js";
import * as propertyService from "../services/property.service.js";

export const getProperties = catchAsync(async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const { property, total } = await propertyService.getAllProperties(
    page,
    limit,
  );
  const totalPages = Math.ceil(total / limit);
  const nextPage = page < totalPages ? page + 1 : null;
  res.status(200).json({
    status: "success",
    total,
    page,
    limit,
    totalPages,
    nextPage,
    data: property,
  });
});
