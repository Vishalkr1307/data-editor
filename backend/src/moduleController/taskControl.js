const express=require("express")
const router=express.Router()
const Task=require("..//module/task")
const {body,validationResult}=require("express-validator")
const Authinocate=require("..//middleware/authinocate")
const {uploadSingle}=require("..//middleware/upload")

router.post("/addTask",Authinocate,async (req,res)=>{
    try{
        const task=await Task.create(req.body)
        return res.status(200).send(task)

    }
    catch(err){
        console.log(err)
        return res.status(400).send("bad request")
    }
})

router.get("/getTask",async (req,res)=>{
    try{
        const task=await Task.find().lean().exec()
        return res.status(200).send(task)

    }
    catch(err){
        return res.status(400).send("bad request")
    }
})
router.get("/getTask/:id",async (req,res)=>{
    try{

        const task=await Task.findById(req.params.id).lean().exec()
        return res.status(200).send(task)

    }
    catch(err){
        return res.status(400).send("bad request")
    }
})
router.patch("/updateTask/:id",async (req,res)=>{
    try{
        const task=await Task.findByIdAndUpdate(req.params.id,req.body)
        return res.status(200).send(task)

    }
    catch(err){
        return res.status(400).send("bad request")
    }
})
router.put("/updateTask/:id",async (req,res)=>{
    try{
        const task=await Task.findByIdAndUpdate(req.params.id,req.body)
        return res.status(200).send(task)

    }
    catch(err){
        return res.status(400).send("bad request")
    }
})
router.delete("/deleteTask/:id",async (req,res)=>{
    try{
        const task=await Task.findByIdAndDelete(req.params.id)
        return res.status(200).send(task)

    }
    catch(err){
        return res.status(400).send("bad request")
    }
})
module.exports=router
