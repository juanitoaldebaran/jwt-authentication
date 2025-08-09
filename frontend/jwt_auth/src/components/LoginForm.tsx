import { useState } from "react";
import type { LoginRequest } from "../types/authTypes";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "./LoadingSpinner";

const LoginForm: React.FC = () => {
    const [error, setError] = useState<string>("");
    const [loginData, setLoginData] = useState<LoginRequest>({
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const {login, isLoading} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const fromPath = location.state?.fromPath?.pathname || "/dashboard";
    const isFormValid = !loginData.email || !loginData.password;
   

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!loginData.email || !loginData.password) {
            setError("Please fill in all fields");
            return;
        }

        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!regex.test(loginData.email)) {
            console.error("Invalid email address");
            setError(error);
            return;
        }

        try {
            await login(loginData);
            console.log("Login successfully and navigate to ", fromPath);
            navigate(fromPath, { replace: true });
        } catch(error: any) {
            setError(error.message || "Login Error");
        } 
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setLoginData(prev => ({
            ...prev,
            [name]: value
        }));
        if (error) return setError("");
    }

    return (
        <div className="max-w-md border border-gray-200 bg-white px-12 py-12 sm:px-6 lg:px-8 w-full space-y-6 rounded-lg shadow-lg">
            <div className="text-center">
                <h1 className="font-bold text-2xl mt-2">Login</h1>
            </div>
            
            <form onSubmit={handleSubmit} className="mt-8 space-y-8">

                <div className="space-y-4">
                    <div>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Email"
                            required
                            className="w-full px-4 py-2 border border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition-all"
                            value={loginData.email}
                            onChange={handleChange}
                        >
                        </input>
                    </div>

                    <div>
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            required
                            className="w-full px-4 py-2 border border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition-all"
                            value={loginData.password}
                            onChange={handleChange}
                        >
                        </input>
                    </div>

                    <div className="flex items-center space-x-2 mt-2">
                        <input
                            id="show-password"
                            name="show-password"
                            type="checkbox"
                            onChange={() => setShowPassword(!showPassword)}
                            className="text-blue-600 h-4 w-4 border-gray-300 rounded focus:ring-blue-500"
                        >
                        </input>

                        <label htmlFor="show-password" className="text-sm">
                            Show Password
                        </label>
                    </div>
                </div>

                <button
                    className="w-full bg-blue-500 p-2 rounded-lg text-white cursor-pointer hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isFormValid}
                >
                    {isLoading ? <LoadingSpinner/> : "Login"}
                </button>
            </form>

            <div className="flex space-x-2 items-center justify-center">
                <p className="mt-2 text-sm text-center">Don't have an account?</p>
                <Link to={'/auth/register'} className="mt-2 text-sm text-blue-500 font-medium underline">
                    Sign up
                </Link>
            </div>
            
        </div>
    )
}

export default LoginForm;