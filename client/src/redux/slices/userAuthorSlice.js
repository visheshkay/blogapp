import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
export const userAuthorLoginThunk=createAsyncThunk('user-author-login',async(userCredObj,thunkApi)=>{
    try{
    if(userCredObj.userType==='user'){
        const dbRes = await axios.post('http://localhost:4000/user-api/login',userCredObj)
        if(dbRes.data.message==='Login successful'){
            // store token in local or session storage
            localStorage.setItem('token',dbRes.data.token)
            // return data
            return dbRes.data;
        }
        else{
            return thunkApi.rejectWithValue(dbRes.data.message)
        }
    }
    if(userCredObj.userType==='author'){
        const dbRes = await axios.post('http://localhost:4000/author-api/login',userCredObj)
        if(dbRes.data.message==='Author User login successful'){
            localStorage.setItem('token',dbRes.data.token)
            return dbRes.data;
        }
        else{
            console.log(dbRes.data.message)
            return thunkApi.rejectWithValue(dbRes.data.message)
        }
    }
}catch(err){
    return thunkApi.rejectWithValue(err)
}
})
export const userAuthorSlice=createSlice({
    name:"user-author-login",
    initialState:{
        isPending:false,
        loginUserStatus:false,
        currentUser:{},
        errorOccured:false,
        errMsg:''
    },
    reducers:{
        resetState:(state,action)=>{
            state.isPending=false
            state.loginUserStatus=false
            state.currentUser={}
            state.errorOccured=false
            state.errMsg=''
        }
    },
    extraReducers:builder=>builder
    .addCase(userAuthorLoginThunk.pending,(state,action)=>{
        state.isPending=true;
    })
    .addCase(userAuthorLoginThunk.fulfilled,(state,action)=>{
        state.isPending=false;
        state.currentUser=action.payload.user
        state.loginUserStatus=true
        state.errorOccured=false
        state.errMsg=''

    })
    .addCase(userAuthorLoginThunk.rejected,(state,action)=>{
        state.isPending=false;
        state.currentUser={}
        state.loginUserStatus=false
        state.errorOccured=true
        state.errMsg=action.payload
    }),
})

export const {resetState}=userAuthorSlice.actions
export default userAuthorSlice.reducer