const botconfig = require("./botconfig");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client();
const YTDL = require("ytdl-core");
bot.commands = new Discord.Collection();


bot.on("ready", async () => {
    console.log(`${bot.user.username} is online!`);
    bot.user.setActivity("Abonniert ReisMiner auf YT!")
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

bot.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    var args = messageArray.slice(1);
    if (cmd === `hmm` || cmd === `Hmm`) {
        return message.channel.send(":D");
    }
    if (cmd === `oke` || cmd === `Oke`) {
        return message.channel.send("oke");
    }
    if (cmd === `${prefix}play`) {
        if (!message.member.voiceChannel) {
            message.channel.send("Du must in einem Voice kanal sein.");
            return;
        } else {
            message.channel.send("Bitte schreib ein Link hinein.");
            if (!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            }

            if (!messge.guild.voiceConnection) message.member.voiceChannel.join().then(function (connection) {
                play(connection, message);

            })
        }
    }
    if (cmd === `${prefix}skip`) {
        var server = servers[message.guild.id];
        if (server.dispatcher) server.dispatcher.end();
    }
    if (cmd === `${prefix}stop`) {
        var server = servers[message.guild.id];
        if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
    }

    switch (args[0]) {
        case `${prefix}play`:
            message.channel.send("check");
            if(!args[1]){
                message.channel.send("Bitte schreib ein Link hinein.");
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

            if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection){
               play(connection, message);
            });
            break;
    }

});

bot.login(process.env.BOT_TOKEN);