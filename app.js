const express = require('express')
const {connection} = require('./db')
const authRouter = require('./routes/AuthRoute');
const conversationRoute = require("./routes/ConversationRoute");
const serviceRoute = require("./routes/ServiceRoute");
const messageRoute = require("./routes/MessageRoute");
const categorieRouter = require("./routes/CategorieRoute")
const orderRoute = require("./routes/OrderRoute");
const reviewRoute = require("./routes/ReviewRoute");
const userRoute = require("./routes/UserRoute");


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


app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(express.static('uploads'));

app.use('/api/auth',authRouter)
app.use('/api/conversations',conversationRoute)
app.use("/api/services", serviceRoute)
app.use("/api/messages",messageRoute)
app.use("/api/categories",categorieRouter);
app.use("/api/orders", orderRoute)
app.use("/api/reviews", reviewRoute);
app.use("/api/users",userRoute);