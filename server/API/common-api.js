const exp = require('express')
const commonApp = exp.Router()
commonApp.use('/common',(req,res)=>{
    res.send({message:"common app"})
})
module.exports=commonApp