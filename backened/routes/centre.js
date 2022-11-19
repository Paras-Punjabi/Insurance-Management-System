const express = require("express")
const bcrypt = require("bcrypt")
const router = express.Router()
const db = require("../database.js")
const {generateID} = require("../utils.js")

router.post("/modify",(req,res)=>{
    let {cid,pid,aid,amount} = req.body
    let string = `select * from centre where pid="${pid}" AND cid="${cid}" AND aid="${aid}";`
    db.query(string,(err,result)=>{
        if(err){
            console.log(err);
            res.send("Failed..")
            return
        }
        else{
            if(result.length == 0){
                let str = `insert into centre(cid,pid,aid,amount) values("${cid}","${pid}","${aid}",${amount});`
                db.query(str,(e,r)=>{
                    if(e){
                        console.log(e);
                        res.send("Failed..")
                        return
                    }
                    else{
                        res.json(r)
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
                        res.send("Failed..")
                        return
                    }
                    else{
                        res.json(r)
                        return
                    }
                })
            }
        }
    })
})

module.exports = router