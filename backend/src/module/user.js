const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const userschema=new mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true},
    password:{type:String,require:true},
    verify:{type:Boolean,default:false},
    // profile_pic:[{type:String,require:true}]
},{
    versionKey:false,
    timestamps:true
})
userschema.pre("save",function (next){
    if(!this.isModified("password")) return next();

    this.password=bcrypt.hashSync(this.password,8)
    next();

})
userschema.methods.checkPassword=function(password){
    return bcrypt.compareSync(password,this.password)
}

module.exports=mongoose.model("User",userschema)