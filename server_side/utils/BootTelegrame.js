const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config()
const Categorie = require("../models/Categorie");
const Service = require("../models/Service");
const User = require("../models/User")

const token = process.env.BOOT_TOKEN
const bot = new TelegramBot(token,{polling : true })


bot.onText(/\/start/,(message)=>{
    const chatId = message.chat.id ;     
        bot.sendMessage(chatId, 'Welcome to WorkUp Boot\n '+
                        "Type /menu to see the menu options.");
})

bot.onText(/\menu/,(message)=>{
  const chatId = message.chat.id;
  
  const msg = "choose an option :\n"+
              "<b>1. show All categories </b>\n" + 
              "<b>2. show Services available </b>\n"+
              "<b>3. show Service Provider </b>\n"
              bot.sendMessage(chatId,msg,{ parse_mode: "HTML",});
})
bot.on("message",async (message)=>{
  const chatId = message.chat.id ;
  let m = "" 
  switch(message.text){
    case '1':
      const categories = await Categorie.find();
        m += 'This is All Categories :\n'
        categories.map(cat=>{
          m += cat.name +"\n";
        })
        m += "To show Services with a Categorie please type the categorie name";
        bot.sendMessage(chatId,m);
      break;
    case '2':
      let i =0;
        const services = await Service.find().limit(6);
        services.map(async service =>{
         let user = await User.findById(service.userId);
         let c = await Categorie.findById(service.categorieId);  //to store categorie Name
         m += "\t\t\t\t\t\t*****************\n Service Provider Name : "+ user.username + "  \n title : " + service.title + " \n description :" + service.desc+"\ncategory :"+c.name+ "\nPrice : "+service.price+"$\nnumber of sales :"+service.sales+"\n";
        i++;
        if(i==6){
          bot.sendMessage(chatId,m,{ parse_mode: 'Markdown' });
        }
        })
      
      break;
      case '3':
          const users = await User.find({role:"Service Provider"});
          console.log(users);
          users.map(user=>{
            m +="<strong>User Name </strong> : "+ user.username + " <strong>country</strong> : "+user.country;
          })
          bot.sendMessage(chatId,m,{ parse_mode: 'HTML' });
        break;
    }
 
})

