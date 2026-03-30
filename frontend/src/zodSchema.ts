import {z} from "zod";

export const signUpSchema = z.object({
    name: z.string().min(3),
    email: z.email(),
    password: z.string().min(6),
})
export type SignUpInput = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(6),
})
export type LoginInput = z.infer<typeof loginSchema>;

export const favoriteSchema = z.object({
    propertyId: z.number().int()
})

export type favoriteInput = z.infer<typeof favoriteSchema>;