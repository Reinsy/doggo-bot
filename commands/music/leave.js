const Discord = require("discord.js");
const ytdl = require(`ytdl-core`);

module.exports = {
    name: "leave",
    category: "music",
    description: "Leaves the channel",
    usage: "[usage]",
    run: async (client, message, args, ops) => {

        //check if perosn is in a vc
        if(!message.member.voiceChannel) return message.channel.send(`Please connect to a voice channel`);

        if(!message.guild.me.voiceChannel) return message.channel.send(`Sorry the bot isn\`t in a voice channel`)

        if(message.guild.me.voiceChannelID !== message.member.voiceChannelID) return message.channel.send(`Sorry you aren\'t connected to the right voice channel.`)

        message.guild.me.voiceChannel.leave();

        message.channel.send(`Leaving Channel..`)
    }
}