import { useAuthStore } from "../store/authstore";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute =()=>
{
    const token=useAuthStore();
    return token? <Outlet/>: <Navigate to='/login' replace/>
}

export default ProtectedRoute;