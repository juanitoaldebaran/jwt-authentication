import { useEffect, useState } from "react";
import type { LoginRequest, RegisterRequest, UserModel } from "../types/authTypes";
import authService from "../services/authService";

export const useAuth = () => {
    const [user, setUser] = useState<UserModel | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = authService.getToken();

        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const login = async(data: LoginRequest) => {
        setIsLoading(true);
        try {
            const response = await authService.login(data);
            setIsAuthenticated(true);
            setUser({
                email: data.email,
                password: data.password,
            } as UserModel);
            return response;
        } catch (error: any) {
            setIsAuthenticated(false);
            throw new Error(error);
        } finally {
            setIsLoading(false);
        }
    }

    const register = async(data: RegisterRequest) => {
        try {
            const response = await authService.register(data);
            setUser(user);
            return response;
        } catch (error: any) {
            setUser(null);
            throw new Error(error);
        } finally {
            setIsLoading(false);
        }
    }

    const logout = (): void => {
        authService.logout();
        setIsAuthenticated(false);
        setUser(null);
    }

    const getToken = (): string | null => {
        return authService.getToken();
    }

    const getProtectedData = (): Promise<string> => {
        return authService.getProtectedData();
    }

    return {
        login,
        register,
        logout,
        getToken,
        getProtectedData,
        user,
        isLoading,
        isAuthenticated,
    }
}