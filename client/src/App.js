
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./components/auth/Signup";
import Signin from "./components/auth/signin";
import UserDashboard from "./components/userProfle/UserDashboard";
import DrawMap from "./components/maps/DrawMap";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import { checkedLoggedInApiAsync } from "./redux/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import CustomerProtectedRoute from "./protect/userProtectRoutes";
import SuppliersProtectedRoute from "./protect/suppliersProtectRoutes";

import { errorSelector, clearError } from "./redux/errorReducer";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function App(){

    const dispatch = useDispatch();
    const { errorMessage } = useSelector(errorSelector);

    useEffect(() => {
        //====== show toast message if there is any error ============//
        if (errorMessage) {
            toast.error(errorMessage);
            
            //=== clear error after 3sec ==============//
            const timer = setTimeout(() => {
                dispatch(clearError());
            }, 3000);

            //==== clear on unmout phase ==========//
            return () => clearTimeout(timer);
        }
    }, [errorMessage, dispatch]);



    //======== checked is userLoggedin when page refesh or reload =============//
    useEffect(()=>{
        dispatch(checkedLoggedInApiAsync());

    },[dispatch])



    //========= configuring routes for all the pages ============//
    const router = createBrowserRouter([
        {path:"/", element:<Navbar />, 

            children:[
                { index:"/", element:<Home />},

                { path:"signup", element:<Signup />},
                { path:"signin", element:<Signin />},
        
                {
                  path:"user/:userId", element:
                  <CustomerProtectedRoute>
                        <UserDashboard />
                  </CustomerProtectedRoute>
                  
                },
        
                {
                    path:"suppliers/map/:suppliersId", element:
                    <SuppliersProtectedRoute>
                         <DrawMap />

                    </SuppliersProtectedRoute>
                   
                }

            ]

        }

    ])



    return(
        <div className='App'>

                <RouterProvider router={router} />
                <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
          
        </div>
    )
}