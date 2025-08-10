import { useAuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children}) => {
    const {isAuthenticated} = useAuthContext();

    if (!isAuthenticated) {
        return <Navigate to='/auth/login' state={{ fromPath: location }} replace />;
    }

    return <>{children}</>;
}

export default ProtectedRoute;