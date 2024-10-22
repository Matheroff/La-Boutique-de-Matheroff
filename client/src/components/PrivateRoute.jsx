import { Navigate } from "react-router-dom";
import authService from "../services/authService";

function PrivateRoute({ element }) {
    const user = authService.getCurrentUser();
    return user ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
