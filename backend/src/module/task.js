
const mongoose=require("mongoose")

const taskSchema=new mongoose.Schema({
    tittle:{type:String, required:true},
    description:{type:String, required:true},
    task_status:{type:String, required:true},
    tags:[{type:String,required:true}],
    subTasks:[{subTasksTittle:{type:String,required:true},status:{type:Boolean,default:false}}],
    // image_urls:[{type:String,required:true}]


},{
    versionKey:false,
    timestamps:true
})

module.exports=mongoose.model('Task',taskSchema)