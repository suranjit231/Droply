import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setError } from "./errorReducer";

const initialState = {
    user:null,
    isLoggedIn:false,
    authLoading:false,
    authError:null,
    isSignup:false,

}

const setAuthLoading = (state) => {
    state.authLoading = true;
};

const clearAuthLoading = (state) =>{
    state.authLoading = false;
}

//========== asyncThunk for signup users ===============//
export const signupApiAsync = createAsyncThunk("auth/signupApi",
    async(data, thunkApi)=>{
        try{

            console.log("req data: ", data)
            

            const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/users/signup`, data, {
                withCredentials:true
            });

            console.log("res.data for signup api: ", res.data);

            return res.data;

        }catch(error){
            console.log("error in signup api: ", error);
            thunkApi.dispatch(setError(error.response.data.message));
           return thunkApi.rejectWithValue(error.response.data.message);

        }
    }
)


//========= AsyncThunk for loginApi ==================//
export const loginApiAsync = createAsyncThunk("auth/loginApi",
    async(data, thunkApi)=>{
        try{

            const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/users/login`,
                data, {withCredentials:true})

            console.log("res.data for login api: ", res.data);

            return res.data;

        }catch(error){
            console.log("error in login api: ", error);
            thunkApi.dispatch(setError(error.response.data.message));
            return thunkApi.rejectWithValue(error.response.data.message);

        }
    }
)


//======== asyncThunk api for logout ==============//
export const logoutApiAsync = createAsyncThunk("auth/logoutApi",
    async(data, thunkApi)=>{
        try{
            console.log("logout thunkApi call")

            const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users/logout`, {withCredentials:true});

            console.log("res.data for logout api: ", res.data);

            return res.data;

        }catch(error){
            console.log("error in logout api: ", error);
            thunkApi.dispatch(setError(error.response.data.message));
           return thunkApi.rejectWithValue(error.response.data.message);
        }
    }
)


//=========== checked is used loggedIn ===================//
export const checkedLoggedInApiAsync = createAsyncThunk("/auth/checkedLoggedInApi",
    async(arg, thunkApi)=>{
        try{
            const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users/checkedLoggedIn`, 
                {withCredentials:true}
            )

            console.log("res.data for checkedLoggedIn Api", res.data);
            return res.data;

        }catch(error){
            console.log("error in checked loggedIn api: ", error);
            thunkApi.dispatch(setError(error.response.data.message));
           return thunkApi.rejectWithValue(error.response.data.message);
        }
    }
)


//============= creating authSlice for creating reducer for auth ============//
const authSlice = createSlice({
    name:"auth",
    initialState:initialState,

    reducers:{},

    extraReducers:(builder)=>{
        builder
        .addCase(signupApiAsync.pending, setAuthLoading)
        .addCase(signupApiAsync.fulfilled, (state, action)=>{
            state.isSignup = true;
            state.authLoading = false;
        })

        //=========== update state for loggin =============//
        .addCase(loginApiAsync.pending, setAuthLoading)
        .addCase(loginApiAsync.fulfilled, (state, action)=>{
            state.isLoggedIn = true;
            state.user = {...action.payload.user}
            state.authLoading = false;
        })

        //=========== update state for logout ============//
        .addCase(logoutApiAsync.pending, setAuthLoading)
        .addCase(logoutApiAsync.fulfilled, (state, action)=>{
            state.user = null;
            state.isLoggedIn = false;
            state.authLoading = false;
        })
        //========= checked login state update ================//
        .addCase(checkedLoggedInApiAsync.pending, setAuthLoading)
        .addCase(checkedLoggedInApiAsync.fulfilled, (state, action)=>{
            state.isLoggedIn = true;
            state.user = {...action.payload.user};
            state.authLoading = false;
        })
    }
})


//======= creating reducers and actions ============//
export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
export const authSelector = (state)=>state.authReducer;