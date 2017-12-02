exports.run = (bot, message, args = []) => {

  if(args.length < 1) return;
  if(message.mentions.users.size != 1)
  message.channel.send(message.mentions.users.first().avatarURL).then(msg => {
    console.log(msg.content)
    }).catch(err => {
      console.log(err)
    })
    console.log(message.author.username + "#" + message.author.discriminator + " has used: " + args.toString());     
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