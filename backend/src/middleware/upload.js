const multer=require("multer")
const path=require("path")
const storage=multer.diskStorage({
    destination:function (req,file,cb){
        cb(null,path.join(__dirname,'..//upload'))

    },
    filename:function (req,file,cb){
        cb(null,Date.now()+ "-"+file.fieldname)

    }
})
const fileFilter=(req,file,cb)=>{
    if(file.mimetype==='image/jpeg' ||file.mimetype==='image/jpg' ||req.file.mimetype==='image/png'){
        cb(null,true)

    }
    else{
        cb(null,false)
    }

}

const upload=multer({
    storage:storage,
    fileFilter:fileFilter,
    limits:{
        fileSize:1024*1024*5
    }
})

const uploadSingle=(filedName)=>{
    return (req,res,next)=>{
        const uploadItem=upload.single(filedName)
        uploadItem(req,res,function (err){
            if(err instanceof multer.MulterError){
                return res.status(400).send({message:err.message,errorType:"Multer Error"})

            }
            else if(err){
                return  res.status(400).send({message:err.message,errorType:"Normal Error"})
            }
            else{
                next()
            }
        })
    }

}

const uploadMultiple=(fileCount,fieldName)=>{
    return (req,res,next)=>{
        const uploadItem=upload.array(fileCount,fieldName)
        uploadItem(req,res,function (err){
            if(err instanceof multer.MulterError){
                return res.status(400).send({message:err.message,errorType:"multer error"})
            }
            else if(err){
                return res.status(400).send({message:err.message,errorType:"Normal error"})
            }
            else{
                next()
            }
        })
    }

}
module.exports ={uploadSingle,uploadMultiple}