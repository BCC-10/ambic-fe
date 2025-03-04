import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate("/")
        }
    }, [token, navigate])

    return !token? children : null
};

export default ProtectedRoute;