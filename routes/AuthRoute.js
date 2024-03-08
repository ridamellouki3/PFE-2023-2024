const express = require('express')
const {registre , login,logout} = require('../controllers/AuthController')
const multer = require('multer')
const path = require('path')
const router = express.Router();
const passport = require('passport')

const User = require("../models/User");
const jwt = require('jsonwebtoken');
require('dotenv').config();


const setCookie = (request, accessToken) => {
  request.res.cookie("accessToken", accessToken, {
        secure: true,
      sameSite: "none",
  });
}
router.get('/api/auth',(req,res)=>{
  res.send("<a href='/google'>AUTH</a>")
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ storage: storage });




router.get('/',(req,res)=>{
    res.send("<a href='/api/auth/google'>AUTH</a>")
  })
router.post('/login',login);
router.post('/registre',upload.single('img'),registre);
router.get('/logout',logout);
router.get('/google',passport.authenticate('google',{scope:['email','profile']}))
router.get('/google/callback',passport.authenticate('google',{
  successRedirect:'/protected',
  failureRedirect:'/failure'
}))



//OAUth 2.0



const GoogleStrategy = require('passport-google-oauth2').Strategy ;


passport.serializeUser((user, done) => {
  console.log('user id :',user.id)
  done(null, user._id);
});


passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    //console.log(user);
    done(null, user);
  } catch (err) {
    console.error(err.message);
    done(err);
  }
});

passport.use(
  new GoogleStrategy({
  clientID:     process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/api/auth/google/callback",
  passReqToCallback: true
},
async function(request, accessToken, refreshToken, profile, done) {
    try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user ) {
            // Create a new user if not found
            user = new User({ googleId: profile.id, email: profile.email,img : profile.picture });
            await user.save();   
        }
request.user = user;
        console.log(request.user);
        setCookie(request,accessToken);
        return done(null,user);
    } catch (err) {
      console.log(err.message)
        return done(err.message);
    }
}
));






module.exports = router