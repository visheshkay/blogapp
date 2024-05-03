const exp = require('express')
const app = exp()
require('dotenv').config()
const mc = require('mongodb').MongoClient
const path = require('path')
let userscollection
let articlescollection
let authorscollection
let DB_URL = process.env.DB_URL
mc.connect(DB_URL)
.then((client)=>{
    // get blogapp database object
    let dbObj = client.db('blogapp')
    //get users collection
    userscollection = dbObj.collection('userscollection')
    //get articles collection
    articlescollection = dbObj.collection('articlescollection')
    authorscollection=dbObj.collection('authorscollection')
    // set collection for express app
    app.set('userscollection',userscollection)
    app.set('articlescollection',articlescollection)
    app.set('authorscollection',authorscollection)
    console.log("Database connection successful")
})
.catch()
app.use(exp.static(path.join(__dirname,'../client/build')))
app.use(exp.json())
const adminApp = require('./API/admin-api')
const userApp = require('./API/user-api')
const authorApp= require('./API/author-api')
// if the request path starts with /user-api pass it to user
app.use('/admin-api',adminApp)
// if the request path starts with /admin-api pass it to admin
app.use('/user-api',userApp) 
// if the request path starts with /author-api pass it to author
app.use('/author-api',authorApp)
// for refresh of a page
app.use((req,res,next)=>{
    res.sendFile(path.join(__dirname,'../client/build/index.html'))
})
// synchronous error handling (express-async-handler module async errors)
app.use((err,req,res,next)=>{
    res.send({message:"error",payload:err.message})
})
let port = process.env.PORT || 5000
app.listen(8000,()=>{console.log(`server running on port ${port}`)})