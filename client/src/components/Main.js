import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from './Nav'
import Footer from './Footer'
import './Main.css'
function Main() {
    return (
        <div className="maindiv">
            <Nav/>
            <div className="" style={{ minHeight: "70vh" }}>
            <div className="main container">
                {" "}
                <Outlet/>
            </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Main
