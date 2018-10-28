const botconfig = require("./botconfig");
const Discord = require("discord.js");

var bot = new Discord.Client();

bot.on("ready",function () {
    bot.setActivity("Abonniert ReisMiner auf YT!")
});

bot.on("message",function(message){
    if(message.author.equals(bot.user))return;

    if(message.content=="oke"||message.content=="Oke"){
        message.channel.sendMessage("oke");
    }
    if(message.content=="hmm"||message.content=="hmm"){
        message.channel.sendMessage("oke");
    }
});
bot.login(process.env.BOT_TOKEN);