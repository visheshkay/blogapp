import React from 'react'
import './Home.css'
import homeblog from '../assets/homeblog.jpeg'
function Home() {
    return (
        <div className="homemain container">
            <h1 className="homeheading">Blog</h1>
            <img src={homeblog} alt="blog image" className="homeblog"/>
            <p className="homedesc">A blog (short for “weblog”) is an online journal or informational website run by an individual, group, or corporation that offers regularly updated content (blog post) about a topic. It presents information in reverse chronological order and it's written in an informal or conversational style.</p>
            
        </div>
    )
}

export default Home
