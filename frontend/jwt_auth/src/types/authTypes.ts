export interface UserModel {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    memberType: "REGULAR" | "ADMIN";
    issuedAt: number;
    updatedAt: number;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    memberType?: "REGULAR" | "ADMIN" | "";
}

export interface LoginResponse {
    token: string;
    expiresIn: number;
}

export interface AuthContextType {
    user: UserModel | null;
    login: (data: LoginRequest) => Promise<LoginResponse>;
    register: (data: RegisterRequest) => Promise<UserModel>;
    logout: () => void;
    getToken: () => string | null;
    getProtectedData: () => Promise<string>;
    isLoading: boolean;
    isAuthenticated: boolean;
}