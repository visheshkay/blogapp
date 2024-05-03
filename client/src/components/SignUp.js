import React from 'react'
import './SignUp.css'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router'
function SignUp() {
    let {register,handleSubmit,formState:{errors}}=useForm()
    let navigate=useNavigate()
    async function registerUser(user){
        console.log(user)
        let res;
        if(user.userType==='user'){
         res = await axios.post('http://localhost:4000/user-api/user',user)
    }
    else{
         res = await axios.post('http://localhost:4000/author-api/author',user)
    }
        console.log(res.data)
        if(res.data.message==='User registered' || res.data.message==='Author User created'){
            navigate('/login')
        }
        else{
            console.log(res.data.message)
        }
    }
    return (
        <div className="signupmain">
            <h1 className="text-center display-4 pt-3" style={{color:"var(--main-yellow)",fontWeight:"500"}}>Register</h1>
            <form className="w-50 mx-auto p-4 pt-3 bg-light" onSubmit={handleSubmit(registerUser)}>
                    <div className="radiobut">
                    <input type="radio" id="user" name="userType" value="user" checked="checked" {...register("userType")}/>
                    <label htmlFor="user">User</label>
                    <input type="radio" id="author" name="userType" value="author" {...register("userType")}/>
                    <label htmlFor="author">Author</label>
                    </div>
                    <div className="uname mb-2">
                    <label htmlFor="uname" className="form-label">Username</label>
                    <input type="text" id="uname" className="form-control w-75 mx-auto" {...register("username",{required:true,minLength:4,maxLength:8})}/>
                    {errors.username && errors.username.type==="required" &&
                    (<p className="text-danger">Required</p>)}
                    {errors.username && errors.username.type==="minLength" &&
                    (<p className="text-danger">Minimum Length: 4</p>)}
                    {errors.username && errors.username.type==="maxLength" &&
                    (<p className="text-danger">Maximum Length: 8</p>)}
                </div>
                <div className="password mb-2">
                    <label htmlFor="pass" className="form-label">Password</label>
                    <input type="password" id="pass" className="form-control w-75 mx-auto" {...register("password",{required:true,minLength:8})}/>
                    {errors.password?.type==="required" &&
                    (<p className="text-danger">Required</p>)}
                    {errors.password?.type==="minLength" &&
                    (<p className="text-danger">Minimum Length: 8</p>)}
                </div>
                <div className="email mb-2">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" id="email" className="form-control w-75 mx-auto" {...register("email",{required:true})}/>
                    {errors.email?.type==="required" &&
                    (<p className="text-danger">Required</p>)}
                </div>
                <button className="btn  text-dark mx-auto d-block fs-5" style={{backgroundColor:"var(--main-yellow)"}}>Register</button>
            </form>
            <p className="lead text-center mt-2">Already Registered?
            <Link to="/login" className="fs-4 ps-3">Login</Link>
            </p>
        </div>
    )
}

export default SignUp
