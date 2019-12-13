const Discord = require("discord.js");
const ytdl = require(`ytdl-core`);
const ops = require('node-opus');
const active = new Map();


module.exports = {
    name: "play",
    category: "music",
    description: "Makes the Bot Join your channel",
    usage: "[usage]",
    run: async (client, message, args) => {
        let ops = {
            active: active
        }

        //check if author is in a channel.
        if(!message.member.voiceChannel) return message.channel.send(`Please connect to a Voice Channel.`);

        // check if author inputs a url
        if(!args[0]) return message.channel.send(`Sorry, please input a url to the following comand`);
        // Validates the url
        let validate = await ytdl.validateURL(args[0]);
        // if the url is not valid
        if(!validate) return message.channel.send(`Please input a **valid** url`)
        // gets the info of the video
        let info = await ytdl.getInfo(args[0]);

        let data = ops.active.get(message.guild.id) || {};

        if(!data.connection) data.connection = await message.member.voiceChannel.join();
        if(!data.queue) data.queue = [];
        data.guildID = message.guild.id;


        data.queue.push({
            songTitle: info.title,
            requester: message.author.id,
            url: args[0],
            announceChannel: message.channel.id
        });

        if(!data.dispatcher) play(client, ops, data);
        else {
            message.channel.send(`Added to Queue: ${info.title}`);
        }

        ops.active.set(message.guild.id, data);
        
        async function play(client, ops,data) {

            client.channels.get(data.queue[0].announceChannel).send(`Now Playing: ${data.queue[0].songTitle} | Requested By: <@!${data.queue[0].requester}>`);

            data.dispatcher = await data.connection.playStream(ytdl(args[0], {filter: 'audio', highWaterMark: 1<<25 /* 32 mb */ }));
            data.dispatcher.guildID = data.guildID;

            data.dispatcher.once('end', function(){
                finish(client, ops, this);
            })

        }

        function finish(client, ops, dispatcher, member) {
            let fetched = ops.active.get(dispatcher.guildID);

            fetched.queue.shift();

            if(fetched.queue.length > 0) {
                ops.active.set(dispatcher.guildID, fetched);

                play(client, ops, fetched);
            }else{
                ops.active.delete(dispatcher.guildID);
                message.guild.me.voiceChannel.leave();
            }
        }
    }
}