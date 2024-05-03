const exp=require('express')
const bcryptjs = require('bcryptjs')
const userApp=exp.Router()
const commonApp = require('./common-api')
const expressAsyncHandler = require('express-async-handler')
require('dotenv').config()
const jwt = require('jsonwebtoken');
const verifyToken = require('../middlewares/verifyToken')
let userscollection
let articlescollection
userApp.use((req,res,next)=>{
    userscollection = req.app.get("userscollection")
    articlescollection = req.app.get("articlescollection")
    next()
})
userApp.get('/test',(req,res)=>{
    res.send({message:"user"})
})
//user registration
userApp.post('/user',expressAsyncHandler(async (req,res)=>{
    let userObj=req.body
    const dbUser = await userscollection.findOne({username:userObj.username})
    if(dbUser!=null){
        res.send({message:"Username already exists"})
    }
    else{
        let hashedPass = await bcryptjs.hash(userObj.password,6)
        userObj.password = hashedPass
        const dbRes = await userscollection.insertOne(userObj)
        if(dbRes.acknowledged===true){
            res.send({message:"User registered"})
    }
    }
}))
//user login 
userApp.post('/login',expressAsyncHandler( async (req,res)=>{
    let userObj = req.body;
    const dbObj = await userscollection.findOne({username:userObj.username})
    if(dbObj===null){
        res.send({message:"Invalid Username"})
    }
    else{
        let status = await bcryptjs.compare(userObj.password,dbObj.password)
        if(status===false){
            res.send({message:"Invalid password"})
        }
        else{
            let signedToken = jwt.sign({username:userObj.username},process.env.SECRET_KEY,{expiresIn:'1m'})
            res.send({message:"Login successful",token:signedToken,user:dbObj})
        }
    }
}))
// get articles
userApp.get('/articles',verifyToken,expressAsyncHandler(async (req,res)=>{
    const articlescollection = req.app.get('articlescollection')
    let articles = await articlescollection.find({status:true}).toArray()
    res.send({message:"all articles",payload:articles})
}))
// post comment
userApp.post('/comment/:id',expressAsyncHandler(async (req,res)=>{
    id = Number(req.params.id)
    let data = req.body
    // insert comment into comments array of the article
    const dbRes = await articlescollection.updateOne({articleId:id},{$addToSet:{comments:data}})
    if(dbRes.acknowledged===true)
        res.send({message:"Comment Posted",payload:dbRes})
    else
        res.send({message:"Failed to post Comment"})
}))
//export app
module.exports=userApp