const express = require("express")
const router = express.Router()
const db = require("../database.js")
const {generateID} = require("../utils.js")

router.post("/transaction",(req,res)=>{
    let {cid,pid,amount,status,duedate,paydate,time} = req.body
    let tid = generateID(10)
    let string = `insert into statements(tid,cid,pid,amount,status,duedate,paydate,time) values("${tid}","${cid}","${pid}",${amount},"${status}", "${duedate}","${paydate}","${time}");`
    db.query(string,(err,result)=>{
        if(err){
            console.log(err);
            res.status(500).json({status:false,message:"Server Error"})
            return
        }
        else{
            res.status(200).json({result:result,message:"Transaction Created",status:true})
        }
    })
})

router.get("/fetch",(req,res)=>{
    let string = "select * from statements;"
    db.query(string,(err,result)=>{
        if(err){
            console.log(err);
            res.status(500).json({status:false,message:"Server Error"})
            return
        }
        else{
            res.status(200).json({result:result,status:true})
        }
    })
})

router.post("/changeStatus",(req,res)=>{
    let {newStatus,cid,pid} = req.body
    let string = `update table statements set status="${newStatus}" where pid="${pid}" AND cid="${cid}";`
    db.query(string,(err,result)=>{
        if(err){
            console.log(err);
            res.status(500).json({status:false,message:"Server Error"})
            return
        }
        else{
            res.status(200).json({result:result,status:true})
        }
    })
})


module.exports = router
