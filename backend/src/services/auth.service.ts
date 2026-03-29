import bcrypt from "bcrypt";
import prisma from "../config/prisma.js";
import { CustomError } from "../utils/CustomError.js";
import { SignUpInput } from "../zodSchema.js";



export const signUp = async (data: SignUpInput) => {
    data.password = await bcrypt.hash(data.password, 10);
    const existingUser = await prisma.user.findUnique({where: {email: data.email}});
    if(existingUser){
        throw new CustomError("User already exists", 400);
    }
    const user = await prisma.user.create({
        data,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    return user;
}

