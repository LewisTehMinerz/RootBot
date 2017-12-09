exports.run = (bot, message, args = []) => {
    bot.guilds.get("386523341646725122").channels.get("387197080743182336").send("**" + message.author.username + "#" + message.author.discriminator + "** suggested: \n```" + message.content.replace("$suggest ", "") + "```");
};

exports.conf = {
    aliases: ["requestfeature"],
    permLevel: 0
};

exports.help = {
    name : "suggest",
    description: "Suggest something!",
    usage: "suggest SUGGESTION"
};