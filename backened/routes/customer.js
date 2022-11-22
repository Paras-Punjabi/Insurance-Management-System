require("dotenv").config()
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
            res.status(500).json({status:false,message:"Server Error"})
            return
        }
        else if(result.length != 0){
            res.status(400).json({status:false,message:"Create account with another email"})
            return
        }
        else{
            let cid = generateID(10)
            let salt = await bcrypt.genSalt(5);
            let hashPassword = await bcrypt.hash(password,salt)

            let string = `insert into customer(cid,name,dob,gender,address,pincode,contact,mname,fname,email,password) values("${cid}","${name}","${dob}","${gender}","${address}",${pincode},${contact},"${mname}","${fname}","${email}","${hashPassword}");`
            
            db.query(string,(err,result)=>{
                if(err){
                    res.status(500).json({status:false,message:"Server Error"})
                    return
                }
                else{
                    // let user = {
                    //     address:result[0].address,
                    //     cid:result[0].cid,
                    //     contact:result[0].contact,
                    //     email:result[0].email,
                    //     dob:result[0].dob,
                    //     gender:result[0].gender,
                    //     name:result[0].name,
                    //     fname:result[0].fname,
                    //     mname:result[0].mname,
                    //     pincode:result[0].pincode,
                    // }
                    res.status(200).json({status:true,message:"User Created"})
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
            res.status(500).json({status:false,message:"Server Error"})
        }
        else if(result.length == 0){
            res.status(400).json({status:false,message:"Login with correct credentials"})
            return
        }
        else{
            let hashPassword = result[0].password
            let isValid = await bcrypt.compare(password,hashPassword);
            if(isValid == false){
                res.status(400).json({status:false,message:"Login with correct credentials"})
            }
            else{
                let user = {
                    address:result[0].address,
                    cid:result[0].cid,
                    contact:result[0].contact,
                    email:result[0].email,
                    dob:result[0].dob,
                    gender:result[0].gender,
                    name:result[0].name,
                    fname:result[0].fname,
                    mname:result[0].mname,
                    pincode:result[0].pincode,
                }
                res.status(200).json({status:true,message:"User LogedIn",user:user})
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
            res.status(500).json({status:false,message:"Server Error"})
        }
        else{
            console.log(result);
            res.status(200).json({status:true,message:"User Updated"})
        }
    })
})

//* Get user Policies
router.post("/policies",(req,res)=>{
    const {cid} = req.body
    let string = `select policy.pid,name as pname,ramount,centre.amount as total,policy.amount as amount,duration from centre left join policy on centre.cid="${cid}" and centre.pid=policy.pid;`

    db.query(string,(err,result)=>{
        if(err){
            console.log(err.message)
            res.status(500).json({status:false,message:"Server Error"})
        }
        else{
            let str= `select agent.aid,name as aname from agent left join centre on centre.cid="${cid}" and centre.aid=agent.aid;`
            db.query(str,(e,r)=>{
                if(e){
                    console.log(e.message)
                    res.status(500).json({status:false,message:"Server Error"})
                }
                else{
                    let ans = []
                    for(let i=0;i<r.length;i++){
                        ans.push({...r[i],...result[i]})
                    }
                    console.log(ans);
                    res.status(200).json({status:true,result:ans})
                }
            })
        }
    })

})


//* Get user agents
router.post("/agents",(req,res)=>{
    let {cid} = req.body
    let string = `select agent.aid,name,gender,contact,address,pincode,email from agent left join centre on centre.cid="${cid}" and centre.aid=agent.aid;`
    db.query(string,(err,result)=>{
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

// *All Customers
router.get("/all",(req,res)=>{
    let str = `select * from customer;`
    db.query(str,(err,result)=>{
        if(err){
            console.log(err.message)
            res.status(500).json({status:false,message:"Server Error"})
        }
        else{
            res.status(200).json({status:true,result:result})
        }
    })
})

//* Get Statements
router.post("/statements",(req,res)=>{
    let {cid} = req.body
    let string = `select tid,statements.pid,statements.amount,status,duedate,paydate,time from statements left join centre on centre.cid="${cid}" and centre.aid=statements.cid;`
    db.query(string,(err,result)=>{
        if(err){
            console.log(err.message)
            res.status(500).json({status:false,message:"Server Error"})
        }
        else{
            res.status(200).json({status:true,result:result})
        }
    })
})

//*Buy Policy
router.post("/buy",(req,res)=>{
    let {cid,pid,amount,paydate,time,aid}= req.body;
    let str = `insert into centre(cid,pid,aid,amount) values("${cid}","${pid}","${aid}",${amount});`
    db.query(str,(err,result)=>{
        if(err){
            console.log(err.message)
            res.status(500).json({status:false,message:"Server Error"})
        }
        else{
            let tid = generateID(10)
            let string = `insert into statements(tid,cid,pid,amount,status,duedate,paydate,time) values("${tid}","${cid}","${pid}",${amount},"paid","${paydate}","${paydate}","${time}")`
            db.query(string,(e,r)=>{
                if(e){
                    console.log(err);
                    res.status(500).json({status:false,message:"Server Error"})
                    return
                }
                else{
                    res.status(200).json({result:{centre:result,transaction:r},status:true})
                }
            })
        }
    })

})

module.exports = router