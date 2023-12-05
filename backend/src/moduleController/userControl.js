const express=require("express")
const router=express.Router()
const User=require("..//module/user")
const OtpVerification=require("..//module/otpVerification")
const {body,validationResult}=require("express-validator")
const formatOferror=require("..//util/valdation")
const newToken=require("..//util/token")
const bcrypt=require("bcrypt")
const passport=require("..//config/passport")

const {uploadSingle,uploadMultiple}=require("..//middleware/upload")

passport.serializeUser(function ({user,token},done){
    done(null,{user,token})

})
passport.deserializeUser(function ({user,token},done){
    done(null,{user,token})
})
const nameChain=()=>body("name").notEmpty().withMessage("name is not empty")
const emailChain=()=>body("email").notEmpty().isEmail().withMessage("email is required").custom(async (val)=>{
    const user=await User.findOne({email:val})
    if(user){
        throw new Error ("email is already registered")
    }
})
const passwordChain=()=>body("password").isLength({min:5}).withMessage("password mush have specail character")
const SentMail=require("..//util/sentMail")


router.post("/register",nameChain(),emailChain(),passwordChain(),async (req,res)=>{
    try{
        let error=validationResult(req)
        
        
        if(!error.isEmpty()){
            return res.status(400).send(formatOferror(error.array()).join(","))
        }
        const user=await User.create(req.body)

        const sentMail=await SentMail(user._id)
        return res.status(200).send(sentMail)

    }
    catch(err){
        return res.status(400).send("bad request")
    }
})

router.post("/login",body("email").notEmpty().isEmail().withMessage("please provide email"),async (req,res)=>{
    try{
        const error=validationResult(req)
        if(!error.isEmpty()){
            return res.status(400).send(formatOferror(error.array()).join(","))

        }
        let user=await User.findOne({email:req.body.email})
        if(!user){
            return res.status(400).send("User not found")
        }
        
        const matchPasssword=user.checkPassword(req.body.password)
        if(!matchPasssword){
            return res.status(400).send("passsword not match")
        }
        const SendData=await SentMail(user._id)
       if(SendData){

           return res.status(200).send(SendData)
       }
        
        


    }
    catch(err){
        
        return res.status(400).send("bad request")
    }
})

router.post("/verifyotp/:id",async (req,res)=>{
    try{
        const id=req.params.id
        const otp=req.body.otp
        if(!id && !otp){
            return res.status(400).send("please enter otp")

        }
        const user=await OtpVerification.find({userId:id}).lean().exec()
        if(user.length==0){
            return res.status(400).send("user not found")
        }
        const expiresAt=user[0].expiresAt
        const hashOtp=user[0].otp
        
        
        if(expiresAt<new Date()){
            
            
            await OtpVerification.deleteMany({userId:id})
            return res.status(400).send("your otp has expired")
        }
        else{
            
            let compareOtp=bcrypt.compareSync(otp.toString(),hashOtp)
            
            
            
            if(!compareOtp){
                return res.status(400).send("your otp is incorrect")
            }
            else{
                
                const user=await User.findByIdAndUpdate(id,{verify:true})
                
                await OtpVerification.deleteMany({userId:id})
                const token=newToken(user)

                return res.status(200).send({status:"your email has verified",token,user})


            }
        }
       

    }
    catch(err){
        
        return res.status(400).send("bad request")
    }

})
router.post("/resendotp/:id",async (req,res)=>{
    try{

        const id=req.params.id
        
       
        const user=await User.findOne({_id:id}).lean().exec()
        
        if(!user){
            return res.status(400).send("User does not exist")
        }
        await OtpVerification.deleteMany({userId:id})
        const sentData=await SentMail(user._id)
        return res.status(200).send({status:"Otp send again your email",sentData})
    }
    catch(err){
        return res.status(400).send("bad request")
    }

})
router.post("/login/forgetpassword",async (req,res)=>{
    try{
        const {email}=req.body
        if(!email){
            return res.status(400).send("please enter your email")



        }
        const user=await User.findOne({email:email}).lean().exec()
        if(!user){
            return res.status(400).send("user not found")
        }
        const sendData=await SentMail(user._id)
        return res.status(200).send({status:"otp sent successfully your email",sendData})

    }
    catch(err){
        return res.status(400).send("Bad request")
    }
})
router.patch("/login/forgetpassword/resetpassword/:id",async (req,res)=>{
    try{
        const id=req.params.id
        const {newPassword}=req.body
        const hashPassword=bcrypt.hashSync(newPassword,8)
        const user=await User.findByIdAndUpdate(id,{password:hashPassword})

        if(user){
            return res.status(200).send({status:"Your password has been successfully updated"})
        }

    }
    catch(err){
        return res.status(400).send("Bad request")
    }
})

router.get('/google',
  passport.authenticate('google', { scope: ['profile','email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  async function(req, res) {
    const token=req.user.token
    const user=req.user.user

    return res.status(200).redirect("/auth/google/success")
    
  });
router.get('/google/success',async (req,res)=>{

    return res.status(200).send("login success")
})

module.exports=router