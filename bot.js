const Discord = require("discord.js");
const bot = new Discord.Client({ fetchAllMembers: true });
const config = require("../config.json");
const fs = require("fs");
const moment = require("moment");
const log = (message) => {
  console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] ${message}`);
};

function loadCmds () {
bot.helptext = "```";
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.notes = require("./notes.json")
fs.readdir("./cmd/", (err, files) => {
  if (err) console.error(err);
  console.log(" ")
  log(`Loading a total of ${files.length} commands.`);
  files.forEach(f => {
    log("Loading command from: ./cmd/" +f)

    delete require.cache[require.resolve(`./cmd/${f}`)]
    let props = require(`./cmd/${f}`);
    if(props.wip) {
    }else{

        log(`Loading Command: ${props.help.name}`);
        bot.helptext = bot.helptext + props.help.name + " - " + props.help.description + "\n";
        bot.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            bot.aliases.set(alias, props.help.name);
        });
    }
  });
  console.log(" ")
});
}

loadCmds();
function getPrefix(guildID) {
    var contents = fs.readFileSync("./json/custom-prefixes.json");
// Define to JSON type
    var jsonContent = JSON.parse(contents);
    if(jsonContent["servers"][guildID] == undefined) {
        return config.prefix;
    } else {
        return jsonContent["servers"][guildID];
    }

}
function setPrefix(guildID, prefix) {
    var contents = fs.readFileSync("./json/custom-prefixes.json");
    var jsonContent = JSON.parse(contents);
    jsonContent["servers"][guildID] = prefix;
    fs.writeFileSync("./json/custom-prefixes.json", JSON.stringify(jsonContent));
}
bot.on("message",message => {

  if(message.channel.type == "dm") {

  } else {
      if (!message.content.startsWith(getPrefix(message.guild.id))) return;
      let command = message.content.toLocaleLowerCase().split(" ")[0].slice(getPrefix(message.guild.id).length);
      let args = message.content.split(" ").slice(1);
      let perms = bot.elevation(message);
      let cmd;

      if (bot.commands.has(command)) {
          cmd = bot.commands.get(command);
      } else if (bot.aliases.has(command)) {
          cmd = bot.commands.get(bot.aliases.get(command));
      }
      if (cmd) {
          if (perms < cmd.conf.permLevel) {
              message.channel.send("You do not have the permission level required, \n to perform this action. \n \n You have a permission level of: " + perms + "\n You need a permission level of " + cmd.conf.permLevel);
              return;
          }
          cmd.run(bot, message, args, perms);
      }

      if (message.author.id == config.ownerid) {
          if (message.content === config.prefix + "reload") {
              loadCmds()
              message.channel.send(`All Commands Reloaded`)
          }
      }
      if (message.content === getPrefix(message.guild.id) + "reload" && message.author.id != config.ownerid) {
          message.react("⛔")
      }
      if(message.content.split(" ")[0] === getPrefix(message.guild.id) + "setprefix") {
          setPrefix(message.guild.id, message.content.split(" ")[1]);
          message.react("👌");
      }
  }
});

bot.on("ready", () => {
  bot.user.setGame("with " + bot.users.size +" users.", "https://twitch.tv/you_best")
  log(`ROOTBOT: Ready to serve ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} servers.`);
});
bot.on("error", console.log);
bot.on("warn", console.warn);

bot.login(config.tokens.discord);

bot.reload = function(command) {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./cmd/${command}`)];
      let cmd = require(`./cmd/${command}`);
      bot.commands.delete(command);
      bot.aliases.forEach((cmd, alias) => {
        if (cmd === command) bot.aliases.delete(alias);
      });

      bot.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        bot.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};
bot.personCanKick = function(message) {
    let ban_perm = false; //Bad Copypasta strikes back again!
    message.member.roles.forEach(roleX => {
        if(roleX.hasPermission('KICK_MEMBERS')) {
            ban_perm = true;
        }
    });
    return ban_perm;
}
bot.personCanMute = function(message) {
    let ban_perm = false; // And again!
    message.member.roles.forEach(roleX => {
        if(roleX.hasPermission('MANAGE_MESSAGES')) {
            ban_perm = true;
        }
    });
    return ban_perm;
}
bot.personCanBan = function(message) {
    let ban_perm = false;
    message.member.roles.forEach(roleX => {
        if(roleX.hasPermission('BAN_MEMBERS')) {
            ban_perm = true;
        }
    });
    return ban_perm;
};
bot.botCanBan = function(message) {
    let ban_perm = false;
    message.guild.me.roles.forEach(roleX => {
        if(roleX.hasPermission('BAN_MEMBERS')) {
            ban_perm = true;
        }
    });
    return ban_perm;
};

bot.elevation = function(message) {
  let permlvl = 0;

  let staff_role = message.guild.roles.find("name", "Staff");
  if(staff_role && message.member.roles.has(staff_role.id)) permlvl = 1;
  message.member.roles.array().forEach(role => {
      if(role.hasPermission("MANAGE_MESSAGES")) {
          permlvl = 1;
      }
  });
  let mod_role = message.guild.roles.find("name", "Moderator");
  if(mod_role && message.member.roles.has(mod_role.id)) permlvl = 2;
    message.member.roles.array().forEach(role => {
        if(role.hasPermission("KICK_MEMBERS")) {
            permlvl = 2;
        }
    });

    let admin_role = message.guild.roles.find("name", "Moderator+");
  if(admin_role && message.member.roles.has(admin_role.id)) permlvl = 3;
    message.member.roles.array().forEach(role => {
        if(role.hasPermission("BAN_MEMBERS")) {
            permlvl = 3;
        }
    });

    if(message.author.id === config.ownerid) permlvl = 4; // Liam
    if(message.author.id === "133885827523674112") permlvl = 4; // Sascha_T
  return permlvl;
};

function exitHandler(options, err) {
    if (options.cleanup) console.log('clean');
    if (err) console.log(err.stack);
    if (options.exit) process.exit();
}
//do something when app is closing
process.on('exit', exitHandler.bind(null,{cleanup:true}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {c:true}));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, {exit:true}));
process.on('SIGUSR2', exitHandler.bind(null, {exit:true}));
process.on('SIGHUP', exitHandler.bind(null, {exit:true}));
//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));