import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setError } from "./errorReducer";

const initialState = {
    orders:null,
    loadingOrder:false,
    orderError:null
    
}



//========== asyncThunk for signup users ===============//
export const placedOrderApiAsync = createAsyncThunk("order/placedOrderApi",
    async(data, thunkApi)=>{
        try{

            console.log("req data: ", data)
            

            const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/orders/placedOrder`, data, {
                withCredentials:true
            });

            console.log("res.data for placed order api: ", res.data);

            return res.data;

        }catch(error){
            console.log("error in placed order api: ", error);
            thunkApi.dispatch(setError(error.response.data.message));
           return thunkApi.rejectWithValue(error.response.data.message);

        }
    }
)




const orderSlice = createSlice({
    name:"order",
    initialState:initialState,
    reducers:{},

    extraReducers:(builders)=>{
        builders
        .addCase(placedOrderApiAsync.pending, (state, action)=>{
            state.loadingOrder= true;
        })
        .addCase(placedOrderApiAsync.fulfilled, (state, action)=>{
            console.log("data after placing order action.payload: ", action.payload)
        })

    }
})


export const orderReducer = orderSlice.reducer;
export const orderActions = orderSlice.actions;
export const orderSelector = (state)=>state.orderReducer;