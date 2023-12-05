const  GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport=require("passport")
const User=require("..//module/user")
const { v4: uuidv4 } = require('uuid')
const newToken=require("..//util/token")
require("dotenv").config()

passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:2345/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
    let user=await User.findOne({email:profile._json.email})
    if(!user){
        user=await User.create({name:profile._json.name,email:profile._json.email,password:uuidv4(),verify:true})
    }
    
    const token=newToken(user)
    cb(null,{user,token})
  }
));

module.exports=passport