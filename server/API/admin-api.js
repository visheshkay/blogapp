const exp=require('express')
const adminApp=exp.Router()
// exporting app
adminApp.get('/test',(req,res)=>{
    res.send({message:"admin"})
})
module.exports=adminApp