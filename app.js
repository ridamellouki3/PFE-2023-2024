const express = require('express')
const {connection} = require('./db')
const session = require('express-session');
const authRouter = require('./routes/AuthRoute');
const conversationRoute = require("./routes/ConversationRoute");
const serviceRoute = require("./routes/ServiceRoute");
const messageRoute = require("./routes/MessageRoute");
const categorieRouter = require("./routes/CategorieRoute")
const orderRoute = require("./routes/OrderRoute");
const reviewRoute = require("./routes/ReviewRoute");
const userRoute = require("./routes/UserRoute");
const passport = require('passport')
const  swaggerjsdoc =require('swagger-jsdoc')
const swaggerui = require('swagger-ui-express'); 

require("dotenv").config()
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()


connection((err)=>{
    if(!err){
        app.listen(process.env.PORT)
        console.log('Server listen to',process.env.PORT)
    }else{
        console.log(err)
    }
})

const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
    title: "My API For My APP(PFE)",
    version: "1.0.0",
    description: "",
    contact:{
        name:"Rida Mellouki & Abdollah Nait Ouahmane",
        email:"r.mellouki9960@uca.ac.ma"
    }
    },
    servers:[{
        url:"http://localhost:4000/"
    }]
    };

    const options = {
        swaggerDefinition,
        apis: ["./routes/*.js"], // Path to the API routes in your Node.js application
        };




app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false, 
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
      }
}));
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(express.static('uploads'));



app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth',authRouter)
app.use('/api/conversations',conversationRoute)
app.use("/api/services", serviceRoute)
app.use("/api/messages",messageRoute)
app.use("/api/categories",categorieRouter);
app.use("/api/orders", orderRoute)
app.use("/api/reviews", reviewRoute);
app.use("/api/users",userRoute);

const isLogIn = (req, res, next) => {
    if (!req.cookies['connect.sid']) {
        return next(); 
    } else {
        res.redirect('/protected');
    }
};


app.get('/protected',(req,res)=>{
    console.log(req.user);
    res.send("<h1>Hello"+ req.user +"</h1>")
})
app.get('/failure',isLogIn,(req,res)=>{
    
    res.send("<h1>grr</h1>")
})
const spacs = swaggerjsdoc(options);
app.use('/api-docs',swaggerui.serve,swaggerui.setup(spacs))
