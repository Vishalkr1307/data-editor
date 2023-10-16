const express=require("express")
const app = express()
app.use(express.json())


app.get("/",(req,res)=>{
    res.send("hello worlld pls tells me where you are")
})



module.exports=app

