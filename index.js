const botconfig = require("./botconfig");
const Discord = require("discord.js");
const autoroleName = 'Zuschauer';
const interval =10;

var bot = new Discord.Client();


bot.on('guildMemberAdd', member => {
    member.guild.channels.find("name", "main-chat").send(member.toString()+" Wilkommen auf dem Discordserver und viel spass in der Community");
});

bot.on("ready", async () => {
    console.log(`${bot.user.username} is online!`);
    bot.user.setActivity("Abonniert ReisMiner auf YT!");

    var AutoAddRole = Roles.find('name',autoroleName);

    setInterval(function(){
        var i;
        for( i in client.users.array() ){
            var User = client.users.array()[i];
            var has_role = false;
            // Search users without roles
            if( User.bot == false ) {
                var r;
                for(r in Roles.array() ) {
                    var Role = Roles.array()[r];
                    if(Role.name != '@everyone') {
                        var Rolecheck = Role.members.find('id', User.id);
                        if(Rolecheck !== null) {
                            has_role = true;
                            break;
                        }
                    }
                }
                if(!has_role && User.presence.status == 'online') {
                    // Get member
                    var Member = client.guilds.array()[0].members.find('id', User.id);
                    Member.addRole(AutoAddRole.id);
                }
            }
        }
    }, interval);
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