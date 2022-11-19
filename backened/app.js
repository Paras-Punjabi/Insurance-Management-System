require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")
const customerRouter = require("./routes/customer.js")
const agentRouter = require("./routes/agent.js")
const policyRouter = require("./routes/policy.js")
const statementsRouter = require("./routes/statements.js")
const centreRouter = require("./routes/centre.js")
const PORT = 8000 || process.env.PORT

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(cors({
    origin:"*",
    methods:["POST","GET","PUT","DELETE"]
}))

app.use("/api/customer",customerRouter)
app.use("/api/agent",agentRouter)
app.use("/api/policy",policyRouter)
app.use("/api/statements",statementsRouter)
app.use("/api/centre",centreRouter)

app.get("/",(req,res)=>{
    res.send("Hello")
})

// *contact us API
app.post("/api/contact",(req,res)=>{
    let body = req.body
    console.log(body);
    res.json(body)
})


app.listen(PORT,()=>{
    console.log(`Server Started on port ${PORT}`);
})