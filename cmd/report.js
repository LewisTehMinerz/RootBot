exports.run = (bot, message, args = []) => {
    
    message.guild.channels.get("380743479510433792").send({embed: {
        color: 15158332,
        author: {
          name: message.author.username,
          icon_url: message.author.avatarURL
        },
        title: message.author.username + "#" + message.author.discriminator + " VS " + message.mentions.users.first().username.toString() + "#" + message.mentions.users.first().discriminator.toString(),
        description: "<@" + message.author.id + "> is reporting <@" + message.mentions.users.first().id.toString() + "> for " + args.splice(1).join(" "),
        timestamp: new Date(),
        footer: {
          icon_url: message.author.avatarURL,
          text: "REPORT"
        }
      }
    });
  message.delete()
};
      
      exports.conf = {
        aliases: ["report", "abuse"],
        permLevel: 0
      };
      
      exports.help = {
        name : "report",
        description: "Used to report users or staff members",
        usage: "report <@USER> <REASON>"
      };