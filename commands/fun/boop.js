const Discord = require("discord.js");

module.exports = {
    name: "boop",
    aliases: ["boop", "boopthesnoot"],
    category: "fun",
    description: "Boops",
    usage: "[usage]",
    run: async (client, message, args) => {
        var Channel = message.channel.name
        if (message.content === "-boop") {
            if (Channel != "boop") {
                message.channel.send('U no way canz do thot thing here, ' + message.author);
            } else {
                var options = [
                    "https://imgur.com/5Ys1S8h.gif",
                    "https://imgur.com/mxIdWOM.gif",
                    "https://imgur.com/cAti7iz.gif",
                    "https://imgur.com/oJSI1YM.gif",
                    "https://imgur.com/J9cXN7h.gif",
                    "https://imgur.com/tvsFL1s.gif",
                    "https://imgur.com/xivFY4H.gif",
                    "https://imgur.com/nmZ1dHL.gif",
                    "https://imgur.com/ZPecqDO.gif",
                    "https://imgur.com/Y9Jd3gG.gif",
                    "https://imgur.com/pVTiNx4.gif",
                    "https://imgur.com/SSsxoOa.gif",
                    "https://imgur.com/Vv1FK9O.gif",
                    "https://imgur.com/UmcmTCs.gif",
                    "https://imgur.com/VUesVRQ.gif",
                    "https://imgur.com/GdN7H8G.gif",
                    "https://imgur.com/ScPlF2B.gif",
                    "https://imgur.com/XK969A3.gif",
                    "https://imgur.com/Afcx75P.gif"
                ]
                var response = options[Math.floor(Math.random() * options.length)];
                message.channel.send({
                    embed: {
                        image: {

                            url: response
                        }
                    }
                })
            }
        }

    }
}


module.exports.help = {
    name: "boop"
}