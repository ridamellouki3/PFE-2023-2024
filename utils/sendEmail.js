const nodemailer = require('nodemailer')
require('dotenv').config()


const sendEmail = async (email,text)=>{
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
            subject:"Verify Your Email",
            html:`
            <div class=""><div class="aHl"></div><div id=":nx" tabindex="-1"></div><div id=":nn" class="ii gt" jslog="20277; u014N:xr6bB; 1:WyIjdGhyZWFkLWY6MTc5Mjk4MzgwMTI2OTUxNTQ1OCJd; 4:WyIjbXNnLWY6MTc5Mjk4MzgwMTI2OTUxNTQ1OCJd"><div id=":nm" class="a3s aiL msg157324775924249187"><u></u>
<div style="height:100%;width:100%!important;line-height:1.6em;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;background-color:#f6f6f6;box-sizing:border-box;width:100%!important;margin:0">
    <table style="font-size:16px;width:100%;background-color:#f6f6f6;margin:0" bgcolor="#f6f6f6">
        <tbody><tr style="margin:0">
            <td style="vertical-align:top;margin:0" valign="top"></td>
            <td width="600" style="vertical-align:top;display:block!important;max-width:600px!important;clear:both!important;margin:0 auto" valign="top">
                <div style="max-width:600px;display:block;margin:0 auto;padding:25px">
                    <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:5px;background-color:#fff;margin:0" bgcolor="#ffffff">
                        <tbody><tr style="margin:0">
                            
                        </tr>
                        <tr style="margin:0">
                            <td style="vertical-align:top;margin:0;padding:15px 25px 20px 25px" valign="top">
                                <table width="100%" cellpadding="0" cellspacing="0" style="margin:0">
                                    <tbody><tr style="margin:0">
                                        <td style="vertical-align:top;margin:0;padding:0 0 20px" valign="top">
                                           <strong>Thank you for signing up with WorkUp!</strong>
                                        </td>
                                    </tr>
                                    <tr style="margin:0">
                                        <td style="vertical-align:top;margin:0;padding:0 0 20px;font-size:14px" valign="top">
                                            <p style="margin:0"><strong>Details</strong></p>
                                            <p>Please verify your email address by clicking the following link:</p>
                                        </td>
                                    </tr>
                                    <tr style="margin:0">
                                        <td style="vertical-align:top;margin:0;padding:0 0 20px" valign="top">
                                        <a href="${text}" style="font-size:18px;color:#fff;text-decoration:none;line-height:2em;font-weight:bold;display:inline-block;border-radius:6px;text-transform:capitalize;background-color:#0d6ef5;margin:0;border-color:#0d6ef5;border-style:solid;border-width:10px 30px" target="_blank" data-saferedirecturl="${text}" jslog="32272; 1:WyIjdGhyZWFkLWY6MTc5Mjk4MzgwMTI2OTUxNTQ1OCJd; 4:WyIjbXNnLWY6MTc5Mjk4MzgwMTI2OTUxNTQ1OCJd">Click here</a>
                                        </td>
                                    </tr>
                                </tbody></table>
                            </td>
                        </tr>
                    </tbody></table>
                    <table style="width:100%;color:#87888e;margin:0;clear:both;margin:0;padding:0px 25px 10px 25px;border-radius:0 0 5px 5px;line-height:1em;background-color:#fff" bgcolor="#FFF">
                        <tbody><tr style="margin:0">
                            <td style="font-size:14px">
                                <p style="margin-top:5px">If you did not sign up for WorkUp, you can safely ignore this email.</p>
                            </td>
                        </tr>
                    </tbody></table>
                </div>
            </td>
        </tr>
    </tbody></table>
<br>
          `
        })
        console.log(jj+"EMAIL SENT SUCCESSFULLY")
    }catch(error){
        console.log(error);

    }
}

module.exports = sendEmail