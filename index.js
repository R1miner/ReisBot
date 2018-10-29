const botconfig = require("./botconfig");
const Discord = require("discord.js");
const YTDL = require("ytdl-core");

var bot = new Discord.Client();
var servers = {};


bot.on('guildMemberAdd', member => {
    var role = member.guild.roles.get("506475646634033162");
    member.addRole(role);
    member.guild.channels.find("name", "main-chat").send(member.toString() + " Wilkommen auf dem Discordserver und viel spass in der Community");
});

bot.on("ready", async () => {
    console.log(`${bot.user.username} is online!`);
    bot.user.setActivity("Abonniert ReisMiner auf YT!");
});

function play(connection, message) {
    var server = servers[message.guild.id];

    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));
    server.queue.shift();

    server.dispatcher.on("end", function () {
        if (server.queue[0]) play(connection, message);
        else connection.disconnect();

    })
}

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
        case"play":
            if(!args[1]){
                message.channel.send("Bitte schreib ein nach Play.[$play youtube.com/watch?...]");
                return;
            }
            if (!message.member.voiceChannel) {
                message.channel.send("Du must in einem Voice kanal sein.");
                return;
            }
            if(!servers[message.guild.id]) servers[message.guild.id]={
                queue:[]
            };
            var server = servers[message.guild.id];

            server.queue.push(args[1]);

            if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection){
                play(connection, message);
            });

            break;
        case"stop":
            var server = servers[message.guild.id];
            if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
            break;

        case"skip":
            var server = servers[message.guild.id];
            if (server.dispatcher) server.dispatcher.end();
            break;
    }

});

bot.login(botconfig.token);