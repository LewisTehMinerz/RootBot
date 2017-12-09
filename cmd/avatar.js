exports.run = (bot, message, args = []) => {

    if(message.content.includes("@everyone")) {
        if(message.guild.members.length <= 25) {
            message.guild.members.forEach(user => {
                try {
                    message.channel.send(user.avatarURL);
                }catch(ex) {
                    message.channel.send("User " + user.user.username + "#" + user.user.discriminator + " has the default avatar, OR an error occured.");
                }

            });
        } else {
            message.channel.send("Too many users.");
        }
        return;
    }
  message.mentions.users.array().forEach(user => {
      try {
          message.channel.send(user.avatarURL);
      } catch(ex) {
      }

  });

  };
      
      exports.conf = {
        aliases: ["profileimage", "av"],
        permLevel: 0
      };
      
      exports.help = {
        name : "avatar",
        description: "Shows you the users avatar",
        usage: "avatar <@USER>"
      };
