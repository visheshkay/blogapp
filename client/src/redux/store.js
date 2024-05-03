import {configureStore} from '@reduxjs/toolkit'
import userAuthorReducer from './slices/userAuthorSlice'
 export const store=configureStore({
     reducer:{
         userAuthorLoginReducer:userAuthorReducer
     }
 })