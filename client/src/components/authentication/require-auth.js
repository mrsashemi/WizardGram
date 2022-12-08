import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useauth";

const RequireAuth = ({allowedRoles}) => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.admin && allowedRoles === "0001"
            ? <Outlet />
            : auth?.verified && allowedRoles === "1000"
                ? <Outlet />
                : auth?.username
                    ? <Navigate to="/unauthorized" state={{from: location}} replace />
                    : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;