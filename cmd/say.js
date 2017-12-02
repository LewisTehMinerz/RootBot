exports.run = (bot, message, args = []) => {

    if(args[0].toString().includes("-e"))
    {
      message.channel.send("@everyone " + args.splice(1).join(" "));
    }
    else if(args[0].toString().includes("-h")) 
    {
      message.channel.send("@here " + args.splice(1).join(" "));
    }
  else 
  {
    message.channel.send(args.splice(0).join(" "));
  }

  console.log(message.author.username + "#" + message.author.discriminator + " has used: " + message.toString());
  message.delete()
};
  
  exports.conf = {
    aliases: ["send"],
    permLevel: 2
  };
  
  exports.help = {
    name : "say",
    description: "Used to say things",
    usage: "say <MESSAGE>"
  };