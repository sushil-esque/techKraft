import type { Property } from "@/types";
import { api } from "./interceptor"


export const getAllProperties = async():Promise<Property[]>=>{
    const response =  await api.get("properties")
    return response.data.data
}