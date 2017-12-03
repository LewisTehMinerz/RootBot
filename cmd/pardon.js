exports.run = (bot, message, args = []) => {
    args.forEach(arg => {
        if(bot.personCanBan(message)) {
            message.guild.fetchBans().then(forE => {
                forE.forEach(ban => {
                    if(ban.id == arg) {
                        message.guild.unban(ban);
                        message.channel.send("Unbanned " + ban.username + "#" + ban.discriminator);
                    }
                });
            });
        }
    });
}

exports.conf = {
    aliases: ["pardon", "removeban"],
    permLevel: 3
};

exports.help = {
    name : "unban",
    description: "Unban one or multiple people ( https://support.discordapp.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID- )",
    usage: "unban <@USERID> [More UserID's]"
};