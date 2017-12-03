exports.run = (bot, message, args = []) => {
    message.mentions.members.array().forEach(member => {
        if (bot.personCanKick(message)) {
            message.mentions.members.array().forEach(user => {
                var allowBan = false;
                message.member.roles.array().forEach(role => {
                    if (role.comparePositionTo(user.highestRole) > 0) {
                        allowBan = true; //bad copypasta... Dont care tho.
                    }
                });
                if (allowBan) {
                    member.kick().then(() => {
                        message.channel.send("Kicked " + member.user.username + "#" + member.user.discriminator);
                    });
                }
            });
        }

    });
}

exports.conf = {
    aliases: ["goaway"], // best alias.
    permLevel: 2
};

exports.help = {
    name : "kick",
    description: "Kick one or multiple people",
    usage: "kick <@USER> [More Users]"
};