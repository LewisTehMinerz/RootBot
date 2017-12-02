exports.run = (bot, message, args = []) => {

    message.mentions.users.first().send(args.splice(1).join(" "));
    console.log(message.author.username + "#" + message.author.discriminator + " has used: " + args.toString());
    message.delete()
};
      
      exports.conf = {
        aliases: ["directmessage", "pm"],
        permLevel: 2
      };
      
      exports.help = {
        name : "dm",
        description: "Used to direct message users as the bot",
        usage: "dm <@USER> <MESSAGE>"
      };