exports.run = (bot, message, args = []) => {



    message.author.send(bot.helptext + "```");
    message.react("📜");

    };
      
      exports.conf = {
        aliases: ["?"],
        permLevel: 0
      };
      
      exports.help = {
        name : "help",
        description: "Helps you",
        usage: "help"
      };