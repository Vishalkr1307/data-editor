const express=require("express")
const app = express()
const User=require("./moduleController/userControl")
const Task=require("./moduleController/taskControl")
const session=require("express-session")
const cors=require("cors")
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))
app.use(express.json())
app.use(cors())
app.use("/auth",User)
app.use("/task",Task)



// app.get("/",(req,res)=>{
//     res.send("hello worlld pls tells me where you are")
// })



module.exports=app

