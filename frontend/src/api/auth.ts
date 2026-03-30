import type { LoginInput, SignUpInput } from "@/zodSchema"
import { api } from "./interceptor"

export const getMe = async () => {
    const response = await api.get("auth/me");
    return response.data.data.user;
}

export const signIn = async (data: LoginInput) => {
    const response = await api.post("auth/signIn", data);
    return response.data.data;
}

export const signUp = async (data: SignUpInput) => {
    const response = await api.post("auth/signUp", data);
    return response.data.data;
}

export const logout = async () => {
    const response = await api.post("auth/logout");
    return response.data.data;
}