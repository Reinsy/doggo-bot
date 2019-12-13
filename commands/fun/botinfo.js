const Discord = require("discord.js");

module.exports = {
    name: "botinfo",
    category: "moderation",
    description: "Bot Information for the user",
    usage: "[usage]",
    run: async (bot, message, args) => {
        let boticon = bot.user.displayAvatarURL;
        let botembed = new Discord.RichEmbed()
        .setDescription("Bot Information")
        .setColor("0ED4DA")
        .setThumbnail(boticon)
        .addField("Bot Name", bot.user.username)
        .addField("Bot Creation Data", bot.user.createdAt)
        .addField("Servers", bot.guilds.size)

        message.channel.send(botembed);
    }
}
module.exports.help = {
    name: "botinfo"
  }

