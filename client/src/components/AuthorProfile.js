import React from 'react'
import { useLocation } from 'react-router-dom'
import './AuthorProfile.css'
import { NavLink } from 'react-router-dom';
import { Outlet } from 'react-router';
import {useSelector} from 'react-redux';
function AuthorProfile() {
    let {state} = useLocation();
    // let uname = state.uname;
    return (
        <div className="m-5">
            <div className="authorprof headings m-5">
            <ul className="nav  items1 justify-content-center fs-4">
                <li className="nav-item">
                    <NavLink to={{pathname:"articles",state:state}} className="link " style={{color:"var(--main-yellow)",fontWeight:"400"}}>Articles</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to={{pathname:"new-article",state:state}} className="link " style={{color:"var(--main-yellow)",fontWeight:"400"}}>New Article</NavLink>
                </li>
            </ul>
            </div>
            <Outlet/>
        </div>
    )
}

export default AuthorProfile
