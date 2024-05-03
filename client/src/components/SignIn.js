import React from 'react'
import './SignIn.css'
// import {NavLink,Outlet} from 'react-router-dom'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../contexts/AuthContext'
import { useContext } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { userAuthorLoginThunk } from '../redux/slices/userAuthorSlice'
import { useEffect } from 'react'
function SignIn() {
    let [auth,setAuth]=useContext(AuthContext)
    let {register,handleSubmit,formState:{errors}}=useForm()
    let{loginUserStatus,currentUser,errorOccured,errMsg}=useSelector(state=>state.userAuthorLoginReducer)
    let navigate = useNavigate()
    let dispatch=useDispatch()
    function login(user){
        console.log(user);
        dispatch(userAuthorLoginThunk(user))
    }
    useEffect(()=>{
        
        if(loginUserStatus===true){
            if(currentUser.userType==='author'){
                navigate('/author/articles')
            }
            else{
                navigate('/user/articles')
            }
        }
    },[loginUserStatus])
    return (
        <div className="signinmain">
            <h1 className="text-center  display-4 pt-3 font-weight-bold" style={{color:"var(--main-yellow)",fontWeight:"500"}}>Login</h1>
            <form className="w-50 mx-auto p-4 pt-3 bg-light" onSubmit={handleSubmit(login)}>
                    <div className="radiobut">
                    <input type="radio" id="user" name="userType" value="user" checked="checked" {...register("userType")}/>
                    <label for="user">User</label>
                    <input type="radio" id="author" name="userType" value="author" {...register("userType")}/>
                    <label for="author">Author</label>
                    <input type="radio" id="admin" name="userType" value="admin" {...register("userType")}/>
                    <label for="admin">Admin</label>
                    </div>
                    <div className="uname mb-2">
                    <label htmlFor="uname" className="form-label">Username</label>
                    <input type="text" id="uname" className="form-control w-75 mx-auto" {...register("username",{required:true})}/>
                    {errors.uname && errors.username.type==="required" &&
                    (<p className="text-danger">Required</p>)}
                </div>
                <div className="password mb-2">
                    <label htmlFor="pass" className="form-label">Password</label>
                    <input type="password" id="pass" className="form-control w-75 mx-auto" {...register("password",{required:true})}/>
                    {errors.password?.type==="required" &&
                    (<p className="text-danger">Required</p>)}
                </div>
                <button className="btn  text-dark mx-auto d-block fs-5" style={{backgroundColor:"var(--main-yellow)"}}>Login</button>        
            </form>
            <p className="lead text-center mt-2">New User?
            <Link to="/register" className="fs-4 px-3">Register</Link>
            here
            </p>
        </div>
    )
}

export default SignIn
