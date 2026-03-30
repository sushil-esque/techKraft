import type { Property } from "@/types";
import { api } from "./interceptor";


export const getFavorites = async (): Promise<Property[]> => {
    const response = await api.get("/favorite");
    return response.data.data;
}

export const toggleFavorite = async (propertyId: number) => {
    const response = await api.post("/favorite", { propertyId });
    return response.data.data;
}