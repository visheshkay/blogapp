const exp=require('express')
const expressAsyncHandler = require('express-async-handler')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
// verifyToken middleware
const verifyToken=require('../middlewares/verifyToken')
const authorApp=exp.Router()
authorApp.get('/test',(req,res)=>{
    res.send({message:"author"})
})
let authorscollection;
let articlescollection
authorApp.use((req,res,next)=>{
    authorscollection = req.app.get('authorscollection')
    articlescollection=req.app.get('articlescollection')
    next()
})
//author registration
authorApp.post('/author',expressAsyncHandler( async (req,res)=>{
    let userObj = req.body
    let dbObj = await authorscollection.findOne({username:userObj.username})
    if(dbObj != null){
        res.send({message:'Author already exists'})
    }
    else{
        let hashedPass = await bcryptjs.hash(userObj.password,6)
        userObj.password=hashedPass
        const dbRes = await authorscollection.insertOne(userObj)
        res.send({message:'Author User created'})
    }
}))
// author login
authorApp.post('/login',expressAsyncHandler( async (req,res)=>{
    let userObj = req.body
    const dbObj = await authorscollection.findOne({username:userObj.username})
    if(dbObj==null){
        res.send({message:"Invalid Username"})
    }
    else{
        let status = await bcryptjs.compare(userObj.password,dbObj.password)
        if(status==false){
            res.send({message:'Invalid Password'})
        }
        else{
            // console.log("yes")
            const signedToken = jwt.sign({username:userObj.username},process.env.SECRET_KEY,{expiresIn:'1d'})
            res.send({message:'Author User login successful',token:signedToken,user:dbObj})
        }
    }
}))
//get all articles of this user
authorApp.get('/articles/:author',verifyToken,expressAsyncHandler(async (req,res)=>{
    let author=req.params.author
    let articles = await articlescollection.find({username:author}).toArray()
    res.send({message:'Articles',payload:articles})
}))
// create a new article
authorApp.post('/article',verifyToken,expressAsyncHandler(async (req,res)=>{
    let article = req.body;
    await articlescollection.insertOne(article)
    res.send({message:"new article created"})
}))
//update article
authorApp.put('/article',verifyToken,expressAsyncHandler(async (req,res)=>{
    let modart = req.body
    let dbRes=await articlescollection.updateOne({articleId:modart.articleId},{$set:modart})
    if (dbRes.acknowledged===true)
    res.send({message:"article modified"})
    else res.send({message:"article not found"})
}))
// delete article soft delete
authorApp.put('/article/:id',verifyToken,expressAsyncHandler(async (req,res)=>{
    const id = Number(req.params.id)
    const articleToDel=req.body
    if(articleToDel.status===true){
        await articlescollection.updateOne({articleId:id},{$set:{...articleToDel,status:false}})
        res.send({message:'article deleted'})
    }
    else{
        await articlescollection.updateOne({articleId:id},{$set:{...articleToDel,status:true}})
        res.send({message:'article restored'})
    }
    
}))
//export app
module.exports=authorApp