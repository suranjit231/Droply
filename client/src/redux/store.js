import { configureStore } from "@reduxjs/toolkit";
import { errorReducer } from "./errorReducer";
import { authReducer } from "./authReducer";
import { loadingReducer } from "./loadingReducer";
import { orderReducer } from "./orderReducer";


//======== setup redux store ===========//
const store = configureStore({
    reducer:{
        errorReducer:errorReducer,
        authReducer:authReducer,
        loadingReducer:loadingReducer,
        orderReducer:orderReducer
        
    }
})


export default store;