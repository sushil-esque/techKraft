import prisma from "../config/prisma.js";

export const getAllProperties = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;
  const [property, total] = await Promise.all([
    prisma.property.findMany({
      skip,
      take: limit,
    }),
    prisma.property.count(),
  ]);
  return { property, total };
};

export const getPropertyById = async (id: number) => {
  return await prisma.property.findUnique({
    where: { id },
  });
};

export const createProperty = async (data: any) => {
  return await prisma.property.create({
    data,
  });
};
