const botconfig = require("./botconfig");
const Discord = require("discord.js");

var bot = new Discord.Client();



bot.on("ready", async () => {
    console.log(`${bot.user.username} is online!`);
    bot.user.setActivity("Abonniert ReisMiner auf YT!")
});

bot.on("message", function (message) {
    if (message.author.equals(bot.user)) return;

    if (message.content == "oke" || message.content == "Oke") {
        message.channel.send("oke");
    }
    if (message.content == "hmm" || message.content == "Hmm") {
        message.channel.send(":D");
    }

    var args = message.content.substring(botconfig.prefix.length).split(" ");

    switch (args[0].toLowerCase()) {
        case"ping":
            message.channel.send("Zu Hoch :grinning:");
            break;
        default:
            message.channel.send("Nur diese Commands gehen: $play, $skip, $stop");
    }

});

bot.on("guildMemberAdd", function(member){
   member.build.channels.find("name", "general").send(" Wilkommen auf dem Discordserver und viel spass in der Community");

   member.addRole(member.guild.role.find("name", "Zuschauer"));
});
bot.login(process.env.BOT_TOKEN);