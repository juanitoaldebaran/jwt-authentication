import type { LoginRequest, LoginResponse, RegisterRequest, UserModel } from "../types/authTypes";
import api from "../config/api";

class AuthService {
    async login(data: LoginRequest): Promise<LoginResponse> {
        try {
            const response = await api.post("/auth/login", data);

            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
            }

            console.log("HTTP Login POST has been sent");
            return response.data;
        } catch (error: any) {
            throw new Error(error?.data?.message || "Login Failed, Please Check username and password");
        }
    }

    async register(data: RegisterRequest): Promise<UserModel> {
        try {
            const response = await api.post("/auth/register", data);
            console.log("HTTP Register POST has been sent");
            return response.data;
        } catch (error: any) {
            throw new Error(error?.data?.message || "Registration Failed, Please checked each value");
        }
    }

    async getProtectedData(): Promise<string> {
        try {
            const response = await api.post("/auth/test/protected");
            console.log("HTTP Test POST has been sent");
            return response.data;
        } catch (error: any) {
            throw new Error(error?.data?.message || "Failed to sent a POST Request to protected data");
        }
    }

    getToken(): string | null {
        return localStorage.getItem("token");
    }

    logout(): void {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
    }

    isAuthenticated(): boolean {
        const token = localStorage.getItem("token");
        return token != null;
    }

}

const authService = new AuthService();
export default authService;