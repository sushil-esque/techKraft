import type { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync.js";
import * as propertyService from "../services/property.service.js";
import * as favoriteService from "../services/favorite.service.js";

export const getProperties = catchAsync(async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const userId = req.user?.id;

  const { property, total } = await propertyService.getAllProperties(
    page,
    limit,
  );
  const totalPages = Math.ceil(total / limit);
  const nextPage = page < totalPages ? page + 1 : null;
  if (userId && typeof userId === "number") {
    const favorites = await favoriteService.getFavorites(userId);
    const favoritesIds = favorites.map((item) => item.propertyId);
    const propertieswithFavFlag = property.map((item) => ({
      ...item,
      isFavorite: favoritesIds.includes(item.id),
    }));
    return res.status(200).json({
      status: "success",
      total,
      page,
      limit,
      totalPages,
      nextPage,
      data: propertieswithFavFlag,
    });
  }

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
