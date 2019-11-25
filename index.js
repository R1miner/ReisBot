const botconfig = require("./botconfig");
const Discord = require("discord.js");
const YTDL = require("ytdl-core");

var bot = new Discord.Client();
var servers = {};
var msg = message.content.ignoreCase();


bot.on('guildMemberAdd', member =>  {
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
    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"},{volume: 0.2}));
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

    var args = message.content.substring("$".length).split(" ");

    switch (args[0].toLowerCase()) {
        case"ping":
            message.channel.send("Zu Hoch :grinning:");
            break;
        case"play":
            if(!args[1]){
                message.channel.send("Bitte schreib ein Youtube Link nach Play. Also etwa so: $play youtube.com/watch?...");
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
        case"help":
            message.channel.send("$play YTlink für Musik ICH WÜRD DEN BOT EIN WENIG LEISER MACHEN. DIE MUSIK IST SEHR LAUT\n $skip lied überspringen \n $stop lied stoppen \n $ping zeigt ping an");
            break;
        case"streaminfo":
            message.channel.send("Montag ca 15:45 Uhr\n Mittwoch ca 16 Uhr oder früher\n Wochenende bestimmt auch einmal\nallgemein gilt : GLOCKE AKTIVIEREN! :grinning:");
            break;
    }

});

bot.login(botconfig.token);
