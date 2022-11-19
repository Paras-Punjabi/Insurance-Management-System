const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const db = require("../database.js")
const {generateID} = require("../utils.js")

// **Create Account
router.post("/signup",(req,res)=>{
    let {name,dob,gender,address,pincode,contact,mname,fname,email,password} = req.body
    let str = `select * from customer where email="${email}";`
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
            let cid = generateID(10)
            let salt = await bcrypt.genSalt(5);
            let hashPassword = await bcrypt.hash(password,salt)

            let string = `insert into customer(cid,name,dob,gender,address,pincode,contact,mname,fname,email,password) values("${cid}","${name}","${dob}","${gender}","${address}",${pincode},${contact},"${mname}","${fname}","${email}","${hashPassword}");`
            
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
    let string = `select * from customer where email="${email}";`
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

// **Update Data of Customer 
router.post("/update",(req,res)=>{
    let {cid,name,dob,gender,address,pincode,contact,mname,fname,email} = req.body

    let string  = `update customer set name="${name}", dob="${dob}", gender="${gender}", address="${address}", pincode="${pincode}", contact="${contact}", mname="${mname}", fname="${fname}", email="${email}" where cid="${cid}"`

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