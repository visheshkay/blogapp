import React from 'react'
import './Nav.css'
import logo1 from '../assets/free-blogger-141-498421.png'
import { NavLink } from 'react-router-dom'
import { useContext } from 'react'
import {AuthContext} from '../contexts/AuthContext'
import {useSelector,useDispatch} from 'react-redux'
import { resetState } from '../redux/slices/userAuthorSlice'
function Nav() {
  let dispatch = useDispatch()
  let {loginUserStatus,currentUser,errorOccured,errMsg}=useSelector(state=>state.userAuthorLoginReducer)
  let[auth,setAuth]=useContext(AuthContext);
  function click(){
    localStorage.removeItem('token')
    dispatch(resetState())
  }
    return (
        <div className="navmain">
            { (loginUserStatus==false)? <nav className="navbar1 navbar nav1 navbar-expand-sm ">
  <div className="nav2 container-fluid">
    <div className="navchild1">
    <NavLink className="navbar-brand" to=""><img src={logo1} width="60px"alt="LOGO"/></NavLink>
    </div>
    <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
    <div className="collapse navbar-collapse navchild2" id="collapsibleNavbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink className="nav-link" to="">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="new-user">Sign up</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="login">Sign in</NavLink>
        </li>
      </ul>
    </div>
  </div>
</nav>
:
<nav className="navbar1 navbar nav1 navbar-expand-sm ">
  <div className="nav2 container-fluid">
    <div className="navchild1">
    <NavLink className="navbar-brand" to=""><img src={logo1} width="60px"alt="LOGO"/></NavLink>
    </div>
    <div className="collapse navbar-collapse navchild2" id="collapsibleNavbar">
      <ul className="navbar-nav">
        
        <li className="nav-item">
          <NavLink className="nav-link" to="" onClick={click} >
          <p className="fs-3 ">Welcome {currentUser.username}({currentUser.userType}),</p>
            Sign Out</NavLink>
        </li>
      </ul>
    </div>
  </div>
</nav>
}
        </div>
    )
}

export default Nav
