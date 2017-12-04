exports.run = (bot, message, args = []) => {
    if (bot.personCanMute(message)) {
        message.mentions.members.array().forEach(user => {
            var allowBan = false;
            message.member.roles.array().forEach(role => {
                if (role.comparePositionTo(user.highestRole) > 0) {
                    allowBan = true; //bad copypasta... Dont care tho.
                }
            });
            if (allowBan) {

                var ToMute = message.mentions.members.array().forEach(memberX => {
                    if (message.guild.roles.find("name", "Muted")) {
                        var MutedRole = message.guild.roles.find("name", "Muted");
                        message.guild.channels.array().forEach(channel => {
                            channel.overwritePermissions(MutedRole, {
                                SEND_MESSAGES: false,
                                READ_MESSAGES: true
                            }).then({});
                        });
                        if (memberX.roles.has(MutedRole.id)) {
                            memberX.removeRole(MutedRole).then(() => {
                                message.channel.send("Unmuted " + memberX.user.username + "#" + memberX.user.discriminator);
                            });
                        } else {
                            memberX.addRole(MutedRole).then(() => {
                                message.channel.send("Muted " + memberX.user.username + "#" + memberX.user.discriminator);
                            });
                        }
                    } else {
                        message.guild.createRole({
                            name: "Muted"
                        }).then(() => {
                            var MutedRole = message.guild.roles.find("name", "Muted");
                            message.guild.channels.array().forEach(channel => {
                                channel.overwritePermissions(MutedRole, {
                                    SEND_MESSAGES: false,
                                    READ_MESSAGES: true
                                }).then(() => {

                                });
                            });
                            if (memberX.roles.has(MutedRole.id)) {
                                memberX.removeRole(MutedRole).then(() => {
                                    message.channel.send("Unmuted " + memberX.user.username + "#" + memberX.user.discriminator);
                                });
                            } else {
                                memberX.addRole(MutedRole).then(() => {
                                    message.channel.send("Muted " + memberX.user.username + "#" + memberX.user.discriminator);
                                });
                            }
                        });
                    }
                });
            }
        });
    };
}
exports.conf = {
    aliases: ["mutify"],
    permLevel: 1
};

exports.help = {
    name : "mute",
    description: "Mutes someone (That alias tho) also unmutes if person is muted.",
    usage: "mute <@USER>"
};