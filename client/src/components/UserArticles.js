import React from 'react'
import {useState,useEffect} from 'react'
import ArticleCard from './ArticleCard'
import axios from 'axios'
function UserArticles() {
    const token = localStorage.getItem('token')
    const [articles,setArt]=useState([])
    const axiosWithToken = axios.create({
        headers:{Authorization: `Bearer ${token}`}
    }) 

    const getArt= async ()=>{
        let res = await axiosWithToken.get('http://localhost:4000/user-api/articles');
        setArt(res.data.payload)
        console.log(articles)
    }

    useEffect(()=>{
        getArt()
    },[])
    return (
        <div className="row gy-5 gx-3">
            {articles.map((a)=><div className="col-sm-12 col-md-4 col-lg-3 mb-2"><ArticleCard a={a}/></div>)}
        </div>
    )
}

export default UserArticles
