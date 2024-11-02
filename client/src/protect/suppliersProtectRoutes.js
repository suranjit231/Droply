import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { authSelector } from "../redux/authReducer";
import { toast } from "react-toastify";


export default function SuppliersProtectedRoute({ children }) {
  const { isLoggedIn, user, authLoading } = useSelector(authSelector);
 
  const location = useLocation()

  if(authLoading){
    return <h1>Loding ......</h1>
  }

  return isLoggedIn && user?.types==="suppliers" ? children : <Navigate to="/signin" replace state={{ from: location }} />

 
}
