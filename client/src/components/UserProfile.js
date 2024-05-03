import React from 'react'
import { Outlet } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
function UserProfile() {
    return (
        <div className="m-5">
            <div className="userprof m-5">
            <ul className="nav  justify-content-center fs-4">
                <li className="nav-item ">
                    <NavLink to="articles" className="link text-warning">Articles</NavLink>
                </li>
            </ul>
            </div>
            <div>
                <Outlet/>
            </div>
        </div>
    )
}

export default UserProfile
