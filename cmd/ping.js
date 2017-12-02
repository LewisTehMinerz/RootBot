exports.run = (bot, message, args = []) => {
    message.channel.send("Pong! Wow that took " + bot.ping.toString() + " ms");   
};
      
      exports.conf = {
        aliases: ["pong", "lag"],
        permLevel: 0
      };
      
      exports.help = {
        name : "ping",
        description: "Pong",
        usage: "ping"
      };



/*
client.on('message', message => {
    if(message.content.startsWith("!ping")) {
            message.channel.send(new Date().getTime() - message.createdTimestamp + " ms");        
    }
}
*/