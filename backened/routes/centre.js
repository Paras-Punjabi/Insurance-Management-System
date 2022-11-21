const express = require("express")
const router = express.Router()
const db = require("../database.js")

router.post("/modify",(req,res)=>{
    let {cid,pid,aid,amount} = req.body
    let string = `select * from centre where pid="${pid}" AND cid="${cid}" AND aid="${aid}";`
    db.query(string,(err,result)=>{
        if(err){
            console.log(err);
            res.status(500).json({status:false,message:"Server Error"})
            return
        }
        else{
            if(result.length == 0){
                let str = `insert into centre(cid,pid,aid,amount) values("${cid}","${pid}","${aid}",${amount});`
                db.query(str,(e,r)=>{
                    if(e){
                        console.log(e);
                        res.status(500).json({status:false,message:"Server Error"})
                        return
                    }
                    else{
                        res.status(200).json({result:r,status:true})
                        return
                    }
                })
            }
            else{
                let a = result[0].amount
                let str = `update table centre set amount=${a+amount} where pid="${pid}" AND cid="${cid}" AND aid="${aid}"; `
                db.query(str,(e,r)=>{
                    if(e){
                        console.log(e);
                        res.status(500).json({status:false,message:"Server Error"})
                        return
                    }
                    else{
                        res.status(200).json({result:r,status:true})
                        return
                    }
                })
            }
        }
    })
})

module.exports = router