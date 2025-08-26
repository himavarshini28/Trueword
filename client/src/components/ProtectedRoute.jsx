import { useAuthStore } from "../store/authstore";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute =()=>
{
    const token=useAuthStore(state=>state.token);
    return token? <Outlet/>: <Navigate to='/login' replace/>
}

export default ProtectedRoute;