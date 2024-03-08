const nodemailer = require('nodemailer')
require('dotenv').config()


const sendEmail = async (email,subject,text)=>{
    try{
        const transporter = nodemailer.createTransport({
            host:"smtp.ethereal.email",
            service: process.env.SERVICE,
            port:Number(process.env.EMAIL_PORT),
            secure:Boolean(process.env.SECURE),
            auth:{
                user:process.env.USER,
                pass:process.env.PASS
            }
        })

        const jj =await transporter.sendMail({
            from:process.env.USER,
            to:email,
            subject:subject,
            text:text
        })
        console.log(jj+"EMAIL SENT SUCCESSFULLY")
    }catch(error){
        console.log(error);

    }
}

module.exports = sendEmail