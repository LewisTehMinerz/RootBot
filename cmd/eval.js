exports.run = (bot, message, args = []) => {
        try {
          const code = args.join(" ");
          let evaled = eval(code);
    
          if (typeof evaled !== "string")
            evaled = require("util").inspect(evaled);
    
          message.channel.send(evaled, {code:"xl"});
        } catch (err) {
          message.channel.send("```" + err.toString() + "```");
        }
      }
          
          exports.conf = {
            aliases: ["evaluation", "do"],
            permLevel: 4
          };
          
          exports.help = {
            name : "eval",
            description: "Used to issue console commands VIA chat.",
            usage: "eval <CODE>"
          };