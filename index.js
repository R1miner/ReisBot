const botconfig = require("./botconfig");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();


bot.on("ready",async()=>{
    console.log(`${bot.user.username} is online!`);
    bot.user.setActivity("Abonniert ReisMiner auf YT!")
});

var servers= {};

bot.on("message",async message =>{
    if(message.author.bot) return;
    if(message.channel.type==="dm") return;

    let prefix = botconfig.prefix;
    let messageArray=message.content.split(" ");
    let cmd= messageArray[0];
    let args= messageArray.slice(1);
    if(cmd===`hmm`||cmd===`Hmm`){
        return message.channel.send(":D");
    }
    if(cmd===`oke`||cmd===`Oke`){
        return message.channel.send("oke");
    }
    if(cmd===`${prefix}play`){
        message.channel.send("Bitte schreib ein Link hinein.");
        return;
        if(!message.member.voiceChannel){
            message.channel.send("Du must in einem Voice kanal sein.");
            return;
        }
    }


});

bot.login(process.env.BOT_TOKEN);