import React from 'react'
import { useForm } from 'react-hook-form'
import {ArticlesContext} from '../contexts/ArticlesContext'
import { useSelector } from 'react-redux';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function AuthorAdd() {
    let navigate=useNavigate()
    let {register,handleSubmit,formState:{errors}}=useForm();
    let {currentUser}=useSelector(state=>state.userAuthorLoginReducer)
    let [articles,setArt]=useContext(ArticlesContext)
    const token = localStorage.getItem('token')
    const axiosWithToken = axios.create({
        headers:{Authorization:`Bearer ${token}`}
    })
    const submit= async (article)=>{
        article.dateOfCreation = new Date();
        article.dateOfModification = new Date();
        article.articleId = Date.now();
        article.username = currentUser.username
        article.comments=[]
        article.status=true;
        let dbRes = await axiosWithToken.post('http://localhost:4000/author-api/article',article);
        if(dbRes.data.message === 'new article created'){
            navigate('/author/articles')
        }
    }
    return (
        <div className="newarticle">
            <form className="w-75 mx-auto mt-1 bg-light  p-2" onSubmit={handleSubmit(submit)}>
            <div className="Title mb-2 w-50 mx-auto mt-2">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" id="title" className="form-control" {...register("title",{required:true})}/>
                    {errors.title && errors.title.type==="required" &&
                    (<p className="text-danger">Required</p>)}
                </div>
                <div className="cat mb-2 w-50 mx-auto">
                    <label htmlFor="cat" className="form-label">Category</label>
                    <input type="text" id="cat" className="form-control" {...register("cat",{required:true})}/>
                    {errors.cat?.type==="required" &&
                    (<p className="text-danger">Required</p>)}
                </div>
                <div className="content mb-2 w-50 mx-auto">
                    <label htmlFor="content" className="form-label">Content</label>
                    <textarea rows='15' type="text-field" id="content" className="form-control" {...register("content",{required:true})}/>
                    {errors.content?.type==="required" &&
                    (<p className="text-danger">Required</p>)}
                </div>
                <button className="btn text-dark mx-auto d-block fs-6 mb-5" style={{backgroundColor:"var(--main-yellow)"}}>Add Article</button>
            </form>
        </div>
    )
}

export default AuthorAdd
