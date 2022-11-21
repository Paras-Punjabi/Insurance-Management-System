const express = require("express")
const router = express.Router()
const db = require("../database.js")
const {generateID} = require("../utils.js")

router.post("/create",(req,res)=>{
    const {name,duration,description,amount,ramount} = req.body
    let pid = generateID(10)
    let string = `insert into policy(pid,name,duration,description,amount,ramount) values("${pid}","${name}",${duration},"${description}",${amount},${ramount});`
    db.query(string,(err,result)=>{
        if(err){
            res.status(500).json({status:false,message:"Server Error"})
            return
        }
        else{
            res.json({result:result,status:true});
        }
    })
})

router.get("/fetch",(req,res)=>{
    let string = "select * from policy;"
    db.query(string,(err,result)=>{
        if(err){
            console.log(err.message);
            res.status(500).json({status:false,message:"Server Error"})
            return
        }
        else{
            res.json({result:result,status:true});
        }
    })
})

module.exports = router