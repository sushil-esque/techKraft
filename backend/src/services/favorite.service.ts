import prisma from "../config/prisma.js";
import { CustomError } from "../utils/CustomError.js";
import { favoriteInput } from "../zodSchema.js";

export const toggleFavorite = async (data: favoriteInput, userId: number) => {
  const propertyId = data.propertyId;

  const property = await prisma.property.findUnique({
    where: { id: propertyId },
  });

  if (!property) throw new CustomError("property not found", 404);

  const existing = await prisma.favorite.findUnique({
    where: { userId_propertyId: { userId, propertyId } },
  });

  if (existing) {
    await prisma.favorite.delete({
      where: { userId_propertyId: { userId, propertyId } },
    });
    return { action: "removed from favorites" };
  }

  await prisma.favorite.create({
    data: { userId, propertyId },
  });

  return { action: "added to favorites" };
};

export const getFavorites = async (userId: number) => {
  const favorites = await prisma.favorite.findMany({
    where: { userId },
    include: { property: true },
  });
  return favorites;
};
