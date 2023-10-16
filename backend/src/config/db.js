const mongoose=require("mongoose")
require("dotenv").config()

module.exports=mongoose.connect(process.env.DB).then(()=>console.log("Connect success database")).catch(()=>console.log("connection error"))
