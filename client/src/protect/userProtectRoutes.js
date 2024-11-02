import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { authSelector } from "../redux/authReducer";
import { toast } from "react-toastify";

export default function CustomerProtectedRoute({ children }) {
  const { isLoggedIn, authLoading, user } = useSelector(authSelector);
  const navigate = useNavigate();
  const location = useLocation();


  if(authLoading){
    return <h1>Loding ......</h1>
  }


 return isLoggedIn && user ? children : <Navigate to="/signin" replace state={{ from: location }} />

 
}
