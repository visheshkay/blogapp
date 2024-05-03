import React from 'react'
import { useState ,useEffect} from 'react'
import ArticleCard from './ArticleCard'
import axios from 'axios'
import { useSelector } from 'react-redux'
function AuthorArticles() {
    let {currentUser}=useSelector(state=>state.userAuthorLoginReducer)
    const token = localStorage.getItem('token')
    let [articles,setArt]=useState([])
    const axiosWithToken = axios.create({
        headers:{Authorization: `Bearer ${token}`}
    })
    const getAuthorArt= async ()=>{
        console.log(currentUser)
        let res = await axiosWithToken.get(`http://localhost:4000/author-api/articles/${currentUser.username}`)
        setArt(res.data.payload);
        console.log(res.data)
    }
    useEffect(()=>{
        getAuthorArt()
    },[])
    return (
        <div className=" row gy-5 gx-3 allarticles">
            {articles.map((a)=><div className="col-sm-12 col-md-4 col-lg-3 mb-2"><ArticleCard a={a}/></div>)}
        </div>
    )
}

export default AuthorArticles
