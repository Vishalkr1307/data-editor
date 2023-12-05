const nodeMailer=require("nodemailer")
require("dotenv").config()
const Otpverification=require("..//module/otpVerification")
const bcrypt=require("bcrypt")
const User=require("..//module/user")


const Mailgen = require("mailgen")

module.exports=async (id)=>{
    try{

        let user=await User.findOne({_id:id}).lean().exec()
        if(!user){
            throw new Error ("Email not found")
        }
        

        const transport=await nodeMailer.createTransport({
            service:'gmail',
            auth:{
                user:process.env.GMAIL_USER,
                pass:process.env.GMAIL_PASSWORD
            }
        })
        const otp=Math.round(1000+ Math.random()*9000).toString()
        const hashOtp=bcrypt.hashSync(otp,8)
        
        const newOtpVerification=await Otpverification({
            userId:user._id,
            otp:hashOtp,
            expiresAt:new Date().getTime() + 60*60*1000,
            createdAt:new Date()
        })
        await newOtpVerification.save()

        const mailGenerator=new Mailgen({
            theme:'default',
            product:{
                name:'Data-Editor',
                link:'http://localhost:2345'
            }
        })
        const emailGenerator={
            body:{
                name:`${user.name}`,
                intro:'Welcome to Data-Editor! we\'re very excited to have one board',
                action:{
                    instructions:'To get started with MailGen, Please click here',
                    button:{
                        color:'green',
                        text:otp,


                    }
                },
                outro:'Need help, or have questions? just reply to this email,we\'d love to help'
            }
        }

        const emailBody=mailGenerator.generate(emailGenerator)
        const emailText=mailGenerator.generatePlaintext(emailGenerator)

        const info=await transport.sendMail({
            from:process.env.GMAIL_USER,
            to:user.email,
            subject:'Otp verification',
            text:emailText,
            html:emailBody
        })
       

        return {status:`otp send to ${user.email}`,userId:user._id,email:user.email}
    }
    catch(err){
        return err
    }
        
        
}



