const botconfig = require("./botconfig");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

fs.readdir("./commands",(err,files)=>{
    if(err)console.log(err);

    let jsfile = files.filter(f => f.split(".").pop()==="js")
    if(jsfile.lenght <= 0){
        console.log("Konnte Datei nicht finden!")
        return;
    }

    jsfile.forEach((f,i)=>{
       let props = require(`.commands/${f}`);
       console.log(`${f} loaded`);
       bot.commands.set(props.help.name,props);
    });
});

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
    if(cmd===`hmm`){
        return message.channel.send(":D");
    }

});

bot.login(process.env.BOT_TOKEN);