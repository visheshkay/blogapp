import React from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Article() {
    let {currentUser} = useSelector(state=>state.userAuthorLoginReducer)
    let {state} = useLocation()
    let [comment,setComment]= useState("");
    let {register,handleSubmit,formState:{errors }}=useForm();
    let [articleEditStatus,setEditStatus] = useState(false);
    let [currentArticle,setCurrentArticle] = useState(state);
    let navigate= useNavigate();
    function ISOtoUTC(iso){
        let date = new Date(iso).getUTCDate();
        let day = new Date(iso).getUTCDay();
        let year = new Date(iso).getUTCFullYear();
        return `${date}/${day}/${year}`;
    }
    const token = localStorage.getItem("token")
    const axiosWithToken = axios.create({
        headers:{Authorization: `Bearer ${token}`}
    })
    const commentHandle = async(commentObj)=>{
        commentObj.username = currentUser.username;
        let res = await axiosWithToken.post(`http://localhost:4000/user-api/comment/${state.articleId}`,commentObj);
        if(res.data.message==='Comment Posted'){
            setComment(res.data.message);
        }
    }
    const editArticle= ()=>{
        setEditStatus(true);
    }
    const deleteArticle = async ()=>{
        let articleHere = {...currentArticle}
        delete articleHere._id;
        let res = await axiosWithToken.put(`http://localhost:4000/author-api/article/${currentArticle.articleId}`,articleHere);
        if(res.data.message==='article deleted'){
            setCurrentArticle({...currentArticle,status:false});
        }
    }
    const restoreArticle = async ()=>{
        let articleHere = {...currentArticle}
        delete articleHere._id;
        let res = await axiosWithToken.put(`http://localhost:4000/author-api/article/${currentArticle.articleId}`,articleHere);
        if(res.data.message==='article restored'){
            setCurrentArticle({...currentArticle,status:true});
        }
    }
    const submitModifiedArticle = async(editedArticle)=>{
            let modifiedArticle = {...state,...editedArticle}
            modifiedArticle.dateOfModification=new Date();
            delete modifiedArticle._id;
            let res = await axiosWithToken.put('http://localhost:4000/author-api/article',modifiedArticle)
            if(res.data.message === 'article modified'){
                setEditStatus(false);
                navigate(`/author/article/${modifiedArticle.articleId}`,{state:modifiedArticle,});
            }
    }
    return (
        
        <div>
            {articleEditStatus===false ?
        (<>
        <div className="d-flex justify-content-between m-5">
            <div>
                <p className="display-3 me-4">{state.title}</p>
                <span>
                <small className="text-secondary me-4">
                    Created on: {ISOtoUTC(state.dateOfCreation)}
                </small>
                <small className="text-secondary me-4">
                    Modified on: {ISOtoUTC(state.dateOfModification)}
                </small>
                </span>
            </div>
        </div>
        <div>
            {currentUser.userType==='author' && (
                <>
                 <button className="me-2 btn btn-warning " onClick={editArticle}>
                    Edit
               </button>{
                currentArticle.status===true ?(
               <button className="me-2 btn btn-danger " onClick={deleteArticle}>
                    Delete
               </button>):(
                   <button className="me-2 btn btn-info " onClick={restoreArticle}>
                       Restore
                    </button>
               )}
               </>
            )}
        </div>
        <p className="display-5 me-4">{state.cat}</p>
        <p className="lead mt-3" style={{whiteSpace:'pre-line'}}>{state.content}</p>
        <div>
            <div className="comments my-4">
                {state.comments.length===0?
                (<p className="display-5">No comments...</p>)
                :(
                    state.comments.map((commentObject,ind)=>{
                        return (
                            <div key={ind} className="bg-light p-3">
                                <p className="fs-4" style={{textTransform:"capitalize"}}>{commentObject.username}</p>
                                <p className="fs-4" style={{color:"dodgerblue"}}>{commentObject.comment}</p>
                            </div>
                        );
                    })
                )    
            }
            </div>
            <h1>{comment}</h1>
            {currentUser.userType==='user' &&(
                <form className="form m-3" onSubmit={handleSubmit(commentHandle)}>
                        <div className="">
                        <input type="text" className="form-control w-75 m-2" placeholder="Write a comment..." {...register("comment")}/>
                        </div>
                        <button type="submit" className="btn btn-warning">Add comment</button>
                </form>
            )}
        </div>
        </>)
        :(
            <div className="newarticle">
            <form className="w-75 mx-auto mt-1 bg-light  p-2" onSubmit={handleSubmit(submitModifiedArticle)}>
            <div className="Title mb-2 w-50 mx-auto mt-2">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" id="title" className="form-control" {...register("title",{required:true})} defaultValue={state.title}/>
                    {errors.title && errors.title.type==="required" &&
                    (<p className="text-danger">Required</p>)}
                </div>
                <div className="cat mb-2 w-50 mx-auto">
                    <label htmlFor="cat" className="form-label">Category</label>
                    <input type="text" id="cat" className="form-control" {...register("cat",{required:true})} defaultValue={state.cat}/>
                    {errors.cat?.type==="required" &&
                    (<p className="text-danger">Required</p>)}
                </div>
                <div className="content mb-2 w-50 mx-auto">
                    <label htmlFor="content" className="form-label">Content</label>
                    <textarea rows='15' type="text-field" id="content" className="form-control" defaultValue={state.content} {...register("content",{required:true})}/>
                    {errors.content?.type==="required" &&
                    (<p className="text-danger">Required</p>)}
                </div>
                <button className="btn text-dark mx-auto d-block fs-6 mb-5" style={{backgroundColor:"var(--main-yellow)"}}>Modify Article</button>
            </form>
        </div>
        )
        }
        </div>
        
    )
}

export default Article
