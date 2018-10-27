const botconfig = require("./botconfig");
const Discord = require("discord.js");

const bot = new Discord.Client();

bot.on("ready",async()=>{
    console.log(`${bot.user.username} is online!`);
    bot.user.setActivity("Abonniert ReisMiner auf YT!")
});

bot.on("message",async message =>{
    if(message.author.bot) return;
    if(message.channel.type==="dm") return;

    let prefix = botconfig.prefix;
    let messageArray=message.content.split(" ");
    let cmd= messageArray[0];
    let args= messageArray.slice(1);
    if(cmd===`oke`){
        return message.channel.send("oke");
    }
});

bot.login(process.env.BOT_TOKEN);