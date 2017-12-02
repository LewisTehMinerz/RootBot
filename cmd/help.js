exports.run = (bot, message, args = []) => {

    message.author.send(
        "```" +
        ">help | Current Command" +
        "\n>dm | Used to direct message users as the bot" +
        "\n>eval | Used to issue console commands VIA chat." +
        "\n>report | Used to report users or staff members" +
        "\n>say | Used to say things" +
        "\n>bean | Beans someone" +
        "\n>note | Used to note users." +
        "```"
    )
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