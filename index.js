const botconfig = require("./botconfig");
const Discord = require("discord.js");

var bot = new Discord.Client();


bot.on(`guildMemberAdd`, member =>{
    member.guild.channels.find("name", "main-chat").send(member.toString()+" Wilkommen auf dem Discordserver und viel spass in der Community")
    let role = message.guild.roles.find(r => r.name === "Zuschauer");
    member.addRole(role);
});

bot.on("ready", async () => {
    console.log(`${bot.user.username} is online!`);
    bot.user.setActivity("Abonniert ReisMiner auf YT!");
});

bot.on("message", function (message) {
    if (message.author.equals(bot.user)) return;

    if (message.content == "oke" || message.content == "Oke") {
        message.channel.send("oke");
        return;
    }
    if (message.content == "hmm" || message.content == "Hmm") {
        message.channel.send(":D");
        return;
    }

    var args = message.content.substring(botconfig.prefix.length).split(" ");

    switch (args[0].toLowerCase()) {
        case"ping":
            message.channel.send("Zu Hoch :grinning:");
            break;
    }

});

bot.login(process.env.BOT_TOKEN);