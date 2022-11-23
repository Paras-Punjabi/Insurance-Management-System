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
            res.status(500).json({status:false,message:"Server Error"})
            return
        }
        else if(result.length != 0){
            console.log(result);
            res.status(400).json({status:false,message:"Create account with another email"})
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
                    res.status(500).json({status:false,message:"Server Error"})
                    return
                }
                else{
                    console.log(result);
                    res.status(200).json({status:true,message:"Agent Created"})
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
            res.status(500).json({status:false,message:"Server Error"})
        }
        else if(result.length == 0){
            res.status(400).json({status:false,message:"Login with correct credentials"})
        }
        else{
            let hashPassword = result[0].password
            let isValid = await bcrypt.compare(password,hashPassword);
            if(isValid == false){
                res.status(400).json({status:false,message:"Login with correct credentials"})
            }
            else{
                res.status(200).json({status:true,message:"Agent LogedIn"})
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
            res.status(500).json({status:false,message:"Server Error"})
        }
        else{
            console.log(result);
            res.status(200).json({status:true,message:"Agent Updated"})
        }
    })
})

router.get("/fetch",(req,res)=>{
    let str = "select aid,name,contact from agent"
    db.query(str,(err,result)=>{
        if(err){
            console.log(err.message)
            res.status(500).json({status:false,message:"Server Error"})
        }
        else{
            console.log(result);
            res.status(200).json({status:true,result:result})
        }
    })

})

module.exports = router
