function setPrefixForServer(serverX, newPrefix) {
    var mysql = require("mysql");
    var config = require("../config.json");
    var con;
    con = mysql.createConnection({
        host: config.host,
        user: config.user,
        database: config.db,
        password: config.pass
    });
    con.connect();
    var update = false;
    con.query("SELECT prefix FROM servers WHERE serverid=".concat(serverX.toString()), function (error, results, fields) {
        if (error) throw error;
        if(results !== null) {
            update = true;
        }
    });
    if(update) {

        con.query("UPDATE servers SET prefix = \""+ newPrefix + "\" WHERE serverid = "+ serverX.toString() + ";");
        delete mysql;
        con.destroy();
    } else {
        con.query("INSERT INTO `servers`(`prefix`, `serverid`) VALUES (\""+ newPrefix + "\",\"" + serverX.toString() + "\");");
        delete mysql;
        con.destroy();
    }
}
function getPrefixForServer(serverX) {

    var mysql = require('mysql');
    var config = require("../config.json");
    var con = mysql.createConnection({
        host: config.host,
        user: config.user,
        password: config.pass,
        database: config.db
    });
    con.query("SELECT prefix FROM servers WHERE serverid=".concat(serverX.toString()) + ";", function (error, results, fields) {
        if (error) throw error;
        if(!results[0].prefix == null) {
            delete mysql;
            con.destroy();
            return results[0].prefix.toString();
        }else{
            delete mysql;
            con.destroy();
            return config.prefix;
        }
    });
}
exports.run = (botX, message, args = []) => {
    try {
        const prefix = args[0];
        console.log(prefix);
        console.log(getPrefixForServer(message.guild.id));
        setPrefixForServer(message.guild.id, prefix)

    } catch (err) {
        message.channel.send("```" + err.toString() + "```");
    }
}

exports.conf = {
    aliases: ["cp"],
    permLevel: 0
};

exports.help = {
    name : "changeprefix",
    description: "Change your prefix!",
    usage: "changeprefix <@PREFIX>"
};