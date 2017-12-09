const math = require("math");
exports.run = (bot, message, args = []) => {
    var amount = parseInt(args[0]);
    var x = 0;
    if(amount > 100) {
        while(x < math.ceil(x / 100)) {
            message.channel.fetchMessages({limit: amount}).then(messages => {
                messages.array().forEach(message => {
                    message.delete();
                });

            });
            x = x + 1;
        }
        return;
    }
    message.channel.fetchMessages({limit: amount}).then(messages => {
        messages.array().forEach(message => {
            message.delete();
        });

    });


};

exports.conf = {
    aliases: ["clear"],
    permLevel: 2
};

exports.help = {
    name : "purge",
    description: "Removes messages",
    usage: "purge [AMOUNT]"
};