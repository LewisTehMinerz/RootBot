const fs = module.require("fs");

exports.run = (bot, message, args = []) => {
   
    bot.notes[message.mentions.users.first().id.toString()] = {
        guild: message.guild.id,
        time: Date.now(),
        by: message.author.username + "#" + message.author.discriminator,
        person: message.mentions.users.first().username.toString() + "#" + message.mentions.users.first().discriminator.toString(),
        for: args.splice(2).join(" ")
    }

    fs.writeFile("./notes.json", JSON.stringify(bot.notes, null, 4), err =>{
        if(err) console.log(err);
        message.channel.send("Noted 👍")
    });

    message.guild.channels.get("384301034870407169").send({embed: {
        color: 15158332,
        author: {
          name: message.author.username,
          icon_url: message.author.avatarURL
        },
        title: message.mentions.users.first().username + "#" + message.mentions.users.first().discriminator + " note",
        description: + message.author.username + "#" + message.author.discriminator + " is noting " + message.mentions.users.first().username.toString() + "#" + message.mentions.users.first().discriminator.toString()  + " for " + args.splice(1).join(" "),
        timestamp: new Date(),
        footer: {
          icon_url: message.author.avatarURL,
          text: "NOTE"
        }
      }
    });
  message.delete()

}
      exports.conf = {
        aliases: ['notes'],
        permLevel: 1
      };
      
      exports.help = {
        name : "note",
        description: "Used to note users.",
        usage: "note <@USER> <NOTE>"
      };