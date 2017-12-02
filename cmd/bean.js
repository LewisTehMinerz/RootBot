exports.run = (bot, message, args = []) => {
    
        message.channel.send("👋 Successfully beaned <@" + message.mentions.users.first().id + ">")
        message.mentions.users.first().send("You have been beaned in the Lulurd's Community Server")
        };
          
          exports.conf = {
            aliases: ["fban"],
            permLevel: 0
          };
          
          exports.help = {
            name : "bean",
            description: "Beans someone",
            usage: "bean"
          };