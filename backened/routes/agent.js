const express = require("express")
const bcrypt = require("bcrypt")
const router = express.Router()
const db = require("../database.js")
const {generateID} = require("../utils.js")

// **Create Account
router.post("/signup",(req,res)=>{
    let {name,gender,address,pincode,contact,email,password} = req.body
    let str = `select * from agent where email="${email}";`
    db.query(str,async(err,result)=>{
        if(err){
            console.log(err);
            res.send("Failed..")
            return
        }
        else if(result.length != 0){
            console.log(result);
            res.send("Create account with another email..")
            return
        }
        else{
            let aid = generateID(10)
            let salt = await bcrypt.genSalt(5);
            let hashPassword = await bcrypt.hash(password,salt)

            let string = `insert into agent(aid,name,gender,contact,address,pincode,email,password) values("${aid}","${name}","${gender}",${contact},"${address}",${pincode},"${email}","${hashPassword}");`
            
            db.query(string,(err,result)=>{
                if(err){
                    console.log(err);
                    res.send("Failed..")
                    return
                }
                else{
                    console.log(result);
                    res.send("Success..")
                }
            })
        }
    })
})

// **Login
router.post("/login",(req,res)=>{
    let {email,password} = req.body
    console.log(req.body);
    let string = `select * from agent where email="${email}";`
    db.query(string,async(err,result)=>{
        if(err){
            console.log(err.message)
            res.send("Failure..")
        }
        else if(result.length == 0){
            res.send("Login with correct credentials..")
        }
        else{
            let hashPassword = result[0].password
            let isValid = await bcrypt.compare(password,hashPassword);
            if(isValid == false){
                res.send("Login with correct credentials..")
            }
            else{
                res.send("Success..")
            }
        }
    })
})

// **Update Data of Agent 
router.post("/update",(req,res)=>{
    let {aid,name,gender,address,pincode,contact,email} = req.body

    let string  = `update agent set name="${name}", gender="${gender}", address="${address}", pincode="${pincode}", contact="${contact}", email="${email}" where aid="${aid}"`

    db.query(string,(err,result)=>{
        if(err){
            console.log(err.message)
            res.send("Failure..")
        }
        else{
            console.log(result);
            res.send("Success..")
        }
    })
})

module.exports = router
