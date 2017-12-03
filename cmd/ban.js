exports.run = (bot, message, args = []) => {
    if(message.channel.type == "text") {
        message.channel.send("Ban(wave) starting!");
        if (bot.personCanBan(message)) {
            message.mentions.members.array().forEach(user => {
                var allowBan = false;
                message.member.roles.array().forEach(role => {
                    if(role.comparePositionTo(user.highestRole) > 0) {
                        allowBan = true;
                    }
                });
                if (allowBan) {

                    user.ban().then(() => {
                        message.channel.send("Banished " + user.user.username + "#" + user.user.discriminator + "!");
                        user.send("You have been banished from " + message.guild.name + "!");
                    });
                } else {

                    message.channel.send("Did not banish " + user.user.username + "#" + user.user.discriminator + ", they are above you in the role hierarchy!");
                    user.send("User " + message.author.username + "#" +  message.author.discriminator + " attempted to ban you!");
                }
            });

        } else {
            message.channel.send("You do not have permissions to ban");
        }
        message.channel.send("Ban(wave) finished!");
    }
};

exports.conf = {
    aliases: ["permban", "banish", "pb"],
    permLevel: 3
};

exports.help = {
    name : "ban",
    description: "Banish someone from the guild! (Not from bot though!)",
    usage: "banish <@USER> [Optionally more users]"
};