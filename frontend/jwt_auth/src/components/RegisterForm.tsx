import { useState } from "react";
import type { RegisterRequest } from "../types/authTypes";
import {useAuth} from "../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import Alert from "./Alert";
import PasswordMatch from "./PasswordMatch";

const RegisterForm: React.FC = () => {
    const [error, setError] = useState<string>("");
    const [registerData, setRegisterData] = useState<RegisterRequest>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        memberType: "REGULAR",
    });
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState(false);
    const {register, isLoading} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const fromPath = location.state?.fromPath.pathname || "/auth/login";
    const isFormValid = !registerData.firstName || !registerData.lastName || !registerData.email || !registerData.password || !registerData.memberType;

    const passwordMatch = registerData.password && confirmPassword && registerData.password === confirmPassword;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setRegisterData(prev => ({
            ...prev,
            [name]: value,
        }));
        if (error) setError("");
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (isFormValid) {
            setError("Please filled an empty value");
            return;
        }

        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!regex.test(registerData.email)) {
            console.error("Invalid email address");
            setError("Invalid email address");
            return;
        }

        if (!passwordMatch){
            setError("Password do not match");
            return;
        }

        try {
            await register(registerData);
            console.log("Registration has been successful");
            navigate(fromPath, {replace: true});
        } catch (error: any) {
            setError(error);
            return;
        }
    }

    return (
        <div className="max-w-md border border-gray-200 bg-white px-12 py-12 sm:px-6 lg:px-8 w-full space-y-6 rounded-lg shadow-lg">
            <div className="text-center">
                <h1 className="font-bold text-2xl mt-2">Create an account</h1>
            </div>

            <form className="mt-8 space-y-8" onSubmit={handleSubmit}>
                {error && (
                    <Alert
                    message={error}
                    type="error"
                    onClose={() => setError("")}
                    >
                    </Alert>
                )}
                
                <div className="space-y-4">
                    <div>
                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            placeholder="First Name"
                            value={registerData.firstName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition-all"
                        >
                        </input>
                    </div>

                    <div>
                        <input  
                            id="lastName"
                            name="lastName"
                            type="text"
                            placeholder="Last Name"
                            value={registerData.lastName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition-all"
                        >
                        </input>
                    </div>

                    <div>
                        <input  
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={registerData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition-all"
                        >
                        </input>
                    </div>

                    <div>
                        <input  
                            id="password"
                            name="password"
                            type={showPassword ? "type" : "password"}
                            placeholder="Password"
                            value={registerData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition-all"
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

                    <div>
                        <input  
                            id="confirm-password"
                            name="confirm-password"
                            type="text"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition-all"
                        >
                        </input>

                        {confirmPassword && (
                            <PasswordMatch
                                message= {
                                    passwordMatch ? "Password match" : "Password do not match"
                                }
                                type={passwordMatch ? "success" : "error"}
                            >
                            </PasswordMatch>
                        )}

                    </div>


                    <div>
                        <select name="memberType" onChange={handleChange} value={registerData.memberType} className="w-full px-4 py-2 border border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition-all">
                            <option value="REGULAR">REGULAR</option>
                            <option value="PREMIUM">PREMIUM</option>
                        </select>
                    </div>
                </div>

                <button
                    className="w-full bg-blue-500 p-2 rounded-lg text-white cursor-pointer hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isFormValid}
                >
                    {isLoading ? <LoadingSpinner/> : "Sign up"}
                </button>
            </form>

            <div className="flex space-x-2 items-center justify-center">
                <p className="mt-2 text-sm text-center">Already have an account?</p>
                <Link to={'/auth/login'} className="mt-2 text-sm text-blue-500 font-medium underline">
                    Login
                </Link>
            </div>
        </div>
    )
}

export default RegisterForm;