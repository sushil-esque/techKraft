import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync.js";
import { favoriteSchema } from "../zodSchema.js";
import * as favoriteService from "../services/favorite.service.js"

export const toggleFavorite = catchAsync( async(req:Request,res:Response)=>{
    const validatedBody = favoriteSchema.parse(req.body);
    const userId = req.user!.id; // req.user is guaranteed by 'protect' middleware
    
    const favorite = await favoriteService.toggleFavorite(validatedBody, userId);
    
    res.status(201).json({
        status: "success",
        data: {
            favorite
        }
    })
})

export const getFavorites = catchAsync(async(req:Request, res:Response)=>{
    const userId = req.user!.id
    const favorites = await favoriteService.getFavorites(userId)
     res.status(200).json({
        status: "success",
        data: favorites
    })
})