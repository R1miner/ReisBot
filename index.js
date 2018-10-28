const botconfig = require("./botconfig");
const Discord = require("discord.js");

var bot = new Discord.Client();
function normalText(){
    if(message.content=="oke"||message.content=="Oke"){
        message.channel.send("oke");
    }
    if(message.content=="hmm"||message.content=="hmm"){
        message.channel.send(":D");
    }
}

bot.on("ready", async () => {
    console.log(`${bot.user.username} is online!`);
    bot.user.setActivity("Abonniert ReisMiner auf YT!")
});

bot.on("message",function(message){
    if(message.author.equals(bot.user))return;
    normalText();

    var args = message.content.substring(botconfig.prefix.length).split(" ");

    switch (args[0]){
        case"ping":
            message.channel.send("Zu Hoch :grinning:")
            break;
    }

});
bot.login(process.env.BOT_TOKEN);