import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import './ArticleCard.css'
function ArticleCard(props) {
    let {currentUser} = useSelector(state=>state.userAuthorLoginReducer)
    let navigate = useNavigate()
    return (
        <div className="eacharticle">
<Link onClick={(e)=>{
    e.preventDefault();
    if(currentUser.userType==='author'){
    navigate(`/author/article/${props.a.articleId}`,{state:props.a});
    }
    else{
        navigate(`/user/article/${props.a.articleId}`,{state:props.a})
    }

}} style={{ textDecoration: 'none' }}>
            <div className="card article1">
  <div className="card-body" >
      <div className="titlecov">
    <h5 className="card-title" style={{textDecoration: 'none'}}>{props.a.title}</h5>
    </div>
    <h3 className="card-text" style={{textDecoration: 'none'}}>{props.a.cat}</h3>
    <div>
    <p className="card-text">
                {props.a.content.substring(0, 80) + "...."}
    </p>
    </div>
    <p>Click to read</p>
  </div>
</div>
</Link>
        </div>
    )
}

export default ArticleCard
