const express = require("express");
const { registre, login, logout } = require("../controllers/AuthController");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const passport = require("passport");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const setCookie = (request, token) => {
  request.cookie("accessToken", token, {
    //httpOnly: true,
    secure: true,
    sameSite: "none",
  });
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

router.get("/", (req, res) => {
  res.send("<a href='/api/auth/google'>AUTH</a>");
});

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: The username of the user.
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user.
 *         password:
 *           type: string
 *           description: The password of the user.
 *         gender:
 *           type: string
 *           enum: [Male, Female]
 *           description: The gender of the user.
 *         img:
 *           type: string
 *           description: The image URL of the user.
 *         country:
 *           type: string
 *           description: The country of the user.
 *         phone:
 *           type: string
 *           description: The phone number of the user.
 *         desc:
 *           type: string
 *           description: The description of the user.
 *         managerId:
 *           type: string
 *           format: uuid
 *           description: The ID of the manager if the user is a service provider.
 *         googleId:
 *           type: string
 *           description: The Google ID of the user if authenticated via Google.
 *         role:
 *           type: string
 *           enum: [Client, Manager, Service Provider]
 *           description: The role of the user.
 *         verified:
 *           type: boolean
 *           description: Indicates whether the user account is verified.
 *       required:
 *         - username
 *         - email
 *         - img
 *         - gender
 *         - role
 *         - verified
 */


/**
 * @swagger
 * /api/auth/registre:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Register a new user
 *     description: Endpoint to register a new user.
 *     consumes:
 *       - multipart/form-data
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: formData
 *         name: email
 *         type: string
 *         required: true
 *         description: Email address of the user.
 *       - in: formData
 *         name: password
 *         type: string
 *         required: true
 *         description: Password of the user.
 *       - in: formData
 *         name: img
 *         type: file
 *         required: true
 *         description: Image of the user.
 *     responses:
 *       201:
 *         description: User registered successfully. An email will be sent for verification.
 *       400:
 *         description: Bad request. Either the email is not valid or the password is not strong enough.
 *       500:
 *         description: Internal server error. Image upload is required.
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login user
 *     description: Endpoint to authenticate and login a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format : email
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: User logged in successfully. A JWT token is returned.
 *       '201':
 *         description: User not verified. An email will be sent for verification.
 *       '400':
 *         description: Bad request. Invalid email or password.
 */

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Logout user
 *     description: Endpoint to logout a logged-in user.
 *     responses:
 *       '200':
 *         description: User logged out successfully.
 */
/**
 * @swagger
 * /api/auth/google:
 *   get:
 *     tags:
 *       - Google OAuth
 *     summary: Login with Google
 *     description: Endpoint to authenticate and login a user using Google OAuth.
 *     responses:
 *       '302':
 *         description: Redirect to Google authentication page.
 */


//Token 

/**
 * @swagger
 * components:
 *   schemas:
 *     Token:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           format: uuid
 *           description: The ID of the user associated with the token.
 *         token:
 *           type: string
 *           description: The token value.
 *       required:
 *         - userId
 *         - token
 */
router.post("/login", login);
router.post("/registre", upload.single("img"), registre);
router.post("/logout", logout);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:5173/",
    failureRedirect: "/failure",
  })
);

//OAUth 2.0

const GoogleStrategy = require("passport-google-oauth2").Strategy;

passport.serializeUser((user, done) => {
  console.log("user id :", user.id);
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
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
       setCookie(request.res,accessToken)
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          // Create a new user if not found
          user = new User({
            username:profile.displayName,
            googleId: profile.id,
            email: profile.email,
            img: profile.picture,
            verified: true,
          });
          await user.save();
        }
        return done(null, user);
      } catch (err) {
        console.log(err.message);
        return done(err.message);
      }
    }
  )
);

module.exports = router;
